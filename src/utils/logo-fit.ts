/** Квадратный знак можно поставить в рейку как есть. Шире — это слово, не favicon. */
export const LOGO_MARK_ASPECT = 1.4

function dataPayload(src: string): { mime: string; body: string; base64: boolean } | null {
  const match = src.trim().match(/^data:([^;,]+)?((?:;[^,]*)*),([\s\S]+)$/)
  if (!match) return null
  const mime = (match[1] || '').toLowerCase()
  const meta = match[2] || ''
  return { mime, body: match[3], base64: /;base64/i.test(meta) }
}

function decodeText(body: string, base64: boolean): string {
  if (!base64) return decodeURIComponent(body)
  const binary = atob(body)
  try {
    return new TextDecoder().decode(Uint8Array.from(binary, char => char.charCodeAt(0)))
  } catch {
    return binary
  }
}

function pngSize(body: string): { width: number; height: number } | null {
  const binary = atob(body.slice(0, 96))
  if (binary.length < 24) return null
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0))
  const width = (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19]
  const height = (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23]
  if (!width || !height) return null
  return { width, height }
}

function svgSize(markup: string): { width: number; height: number } | null {
  const viewBox = markup.match(/viewBox\s*=\s*["']?\s*[-.\d]+\s+[-.\d]+\s+([.\d]+)\s+([.\d]+)/i)
  if (viewBox) {
    const width = Number(viewBox[1])
    const height = Number(viewBox[2])
    if (width > 0 && height > 0) return { width, height }
  }
  const width = Number(markup.match(/\bwidth\s*=\s*["']?([.\d]+)/i)?.[1])
  const height = Number(markup.match(/\bheight\s*=\s*["']?([.\d]+)/i)?.[1])
  if (width > 0 && height > 0) return { width, height }
  return null
}

export function logoSize(src: string): { width: number; height: number } | null {
  const data = dataPayload(src)
  if (!data) return null
  if (data.mime.includes('png') && data.base64) return pngSize(data.body)
  if (data.mime.includes('svg')) return svgSize(decodeText(data.body, data.base64))
  return null
}

/** Узкий/квадратный знак годится как favicon. Широкое слово — нет, рисуем букву. */
export function isLogoMark(src: string): boolean {
  const size = logoSize(src)
  return Boolean(size && size.width / size.height <= LOGO_MARK_ASPECT)
}

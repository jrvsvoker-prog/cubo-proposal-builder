/** Подбор читаемого текста на primary клиента. Цвет фона не подменяем. */

export const PRIMARY_INK_WHITE = '#ffffff'
export const PRIMARY_INK_BLACK = '#000000'
export const MIN_BODY_CONTRAST = 4.5

function parseHex(hex: string): [number, number, number] {
  const value = hex.trim()
  if (!/^#[0-9a-fA-F]{6}$/.test(value)) throw new Error(`Invalid primary color: ${hex}`)
  return [
    Number.parseInt(value.slice(1, 3), 16),
    Number.parseInt(value.slice(3, 5), 16),
    Number.parseInt(value.slice(5, 7), 16),
  ]
}

function srgbToLin(channel: number): number {
  const value = channel / 255
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex)
  return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b)
}

export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground)
  const b = relativeLuminance(background)
  const [hi, lo] = a >= b ? [a, b] : [b, a]
  return (hi + 0.05) / (lo + 0.05)
}

export function primaryForeground(hex: string): { ink: string; contrast: number; white: number; black: number } {
  const white = contrastRatio(PRIMARY_INK_WHITE, hex)
  const black = contrastRatio(PRIMARY_INK_BLACK, hex)
  if (black >= white) return { ink: PRIMARY_INK_BLACK, contrast: black, white, black }
  return { ink: PRIMARY_INK_WHITE, contrast: white, white, black }
}

export function applyClientPrimary(hex: string, el: HTMLElement = document.documentElement): void {
  const { ink } = primaryForeground(hex)
  el.style.setProperty('--client-primary', hex)
  el.style.setProperty('--client-primary-ink', ink)
}

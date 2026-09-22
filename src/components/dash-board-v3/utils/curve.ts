// Сглаженная линия графика: Catmull-Rom → кубические Безье.
// Управляющие точки поджимаются в вертикальные границы холста, чтобы сезонные
// провалы не «выплёскивались» за пределы области построения.

export interface CurvePoint {
  x: number
  y: number
}

export const smoothPath = (pts: CurvePoint[], clampY?: [number, number]): string => {
  if (pts.length === 0) return ''
  if (pts.length === 1) return `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`
  const clamp = (y: number): number => {
    if (!clampY) return y
    return Math.min(clampY[1], Math.max(clampY[0], y))
  }
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = clamp(p1.y + (p2.y - p0.y) / 6)
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = clamp(p2.y - (p3.y - p1.y) / 6)
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`
  }
  return d
}

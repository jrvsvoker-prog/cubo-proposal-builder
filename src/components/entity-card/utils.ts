export const hoursAgo = (h: number): Date => new Date(Date.now() - h * 3_600_000)

/** Скроллит первый найденный прокручиваемый контейнер вглубь (лента таймлайна). */
export const scrollFeedToBottom = (root: HTMLElement | undefined): void => {
  if (!root) return
  window.setTimeout(() => {
    const nodes = root.querySelectorAll<HTMLElement>('*')
    for (const node of nodes) {
      if (node.scrollHeight > node.clientHeight + 4) {
        const overflow = getComputedStyle(node).overflowY
        if (overflow === 'auto' || overflow === 'scroll') {
          node.scrollTop = node.scrollHeight
        }
      }
    }
  }, 80)
}

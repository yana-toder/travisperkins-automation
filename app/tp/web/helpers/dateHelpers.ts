export function parseAriaLabelToDate(ariaLabel: string): Date {
  const clean = ariaLabel
    .replace('Choose ', '')
    .replace(/(\d+)(st|nd|rd|th)/, '$1')

  return new Date(clean)
}

export function formatDateForUI(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  })
}

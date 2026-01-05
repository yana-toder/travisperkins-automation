export function extractPriceValue(text: string): string {
  const match = text.match(/\d+([.,]\d{2})?/)

  if (!match) {
    throw new Error('Cannot extract price from text: "${text}"')
  }
  return match[0]
}

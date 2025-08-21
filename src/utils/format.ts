export function formatNumber(num: number, digits: number): string {
  return `#${String(num).padStart(digits, "0")}`
}

export function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function wrap(string: string, ...wrappers: any) {
  return [...wrappers, string, ...wrappers.reverse()].join('')
}

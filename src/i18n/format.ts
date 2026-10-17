/** Fills `{name}` placeholders, e.g. fill("Open photos for {title}", { title }). Safe on server and client. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

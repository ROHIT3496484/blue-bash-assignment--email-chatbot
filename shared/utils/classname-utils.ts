// Utility functions for managing classnames across micro-frontends

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

export function createVariantClasses(
  base: string,
  variants: Record<string, Record<string, string>>,
  props: Record<string, any>,
): string {
  let result = base

  Object.entries(variants).forEach(([key, values]) => {
    const value = props[key]
    if (value && values[value]) {
      result = cn(result, values[value])
    }
  })

  return result
}

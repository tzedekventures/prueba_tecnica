export function toNumber(value: string): number | string
{
    const newValue: number = Number.parseInt(value)
    if (Number.isNaN(newValue)) return "false"
    return newValue
}
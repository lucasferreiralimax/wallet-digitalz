import { describe, expect, it } from 'vitest'
import { parseMoney } from './utils'

describe('Basic render parseMoney function', () => {
  it('is parseMoney BRL', () => {
    expect(parseMoney(1000, 'pt-BR')).toBe('R$ 1.000,00')
  })
  it('is parseMoney USD', () => {
    expect(parseMoney(1000, 'en-US')).toBe('$1,000.00')
  })
  it('is parseMoney EUR', () => {
    expect(parseMoney(1000, 'es-ES')).toBe('1000,00 €')
  })
  it('is parseMoney RUB', () => {
    expect(parseMoney(1000, 'ru-RU')).toBe('1 000,00 ₽')
  })
  it('is parseMoney CNY', () => {
    expect(parseMoney(1000, 'zh-CN')).toBe('¥1,000.00')
  })
})

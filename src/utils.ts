export const parseMoney = (money: string | number, country: string) => {
  const number = Number(Number(money).toFixed(2))
  const currencys: any = {
    'pt-BR': 'BRL',
    'en-US': 'USD',
    'es-ES': 'EUR',
    'ru-RU': 'RUB',
    'zh-CN': 'CNY',
  }
  return new Intl.NumberFormat(country, { style: 'currency', currency: currencys[country] }).format(number)
}

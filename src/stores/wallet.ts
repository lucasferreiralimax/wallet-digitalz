import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Register, sortValue, typeValue } from '@/types'

function getTotal (registers: any) {
  return registers.reduce((a: number, { value }: Register) => Number(value) + Number(a), 0)
}

function shortRegisters (registers: any, type: string) {
  const entrys = registers.filter(({ type: { value }} : typeValue) => value == type)
  return [
    ...entrys.sort((a: sortValue, b: sortValue) => b.value - a.value)
  ]
}

export const useWalletStore = defineStore('wallet', {
  state: (): any => { // @TODO adjustment type
    return {
      registers: useStorage('my-wallet', []),
    }
  },
  getters: {
    getIds: ({ registers }) => registers.map(({ id }: Register) => id),
    getEntrys: ({ registers })  => shortRegisters(registers, 'entry'),
    getExpenses: ({ registers })  => shortRegisters(registers, 'expense'),
    getInvestiments: ({ registers })  => shortRegisters(registers, 'investiment'),
    getRegisters: ({ getEntrys, getExpenses, getInvestiments })  => {
      return [ ...getEntrys, ...getInvestiments, ...getExpenses]
    },
    getEntryTotal: ({ getEntrys })  => getTotal(getEntrys),
    getExpensesTotal: ({ getExpenses })  => getTotal(getExpenses),
    getInvestimentTotal: ({ getInvestiments })  => getTotal(getInvestiments),
    getTotalLessExpense: ({ getEntryTotal, getExpensesTotal, getInvestimentTotal })  => {
      return Number(getEntryTotal - getExpensesTotal);
    },
    getTotal: ({ getEntryTotal, getInvestimentTotal })  => Number(getEntryTotal + getInvestimentTotal),
  },
  actions: {
    newRegister(register: Register) {
      this.registers.push(register)
    },
    editRegister(register: Register) {
      const itemIndex = this.registers.findIndex(({ id }: Register) => id == register.id)
      this.registers[itemIndex] = register;
    },
    deleteRegister(target: string) {
      this.registers = this.registers.filter(({ id }: Register) => id !== target)
    },
  },
})

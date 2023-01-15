import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Register, TypeRegister } from '@/types'

interface typeValue {
  type: TypeRegister;
}

export const useWalletStore = defineStore('wallet', {
  state: (): any => { // @TODO adjustment type
    return {
      registers: useStorage('my-wallet', []),
    }
  },
  getters: {
    getIds: ({ registers }) => registers.map(({ id }: Register) => id),
    getRegisters: ({ registers })  => {
      const entrys = registers.filter(({ type: { value }} : typeValue) => value == "entry");
      const expenses = registers.filter(({ type: { value }} : typeValue) => value == "expense");
      const investiments = registers.filter(({ type: { value }} : typeValue) => value == "investiment");

      return [
        ...entrys,
        ...investiments,
        ...expenses
      ]
    },
    getEntryTotal: ({ registers })  => registers.filter(({ type: { value }} : typeValue) => value == "entry").reduce((a: number, { value }: Register) => Number(value) + Number(a), 0),
    getExpensesTotal: ({ registers })  => registers.filter(({ type: { value }} : typeValue) => value == "expense").reduce((a: number, { value }: Register) => Number(value) + Number(a), 0),
    getInvestimentTotal: ({ registers })  => registers.filter(({ type: { value }} : typeValue) => value == "investiment").reduce((a: number, { value }: Register) => Number(value) + Number(a), 0),
    getTotal: ({ registers })  => registers.filter(({ type: { value }} : typeValue) => value == "investiment" || value == "entry").reduce((a: number, { value }: Register) => Number(value) + Number(a), 0),
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

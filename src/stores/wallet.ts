import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Register } from '@/types'
interface State {
  registers: any; // @TODO adjustment type
}

export const useWalletStore = defineStore('wallet', {
  state: (): State => {
    return {
      registers: useStorage('my-wallet', []), // @TODO adjustment type
    }
  },
  getters: {
    getIds: ({ registers }) => registers.map(({ id }: Register) => id),
    getExpensesTotal: ({ registers })  => registers.filter(({ type: { value }} : any) => value == "expense").reduce((a: number, { value }: Register) => Number(value) + Number(a), 0),
    getTotal: ({ registers })  => registers.filter(({ type: { value }} : any) => value == "investiment" || value == "entry").reduce((a: number, { value }: Register) => Number(value) + Number(a), 0),
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

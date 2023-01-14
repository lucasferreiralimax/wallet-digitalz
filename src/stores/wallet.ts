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
    getIds: (state) => state.registers.map((item: Register) => item.id),
    getExpensesTotal: (state) => state.registers.filter((item: any) => item.type == "Expenses").reduce((a: number, item: Register) => Number(item.value) + Number(a), 0),
    getTotal: (state) => state.registers.filter((item: any) => item.type == "Investiment" || item.type == "Entry").reduce((a: number, item: Register) => Number(item.value) + Number(a), 0),
  },
  actions: {
    newRegister(register: Register) {
      this.registers.push(register)
    },
    editRegister(register: Register) {
      const itemIndex = this.registers.findIndex((item: Register) => item.id == register.id)
      this.registers[itemIndex] = register;
    },
    deleteRegister(id: string) {
      this.registers = this.registers.filter((item: Register) => item.id !== id)
    },
  },
})

import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export type Register = {
  id: string;
  name: string;
  value: number;
  description: string;
}

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
    getTotal: (state) => state.registers.reduce((a: number, item: Register) => Number(item.value) + Number(a), 0),
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

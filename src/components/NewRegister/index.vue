<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import { useWalletStore } from '@/stores/wallet'

const wallet = useWalletStore()
const dialog = ref<boolean>(false)
const valid = ref<boolean>(false)
const myForm = ref()
const name = ref<string>('')
const value = ref<number>(0)
const description = ref<string>('')

const nameRules = [
  (v: string) => !!v || 'Name is required',
  (v: string) => v.length <= 15 || 'Name must be less than 15 characters',
]

const valueRules = [
  (v: string) => !!v || 'Value is required'
]

const descriptionRules = [
  (v: string) => v.length > 20 || 'Description must be more than 20 characters',
  (v: string) => v.length <= 250 || 'Description must be less than 250 characters',
]

async function validate () {
  const { valid } = await myForm.value.validate()

  if (valid) {
    wallet.newRegister({
      id: uuidv4(),
      name: name.value,
      value: value.value,
      description: description.value
    })

    dialog.value = false
  }
}

</script>

<template>
  <v-dialog
    v-model="dialog"
    persistent
  >
    <template v-slot:activator="{ props }">
      <v-btn
        color="success"
        class="ma-2"
        v-bind="props"
      >
        New Register
      </v-btn>
    </template>
    <v-card class="mx-auto" max-width="600" width="100%">
      <v-card-title>
        <span class="text-h5">Register</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="valid" ref="myForm">
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Name*"
                  v-model="name"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Value*"
                  v-model="value"
                  prefix="$"
                  type="number"
                  :rules="valueRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  label="Description*"
                  v-model="description"
                  :rules="descriptionRules"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          variant="text"
          @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="success"
          variant="flat"
          @click="validate"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

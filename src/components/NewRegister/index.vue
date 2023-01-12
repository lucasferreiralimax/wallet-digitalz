<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref<boolean>(false)
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
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                label="Name*"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                label="Value*"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                label="Description*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
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
          @click="dialog = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

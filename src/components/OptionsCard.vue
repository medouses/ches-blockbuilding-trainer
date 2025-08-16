<script setup>
import { ref } from "vue";
import { Card, DataTable, Column, Select } from "primevue";
import { FirstBlockTrainerCore } from "../cores/firstBlock";

const AvailableCores = [
  {
    label: "First Block",
    value: FirstBlockTrainerCore,
  },
];

const selectedCore = ref(AvailableCores[0]);
</script>

<template>
  <Card>
    <template #content>
      <DataTable
        v-if="selectedCore"
        :value="
          Object.entries(selectedCore.value.Options).map(([name, value]) => ({
            name,
            value,
          }))
        "
      >
        <Column field="name" header="Option" />
        <Column field="value" header="Value" />
      </DataTable>

      <Select
        v-model="selectedCore"
        :options="AvailableCores"
        option-label="label"
      />
    </template>
  </Card>
</template>

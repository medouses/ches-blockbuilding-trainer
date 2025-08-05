<script setup>
import { Card } from "primevue";
import { useTrainerStore } from "../stores/trainer";

const trainer = useTrainerStore();
</script>

<template>
  <Card>
    <template #title>solutions</template>

    <template #content>
      <li v-for="solution of trainer.case?.solutions" :key="solution">
        {{ solution.join(" ") }}
      </li>
    </template>
  </Card>
</template>

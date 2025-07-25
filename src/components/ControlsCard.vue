<script setup>
import { Card, Button } from "primevue";
import { useTrainerStore } from "../stores/trainer";

const trainer = useTrainerStore();
</script>

<template>
  <Card>
    <template #content>
      <div class="controls-row">
        <Button label="next" @click="trainer.next" />
        <Button label="abort" @click="trainer.abort" />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.controls-row {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>

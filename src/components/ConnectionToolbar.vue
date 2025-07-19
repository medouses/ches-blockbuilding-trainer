<script setup>
import { Toolbar, Button } from "primevue";
import { useSmartCubeStore } from "../stores/smartCube";

const smartCube = useSmartCubeStore();
</script>

<template>
  <Toolbar class="connection-toolbar">
    <template #start>
      <div class="connection-info">
        <span>name: {{ smartCube.deviceName || "none" }}</span>
        <span>mac: {{ smartCube.deviceMac || "none" }}</span>
      </div>
    </template>

    <template #end>
      <div class="connection-controls">
        <Button label="reset" @click="smartCube.reset" />
        <Button label="disconnect" @click="smartCube.disconnect" />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.connection-toolbar {
  margin: 0.5rem;
}

.connection-info {
  margin-left: 0.5rem;
  display: flex;
  gap: 1.5rem;
}

.connection-controls {
  display: flex;
  gap: 0.5rem;
}
</style>

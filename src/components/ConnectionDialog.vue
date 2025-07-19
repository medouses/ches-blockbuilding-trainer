<script setup>
import { Dialog, Button } from "primevue";
import { useSmartCubeStore } from "../stores/smartCube";

const CUBE_MAC_ADDRESS = "EC:FE:44:BA:E1:4A";

const smartCube = useSmartCubeStore();
</script>

<template>
  <Dialog
    header="no cube connected"
    modal
    :closable="false"
    :draggable="false"
    :visible="!smartCube.isConnected"
  >
    <span>to use this app, please connect a compatible (gan) smart cube</span>

    <template #footer>
      <Button
        label="connect cube"
        @click="smartCube.connect(CUBE_MAC_ADDRESS)"
      />
    </template>
  </Dialog>
</template>

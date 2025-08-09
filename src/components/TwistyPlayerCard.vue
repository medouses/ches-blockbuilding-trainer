<script setup>
import { useTemplateRef } from "vue";
import { Card } from "primevue";
import { useSmartCubeStore } from "../stores/smartCube";
import { useTwistyPlayer } from "../composables/useTwistyPlayer";

const smartCube = useSmartCubeStore();
const container = useTemplateRef("container");

useTwistyPlayer(smartCube, container);
</script>

<template>
  <Card pt:body:class="twisty-card-body">
    <template #content>
      <div ref="container" class="twisty-container" />
    </template>
  </Card>
</template>

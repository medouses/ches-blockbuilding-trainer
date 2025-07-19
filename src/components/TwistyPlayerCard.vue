<script setup>
import { useTemplateRef, watch } from "vue";
import { Card } from "primevue";
import { useSmartCubeStore } from "../stores/smartCube";
import { useTwistyPlayer } from "../composables/useTwistyPlayer";

const smartCube = useSmartCubeStore();
const container = useTemplateRef("container");
const player = useTwistyPlayer(container);

watch(
  () => smartCube.lastMove,
  (newMove) => {
    if (newMove) player.addMove(newMove.type);
  }
);

watch(
  () => smartCube.lastReportedPattern,
  (newReportedPattern) => {
    if (newReportedPattern) player.setPattern(newReportedPattern);
  }
);
</script>

<template>
  <Card>
    <template #content>
      <div ref="container" />
    </template>
  </Card>
</template>

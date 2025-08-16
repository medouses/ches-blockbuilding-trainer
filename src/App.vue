<script setup>
import ScrambleCard from "./components/ScrambleCard.vue";
import SolutionsCard from "./components/SolutionsCard.vue";
import TwistyPlayerCard from "./components/TwistyPlayerCard.vue";
import ControlsCard from "./components/ControlsCard.vue";
import OptionsCard from "./components/OptionsCard.vue";
import ConnectionToolbar from "./components/ConnectionToolbar.vue";
import ConnectionDialog from "./components/ConnectionDialog.vue";
</script>

<template>
  <div class="layout">
    <div class="layout__grid">
      <ScrambleCard class="layout__card--scramble" />
      <SolutionsCard class="layout__card--solutions" />
      <TwistyPlayerCard class="layout__card--twisty-player" />
      <ControlsCard class="layout__card--controls" />
      <OptionsCard class="layout__card--options" />
    </div>
  </div>

  <ConnectionToolbar />
  <ConnectionDialog />
</template>

<style scoped>
.layout {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  overflow-y: auto;
}

.layout__grid {
  display: grid;
  gap: 0.5rem;
  grid-template:
    "scramble  scramble options" auto
    "solutions twisty   options" 30vh
    "controls  controls options" auto
    / 18vw 18vw 10vw;
}

.layout__card--scramble {
  grid-area: scramble;
}

.layout__card--solutions {
  grid-area: solutions;
}

.layout__card--twisty-player {
  grid-area: twisty;
}

.layout__card--controls {
  grid-area: controls;
}

.layout__card--options {
  grid-area: options;
}
</style>

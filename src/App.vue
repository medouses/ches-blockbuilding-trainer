<script setup>
import ScrambleCard from "./components/ScrambleCard.vue";
import SolutionsCard from "./components/SolutionsCard.vue";
import TwistyPlayerCard from "./components/TwistyPlayerCard.vue";
import ControlsCard from "./components/ControlsCard.vue";
import ConnectionToolbar from "./components/ConnectionToolbar.vue";
import ConnectionDialog from "./components/ConnectionDialog.vue";
</script>

<template>
  <div class="main-container">
    <div class="trainer-layout">
      <ScrambleCard />
      <div class="trainer-layout-row-2">
        <SolutionsCard class="solutions-card" />
        <TwistyPlayerCard class="twisty-player-card" />
      </div>
      <ControlsCard />
    </div>
  </div>
  <ConnectionToolbar />
  <ConnectionDialog />
</template>

<style scoped>
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  overflow-y: auto;
}

.trainer-layout {
  display: flex;
  flex-direction: column;
  width: 40vw;
  gap: 0.5rem;
}

.trainer-layout-row-2 {
  display: flex;
  flex-direction: row;
  height: 30vh;
  gap: 0.5rem;
}

.solutions-card {
  flex: 1 1 auto;
}
</style>

<script setup>
import { ref, computed, watch } from "vue";
import { Card, Button } from "primevue";
import { useSmartCubeStore } from "../stores/smartCube";
import { useTrainerStore } from "../stores/trainer";
import { TrainerStages } from "../composables/useTrainer";

const smartCube = useSmartCubeStore();
const trainer = useTrainerStore();
const progress = ref(0);
const steps = computed(() => trainer.scramble?.split(" ") || []);

watch(
  () => trainer.stage,
  (newStage) => {
    if (newStage) progress.value = 0;
  }
);

watch(
  () => smartCube.currentPattern,
  (newPattern) => {
    if (newPattern && trainer.stage == TrainerStages.Scrambling) {
      const algorithm = steps.value.slice(0, progress.value + 1).join(" ");
      const puzzle = newPattern.kpuzzle;
      const transformation = puzzle.algToTransformation(algorithm);
      const targetPattern = transformation.toKPattern();

      if (newPattern.isIdentical(targetPattern)) {
        progress.value++;
      }
    }
  }
);
</script>

<template>
  <Card>
    <template #content>
      <div class="scramble-row">
        <div class="scramble-text">
          <template v-if="trainer.isActive">
            <span class="scramble-complete">
              {{ steps.slice(0, progress).join(" ") + " " }}
            </span>
            <span>
              {{ steps.slice(progress).join(" ") }}
            </span>
          </template>
          <span v-else>press next to begin</span>
        </div>
        <Button label="edit" />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.scramble-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.scramble-text {
  /* margin-left: 0.5rem; */
  font-family: monospace;
  font-size: 1.2rem;
}

.scramble-complete {
  color: #5aa064;
}
</style>

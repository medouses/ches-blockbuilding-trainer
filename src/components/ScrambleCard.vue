<script setup>
import { Card, Button } from "primevue";
import { useTrainerStore } from "../stores/trainer";
import { TrainerStages } from "../services/trainerService";
import { useScrambleProgress } from "../composables/useScrambleProgress";

const trainer = useTrainerStore();
const { progress, steps } = useScrambleProgress(trainer);
</script>

<template>
  <Card>
    <template #content>
      <div class="scramble-row">
        <div class="scramble-text">
          <template v-if="trainer.isActive">
            <template v-if="trainer.stage == TrainerStages.Scrambling">
              <span class="scramble-complete">
                {{ steps.slice(0, progress).join(" ") + " " }}
              </span>
              <span>
                {{ steps.slice(progress).join(" ") }}
              </span>
            </template>
            <span v-else class="scramble-inactive">
              {{ steps.join(" ") }}
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

.scramble-inactive {
  color: #999999;
}
</style>

import { ref, computed, watch } from "vue";
import { TrainerStages } from "../services/trainerService";
import { algorithmToPattern } from "../utils";

export function useScrambleProgress(trainer) {
  const progress = ref(0);
  const steps = computed(() => trainer.case.scramble?.split(" ") || []);

  watch(
    () => trainer.stage,
    () => (progress.value = 0)
  );

  watch(
    () => trainer.smartCube.currentPattern,
    async (newPattern) => {
      if (newPattern && trainer.stage == TrainerStages.Scrambling) {
        const algorithm = steps.value.slice(0, progress.value + 1).join(" ");
        const targetPattern = await algorithmToPattern(algorithm);
        const isComplete = newPattern.isIdentical(targetPattern);

        if (isComplete) {
          progress.value++;
        }
      }
    }
  );

  return { progress, steps };
}

import { defineStore } from "pinia";
import { useSmartCubeStore } from "./smartCube";
import { useTrainer } from "../composables/useTrainer";
import { FirstBlockTrainerCore } from "../cores/firstBlock";

export const useTrainerStore = defineStore("exercise", () => {
  const smartCube = useSmartCubeStore();
  const trainer = useTrainer(smartCube);

  // TODO: should be controlled by user
  const core = new FirstBlockTrainerCore();
  trainer.setCore(core);

  return { ...trainer };
});

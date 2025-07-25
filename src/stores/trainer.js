import { defineStore } from "pinia";
import { useSmartCubeStore } from "./smartCube";
import { useTrainer } from "../composables/useTrainer";

export const useTrainerStore = defineStore("exercise", () => {
  const smartCube = useSmartCubeStore();
  const trainer = useTrainer(smartCube);

  return { ...trainer };
});

import { defineStore } from "pinia";
import { useSmartCube } from "../composables/useSmartCube";

export const useSmartCubeStore = defineStore("smartCube", () => {
  const smartCube = useSmartCube();

  return smartCube;
});

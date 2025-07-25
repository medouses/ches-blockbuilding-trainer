import { shallowReactive, toRefs } from "vue";
import { ExerciseManagerService } from "../services/exerciseManager";

const initialState = {
  isActive: false,
  stage: null,
  scramble: "",
  startingPattern: null,
  solutions: [],
};

export function useTrainer(smartCube) {
  const state = shallowReactive({ ...initialState });
  const service = new ExerciseManagerService();

  return { ...toRefs(state), next, abort };
}

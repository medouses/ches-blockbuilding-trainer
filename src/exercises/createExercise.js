import { ExerciseStages } from "../services/exerciseManager";

const baseExercise = {
  options: {},
  progression: {
    [ExerciseStages.Resetting]: () => {},
    [ExerciseStages.Scrambling]: () => {},
    [ExerciseStages.Solving]: () => {},
  },
  generate: () => {},
};

export function createExercise() {}

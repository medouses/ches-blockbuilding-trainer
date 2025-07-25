export const ExerciseStages = {
  Resetting: 1,
  Scrambling: 2,
  Solving: 3,
};

export class ExerciseManagerService {
  _handleStageChange = (stage) => {
    this._stage = stage;

    if (this._stageChangeCallbacks.has(stage)) {
      for (const callback of this._stageChangeCallbacks.get(stage)) {
        callback();
      }
    }
  };

  _handleExerciseComplete = () => {
    this._currentCase = null;
    this._stage = null;

    for (const callback of this._completionCallbacks) {
      callback();
    }
  };

  onStageEnter = (stage, callback) => {
    if (Object.values(ExerciseStages).includes(stage)) {
      if (this._stageChangeCallbacks.has(stage)) {
        this._stageChangeCallbacks.get(stage).push(callback);
      } else {
        this._stageChangeCallbacks.set(stage, [callback]);
      }
    } else {
      throw new TypeError(`invalid exercise stage ${stage}`);
    }
  };

  onExerciseComplete = (callback) => {
    this._completionCallbacks.push(callback);
  };

  updateProgress = (pattern) => {
    if (this._exercise.progression[this._stage](pattern)) {
      const stages = Object.values(ExerciseStages).sort();
      const currentIndex = stages.indexOf(this._stage);
      const nextIndex = currentIndex + 1;

      if (nextIndex < stages.length) {
        this._handleStageChange(stages[nextIndex]);
      } else {
        this._handleExerciseComplete();
      }
    }
  };

  // TODO
  setExercise = (exercise) => {
    this._exercise = exercise;
  };

  // TODO
  next = () => {
    this._currentCase = this._exercise.generate();
    this._stage = ExerciseStages.Resetting;

    return this._currentCase;
  };

  constructor() {
    this._exercise = null;
    this._options = null;
    this._currentCase = null;
    this._stage = null;
    this._stageChangeCallbacks = new Map();
    this._completionCallbacks = [];
  }
}

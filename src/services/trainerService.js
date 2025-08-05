export const TrainerEvents = {
  StageChange: "STAGE_CHANGE",
  CaseEnded: "CASE_ENDED",
};

export const TrainerStages = {
  Resetting: 1,
  Scrambling: 2,
  Solving: 3,
};

export class TrainerService {
  _handleEvent = (event) => {
    if (this._callbacks.has(event.type)) {
      for (const callback of this._callbacks.get(event.type)) {
        callback(event);
      }
    }
  };

  onEvent = (type, callback) => {
    if (Object.values(TrainerEvents).includes(type)) {
      if (this._callbacks.has(type)) {
        this._callbacks.get(type).push(callback);
      } else {
        this._callbacks.set(type, [callback]);
      }
    } else {
      throw new TypeError(`invalid trainer event type ${type}`);
    }
  };

  updateProgress = async (pattern) => {
    const context = { ...this._case, pattern };

    if (!this._case) {
      throw new Error("no case in progress!");
    }

    if (await this._progression[this._stage](context)) {
      const stages = Object.values(TrainerStages).sort();
      const currentIndex = stages.indexOf(this._stage);
      const nextIndex = currentIndex + 1;

      if (nextIndex < stages.length) {
        this._handleEvent({
          type: TrainerEvents.StageChange,
          newStage: stages[nextIndex],
        });
      } else {
        this._handleEvent({
          type: TrainerEvents.CaseEnded,
          complete: true,
        });
      }
    }
  };

  setCore = async (core) => {
    if (this._case) {
      throw new Error("case already in progress!");
    }

    this._core = core;
    this._progression = {
      [TrainerStages.Resetting]: core.isReset,
      [TrainerStages.Scrambling]: core.isScrambled,
      [TrainerStages.Solving]: core.isSolved,
    };
  };

  next = async () => {
    if (this._case) {
      throw new Error("case already in progress!");
    }

    this._case = await this._core.generate();
    this._handleEvent({
      type: TrainerEvents.StageChange,
      newStage: TrainerStages.Resetting,
    });

    return this._case;
  };

  abort = async () => {
    if (!this._case) {
      throw new Error("no case in progress!");
    }

    this._handleEvent({
      type: TrainerEvents.CaseEnded,
      complete: false,
    });
  };

  constructor() {
    this._core = null;
    this._progression = null;
    this._case = null;
    this._stage = null;
    this._callbacks = new Map();

    this.onEvent(TrainerEvents.StageChange, (event) => {
      this._stage = event.newStage;
    });

    this.onEvent(TrainerEvents.CaseEnded, () => {
      this._case = null;
      this._stage = null;
    });
  }
}

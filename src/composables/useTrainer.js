import { shallowReactive, toRefs, watchEffect } from "vue";
import { TrainerEvents, TrainerService } from "../services/trainerService";

const initialState = {
  core: null,
  isActive: false,
  case: null,
  stage: null,
};

export function useTrainer(smartCube) {
  const state = shallowReactive({ ...initialState });
  const service = new TrainerService();

  async function setCore(core) {
    try {
      await service.setCore(core);
      state.core = core;
    } catch (error) {
      console.error("failed to set trainer core:", error);
    }
  }

  async function next() {
    try {
      const value = await service.next();
      state.isActive = true;
      state.case = value;
    } catch (error) {
      console.error("failed to get next trainer case:", error);
    }
  }

  async function abort() {
    try {
      service.abort();
    } catch (error) {
      console.error("failed to abort trainer case:", error);
    }
  }

  service.onEvent(TrainerEvents.StageChange, (event) => {
    state.stage = event.newStage;
    console.debug("trainer stage changed:", event.newStage);
  });

  service.onEvent(TrainerEvents.CaseEnded, () => {
    Object.assign(state, initialState);
    console.debug("trainer case ended!");
  });

  watchEffect(async () => {
    if (state.isActive && smartCube.currentPattern) {
      await service.updateProgress(smartCube.currentPattern);
    }
  });

  return { ...toRefs(state), setCore, next, abort };
}

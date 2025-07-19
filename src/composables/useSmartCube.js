import { shallowReactive, toRefs } from "vue";
import { faceletsToPattern } from "gan-cube-sample-utils";
import {
  SmartCubeEvents,
  SmartCubeCommands,
  SmartCubeConnectionService,
} from "../services/smartCubeConnection";

const initialState = {
  isConnected: false,
  deviceInfo: null,
  lastMove: null,
  lastReportedPattern: null,
  currentPattern: null,
};

export function useSmartCube() {
  const service = new SmartCubeConnectionService();
  const state = shallowReactive({ ...initialState });

  async function reset() {
    await service.sendCommand(SmartCubeCommands.Reset).catch((error) => {
      console.error("reset failed:", error);
    });
  }

  async function connect(macAddress) {
    await service.connect(macAddress).then(
      async (info) => {
        state.isConnected = true;
        state.deviceInfo = info;
        await service.sendCommand(SmartCubeCommands.Facelets);
        console.debug("smart cube connected!");
      },
      (error) => console.error("smart cube connection failed:", error)
    );
  }

  async function disconnect() {
    await service.disconnect().catch((error) => {
      console.error("smart cube disconnection failed:", error);
    });
  }

  service.onEvent(SmartCubeEvents.Move, (event) => {
    state.lastMove = { type: event.move, serial: event.serial };
    state.currentPattern = state.currentPattern.applyMove(event.move);
  });

  service.onEvent(SmartCubeEvents.Facelets, (event) => {
    state.lastMove = null;
    state.lastReportedPattern = faceletsToPattern(event.facelets);
    state.currentPattern = state.lastReportedPattern;
  });

  service.onEvent(SmartCubeEvents.Disconnect, () => {
    Object.assign(state, initialState);
    console.debug("smart cube disconnected!");
  });

  return { ...toRefs(state), reset, connect, disconnect };
}

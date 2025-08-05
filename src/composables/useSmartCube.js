import { shallowReactive, toRefs } from "vue";
import { faceletsToPattern } from "gan-cube-sample-utils";
import {
  SmartCubeEvents,
  SmartCubeCommands,
  SmartCubeService,
} from "../services/smartCubeService";

const initialState = {
  isConnected: false,
  deviceInfo: null,
  lastMove: null,
  lastReportedPattern: null,
  currentPattern: null,
};

export function useSmartCube() {
  const state = shallowReactive({ ...initialState });
  const service = new SmartCubeService();

  async function reset() {
    try {
      await service.sendCommand(SmartCubeCommands.Reset);
    } catch (error) {
      console.error("failed to reset cube:", error);
    }
  }

  async function connect(macAddress) {
    try {
      const value = await service.connect(macAddress);
      await service.sendCommand(SmartCubeCommands.Facelets);
      state.isConnected = true;
      state.deviceInfo = value;
      console.debug("cube connected!");
    } catch (error) {
      console.error("failed to connect cube:", error);
    }
  }

  async function disconnect() {
    try {
      await service.disconnect();
    } catch (error) {
      console.error("failed to disconnect cube:", error);
    }
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
    console.debug("cube disconnected!");
  });

  return { ...toRefs(state), reset, connect, disconnect };
}

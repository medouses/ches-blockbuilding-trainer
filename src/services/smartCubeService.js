import { connectGanCube } from "gan-web-bluetooth";

export const SmartCubeEvents = {
  Move: "MOVE",
  Facelets: "FACELETS",
  Gyro: "GYRO",
  Battery: "BATTERY",
  Hardware: "HARDWARE",
  Disconnect: "DISCONNECT",
};

export const SmartCubeCommands = {
  Facelets: "REQUEST_FACELETS",
  Reset: "REQUEST_RESET",
  Battery: "REQUEST_BATTERY",
  Hardware: "REQUEST_HARDWARE",
};

export class SmartCubeService {
  _handleEvent = (event) => {
    if (this._callbacks.has(event.type)) {
      for (const callback of this._callbacks.get(event.type)) {
        callback(event);
      }
    }
  };

  onEvent = (type, callback) => {
    if (Object.values(SmartCubeEvents).includes(type)) {
      if (this._callbacks.has(type)) {
        this._callbacks.get(type).push(callback);
      } else {
        this._callbacks.set(type, [callback]);
      }
    } else {
      throw new TypeError(`invalid cube event type ${type}`);
    }
  };

  sendCommand = async (type) => {
    if (!this._connection) {
      throw new Error("no cube connected!");
    }

    if (Object.values(SmartCubeCommands).includes(type)) {
      await this._connection.sendCubeCommand({ type: type });
    } else {
      throw new TypeError("invalid cube command type:", type);
    }
  };

  connect = async (macAddress) => {
    const macAddressProvider = () => Promise.resolve(macAddress);

    if (this._connection) {
      throw new Error("cube already connected!");
    }

    this._connection = await connectGanCube(macAddressProvider);
    this._connection.events$.subscribe(this._handleEvent);

    return {
      name: this._connection.deviceName,
      mac: this._connection.deviceMAC,
    };
  };

  disconnect = async () => {
    if (!this._connection) {
      throw new Error("no cube connected!");
    }

    await this._connection.disconnect();
  };

  constructor() {
    this._connection = null;
    this._callbacks = new Map();

    this.onEvent(SmartCubeEvents.Disconnect, () => {
      this._connection = null;
    });
  }
}

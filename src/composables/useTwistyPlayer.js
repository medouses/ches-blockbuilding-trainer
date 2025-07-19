import { shallowRef, onMounted, onUnmounted } from "vue";
import { TwistyPlayer } from "cubing/twisty";
import { patternToAlgorithm } from "../utils";

export function useTwistyPlayer(container) {
  const player = shallowRef(null);

  function addMove(move) {
    player.value.experimentalAddMove(move, { cancel: false });
  }

  async function setPattern(pattern) {
    player.value.alg = await patternToAlgorithm(pattern);
  }

  onMounted(() => {
    if (!player.value) {
      player.value = new TwistyPlayer({
        background: "none",
        controlPanel: "none",
      });
    }

    if (!container.value.contains(player.value)) {
      container.value.appendChild(player.value);
    }
  });

  onUnmounted(() => player.value?.remove());

  return { addMove, setPattern };
}

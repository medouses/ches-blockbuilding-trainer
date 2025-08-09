import { shallowRef, onMounted, onUnmounted, watch } from "vue";
import { TwistyPlayer } from "cubing/twisty";
import { patternToAlgorithm } from "../utils";

export function useTwistyPlayer(smartCube, container) {
  const player = shallowRef(null);

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

  watch(
    () => smartCube.lastMove,
    (newMove) => {
      if (newMove) {
        player.value.experimentalAddMove(newMove.type, { cancel: false });
      }
    }
  );

  watch(
    () => smartCube.lastReportedPattern,
    async (newReportedPattern) => {
      if (newReportedPattern) {
        player.value.alg = await patternToAlgorithm(newReportedPattern);
      }
    }
  );

  return { player };
}

import { experimentalSolve3x3x3IgnoringCenters } from "cubing/search";
import { puzzles } from "cubing/puzzles";

export function formatAlgorithm(algorithm) {
  return algorithm.replace(/([FRUBLDfrubldMESxyz][w]?['2]?)/g, "$1 ");
}

export async function patternToAlgorithm(pattern) {
  const solution = await experimentalSolve3x3x3IgnoringCenters(pattern);
  const scramble = solution.invert();
  const algorithm = scramble.toString();

  return algorithm;
}

export async function algorithmToPattern(algorithm) {
  const puzzle = await puzzles["3x3x3"].kpuzzle();
  const transformation = puzzle.algToTransformation(algorithm);
  const pattern = transformation.toKPattern();

  return pattern;
}

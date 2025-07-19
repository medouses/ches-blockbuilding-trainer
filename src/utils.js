import { experimentalSolve3x3x3IgnoringCenters } from "cubing/search";

const patternToAlgorithm = async (pattern) => {
  const solution = await experimentalSolve3x3x3IgnoringCenters(pattern);
  const scramble = solution.invert();
  const string = scramble.toString();

  return string;
};

export { patternToAlgorithm };

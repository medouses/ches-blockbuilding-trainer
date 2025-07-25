import { experimentalSolve3x3x3IgnoringCenters } from "cubing/search";
import { CubeLib, Solver } from "roux-trainers-utils";

const SEARCH_DEPTH_L = 0;
const SEARCH_DEPTH_R = 9;

const fbSolver = Solver.FbSolver();

export const patternToAlgorithm = async (pattern) => {
  const solution = await experimentalSolve3x3x3IgnoringCenters(pattern);
  const scramble = solution.invert();
  const string = scramble.toString();

  return string;
};

export const isFirstBlockSolved = async (pattern) => {
  const alg = await patternToAlgorithm(pattern);
  const scramble = alg.toString();
  const cube = new CubeLib.CubieCube().apply(scramble);
  const isSolved = fbSolver.is_solved(cube);

  return isSolved;
};

export const findFirstBlockSolutions = (scramble, capacity) => {
  const str = scramble.toString();
  const cube = new CubeLib.CubieCube().apply(str);
  const solutions = fbSolver
    .solve(cube, SEARCH_DEPTH_L, SEARCH_DEPTH_R, capacity)
    .map((soln) => soln.moves.map((m) => m.toString()));

  return solutions;
};

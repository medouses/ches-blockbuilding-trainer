import { CubeLib, Solver } from "roux-trainers-utils";
import { randomScrambleForEvent } from "cubing/scramble";
import { algorithmToPattern, patternToAlgorithm } from "../utils";

export class FirstBlockTrainerCore {
  static get Options() {
    return {
      maxSolutions: 5,
      searchDepthL: 0,
      searchDepthR: 9,
    };
  }

  isReset = async (context) => {
    return context.pattern.experimentalIsSolved({
      ignorePuzzleOrientation: true,
      ignoreCenterOrientation: true,
    });
  };

  isScrambled = async (context) => {
    const scramblePattern = await algorithmToPattern(context.scramble);
    const isScrambled = scramblePattern.isIdentical(context.pattern);

    return isScrambled;
  };

  isSolved = async (context) => {
    const algorithm = await patternToAlgorithm(context.pattern);
    const cube = new CubeLib.CubieCube().apply(algorithm);
    const isSolved = this._solver.is_solved(cube);

    return isSolved;
  };

  generate = async () => {
    const scramble = (await randomScrambleForEvent("333")).toString();
    const cube = new CubeLib.CubieCube().apply(scramble);
    const solutions = this._solver
      .solve(
        cube,
        this._options.searchDepthL,
        this._options.searchDepthR,
        this._options.capacity
      )
      .map((soln) => soln.moves.map((m) => m.toString()));

    return { scramble, solutions };
  };

  constructor(options) {
    this._options = { ...this.Options, ...options };
    this._solver = Solver.FbSolver();
  }
}

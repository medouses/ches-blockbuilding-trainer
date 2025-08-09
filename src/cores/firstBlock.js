import { CubeLib, Solver, Tracker } from "roux-trainers-utils";
import {
  formatAlgorithm,
  algorithmToPattern,
  patternToAlgorithm,
} from "../utils";

export class FirstBlockTrainerCore {
  static get Options() {
    return {
      searchDepthL: 0,
      searchDepthR: 9,
      maxSolutions: 5,
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
    const scramble = formatAlgorithm(Tracker.generateScramble("UDFBrRM", 8));
    const cube = new CubeLib.CubieCube().apply(scramble);
    const solutions = this._solver
      .solve(
        cube,
        this._options.searchDepthL,
        this._options.searchDepthR,
        this._options.maxSolutions
      )
      .map((soln) => soln.moves.map((m) => m.toString()));

    return { scramble, solutions };
  };

  constructor(options) {
    this._options = { ...this.constructor.Options, ...options };
    this._solver = Solver.FbSolver();
  }
}

import { flipBitAt, generateRandomIndividuum } from "./helpers";


// ---------------------------------------
// ----------Test-functions---------------
// ---------------------------------------
export type TestFunction = (individuum: Array<boolean>) => number;

export const oneMax = (individuum: Array<boolean>) => {
    return linearFunctions(individuum);
}

// TODO: cache stuff!!!
export const linearFunctions = (individuum: Array<boolean>, weights: undefined|Array<number>=undefined) => {
    // in case no weights are given we'll use just 1 weights (but with defined seed!!!) 
    // we effectively then implement oneMax
    let fitness = 0;
    for (let i = 0; i < individuum.length; i++) {
        if (!weights && individuum[i]) fitness ++;
        else if (weights && individuum[i]) fitness += weights[i];
    }
    return fitness;
}

export const leadingOnes = (individuum: Array<boolean>) => {
    for(let i = 0; i < individuum.length; i ++)
        if (!individuum[i]) return i;
    return individuum.length;
}

export const needle = (individuum: Array<boolean>) => {
    for (let i = 0; i < individuum.length; i ++){
        if (!individuum[i]) return 0;
    }
    return 1;
}

const RADIUS_SQUARED = 20*20;
const CIRCLE_X = 25;
const CIRCLE_Y = 30;
export const circle = (individuum: Array<boolean>) => {
    const n = Math.floor(Math.pow(individuum.length, 0.5));
    let fitness = 0;
    for (let i = 0; i < individuum.length; i ++) {
        const x = i % n;
        const y = (i - x) / n;
        const squareSum = Math.pow((x - CIRCLE_X), 2) + Math.pow((y - CIRCLE_Y), 2);
        if (!individuum[i] && (squareSum >= RADIUS_SQUARED)) fitness++;
        else if (individuum[i] && (squareSum < RADIUS_SQUARED)) fitness++;
    }
    return fitness;
}

// ---------------------------------------
// -------------Algo-stuff----------------
// ---------------------------------------
export type OptimizationAlgo = (individuum: Array<boolean>, testFunction: TestFunction) => [Array<boolean>, boolean]

export const randomLocalSearch = (testFunction: TestFunction, length: number = 9, maxNumberOfSteps=100) => {
    let individuum = generateRandomIndividuum(length) as boolean[];
    let steps = 0;
    while (true){
        individuum = randomLocalSearchStep(individuum, testFunction)[0];
        steps++;
        if (steps > maxNumberOfSteps) break;
    }
}

export const randomLocalSearchStep = (individuum: Array<boolean>, testFunction: TestFunction): [Array<boolean>, boolean] => {
    const indexToFlipAt = Math.floor(Math.random() * individuum.length);
    const flippedBit = !individuum[indexToFlipAt];
    const oldFitness = testFunction(individuum);
    individuum[indexToFlipAt] = flippedBit;
    const fitness = testFunction(individuum);
    const hasImprovedFitness = oldFitness <= fitness;
    if (!hasImprovedFitness) flipBitAt(individuum, indexToFlipAt);
    return [individuum, hasImprovedFitness];
}

export const oneOneEAStep = (individuum: Array<boolean>, testFunction: TestFunction): [Array<boolean>, boolean] => {
    const before = [...individuum];
    for (let i = 0; i < individuum.length; i ++) {
        if (Math.random() < (1.0 / individuum.length)) flipBitAt(individuum, i);
    }
    if (testFunction(individuum) > testFunction(before)) return [individuum, true];
    return [before, false];
}
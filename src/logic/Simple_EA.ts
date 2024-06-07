import { flipBit, flipBitAt, generateRandomIndividuum } from "./helpers";


// ---------------------------------------
// ----------Test-functions---------------
// ---------------------------------------
export type TestFunction = (individuum: Array<number>) => number;

export const oneMax = (individuum: Array<number>) => {
    return linearFunctions(individuum);
}

// TODO: cache stuff!!!
export const linearFunctions = (individuum: Array<number>, weights: undefined|Array<number>=undefined) => {
    // in case no weights are given we'll use just 1 weights (but with defined seed!!!) 
    // we effectively then implement oneMax
    let fitness = 0;
    for (let i = 0; i < individuum.length; i++) {
        if (!weights) fitness += individuum[i];
        else fitness += individuum[i] * weights[i];
    }
    return fitness;
}

export const leadingOnes = (individuum: Array<number>) => {
    const res = individuum.findIndex(val => val === 0);
    // there's no more 0 -> best case; all leading ones
    if (res == -1) return individuum.length;
    return res;
}

export const needle = (individuum: Array<number>) => {
    for (let i = 0; i < individuum.length; i ++){
        if (individuum[i] !== 1) return 0;
    }
    return 1;
}

// ---------------------------------------
// -------------Algo-stuff----------------
// ---------------------------------------
export type OptimizationAlgo = (individuum: Array<number>, testFunction: TestFunction) => [Array<number>, boolean]

export const randomLocalSearch = (testFunction: TestFunction, length: number = 9, maxNumberOfSteps=100) => {
    let individuum = generateRandomIndividuum(length);
    let steps = 0;
    while (true){
        individuum = randomLocalSearchStep(individuum, testFunction)[0];
        steps++;
        if (steps > maxNumberOfSteps) break;
    }
}

export const randomLocalSearchStep = (individuum: Array<number>, testFunction: TestFunction): [Array<number>, boolean] => {
    const indexToFlipAt = Math.floor(Math.random() * individuum.length);
    const flippedBit = flipBit(individuum[indexToFlipAt]);
    const oldFitness = testFunction(individuum);
    individuum[indexToFlipAt] = flippedBit;
    const fitness = testFunction(individuum);
    const hasImprovedFitness = oldFitness <= fitness;
    if (!hasImprovedFitness) flipBitAt(individuum, indexToFlipAt);
    return [individuum, hasImprovedFitness];
}

export const oneOneEAStep = (individuum: Array<number>, testFunction: TestFunction): [Array<number>, boolean] => {
    const before = [...individuum];
    for (let i = 0; i < individuum.length; i ++) {
        if (Math.random() < (1.0 / individuum.length)) flipBitAt(individuum, i);
    }
    if (testFunction(individuum) > testFunction(before)) return [individuum, true];
    return [before, false];
}
import { flipBit, generateRandomIndividuum } from "./helpers";

type TestFunction = (individuum: string) => number;

export const oneMax = (individuum: string, aimedString: undefined|string=undefined) => {
    // TODO implement cache!!!
    let fitness = 0;
    for (let i = 0; i < individuum.length; i ++){
        if (aimedString && aimedString.length > i && individuum[i] === aimedString[i]) fitness++;
        else if (!aimedString && individuum[i] === "1") fitness++;
    }
    return fitness;
}

export const randomLocalSearch = (testFunction: TestFunction, length: number = 9, maxNumberOfSteps=100) => {
    let individuum = generateRandomIndividuum(length);
    let steps = 0;
    while (true){
        individuum = randomLocalSearchStep(individuum, testFunction);
        steps++;
        if (steps > maxNumberOfSteps) break;
    }
}

export const randomLocalSearchStep = (individuum: string, testFunction: TestFunction) => {
    const indexToFlipAt = Math.floor(Math.random() * individuum.length);
    const flippedBit = flipBit(individuum.charAt(indexToFlipAt));
    const newString = individuum.substring(0, indexToFlipAt) + flippedBit + individuum.substring(indexToFlipAt + 1);
    const fitness = testFunction(newString);
    const oldFitness = testFunction(individuum);
    if (fitness > oldFitness) return newString;
    return individuum;
}
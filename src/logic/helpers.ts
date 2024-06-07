export const difference = (a: Array<number>, b: Array<number>) => {
    let diff = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i ++){
        if (a[i] === b[i]) diff ++;
    }
    return diff;
}

export const generateRandomIndividuum = (length: number, binary=true) => {
    let res = [];
    for (let i = 0; i < length; i ++){
        if (binary){
            if (Math.random() < 0.5) res.push(0);
            else res.push(1);
        } else {
            res.push(Math.random())
        }
    }
    return res;
}

export const flipBit = (bit: number) => bit === 0 ? 1: 0;

export const flipBitAt = (individuum: Array<number>, index: number) => individuum[index] = flipBit(individuum[index]);
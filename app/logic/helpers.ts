export const difference = (a: string, b: string) => {
    let diff = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i ++){
        if (a[i] === b[i]) diff ++;
    }
    return diff;
}

export const generateRandomIndividuum = (length: number) => {
    let res = ""
    for (let i = 0; i < length; i ++){
        if (Math.random() < 0.5) res += "0";
        else res += "1";
    }
    return res;
}

export const flipBit = (bit: string) => bit === "0" ? "1": "0";
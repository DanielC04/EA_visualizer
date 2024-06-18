export const generateRandomIndividuum = (length: number, binary=true) => {
    let res = [];
    for (let i = 0; i < length; i ++){
        if (binary){
            if (Math.random() < 0.5) res.push(true);
            else res.push(false);
        } else {
            res.push(Math.random())
        }
    }
    return res;
}

export const flipBitAt = (individuum: Array<boolean>, index: number) => individuum[index] = !individuum[index];
import React, { useEffect, useState } from 'react'
import { oneMax, randomLocalSearchStep } from '../logic/Simple_EA';
import Display from './Display';
import { generateRandomIndividuum } from '../logic/helpers';
import './EACounter.scss'
import { flushSync } from 'react-dom';

const clamp = (min: number, val: number, max: number) => Math.min(max, Math.max(min, val))
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function EACounter() {
  const [displaySize, updateDisplaySize] = useState(20);
  const [individuum, updateIndividuum_raw] = useState(generateRandomIndividuum(displaySize * displaySize));
  const [count, updateCount] = useState(0);
  const [isWorking, setIsWorking] = useState(false);
  const  updateIndividuum = (newIndividuum: string, counterIncrement=1) => {
    updateIndividuum_raw(newIndividuum);
    updateCount(count + counterIncrement);
  }

  // button functions
  const makeNSteps = (n=1000) => {
    let newIndividuum = individuum;
    for (let i = 0; i < 1000; i ++) {
        newIndividuum = randomLocalSearchStep(newIndividuum, oneMax);
    }
    updateIndividuum(newIndividuum, 1000);
  }
  const reset = () => {
    updateIndividuum(generateRandomIndividuum(displaySize * displaySize))
    updateCount(0);
  }
  const countSteps = async (isAnimated=true, delay=0.1) => {
    const testFunction = oneMax;
    setIsWorking(true);
    // as long as maximum of oneMax isn't reached 
    // - TODO what is the maximum of other functions?
    //  -> kind of harder to tell 
    //  -> maybe stop when no more improvement can be noticed for N steps
    let stepsNeeded = count;
    let newIndividuum = individuum;
    while(testFunction(newIndividuum) < individuum.length) {
        newIndividuum = randomLocalSearchStep(newIndividuum, testFunction);
        if (isAnimated && (newIndividuum !== individuum)){
            updateCount(stepsNeeded);
            updateIndividuum_raw(newIndividuum);
            await sleep(delay);
        }
        stepsNeeded ++;
    }
    if (!isAnimated) {
        updateIndividuum_raw(newIndividuum);
        updateCount(count + stepsNeeded);
    }
    setIsWorking(false);
  }

  useEffect(() => {
    updateIndividuum(generateRandomIndividuum(displaySize * displaySize), 0);
  }, [displaySize])

  return (
    <>
      <Display  value={individuum} displayWidth={displaySize} />
      <ul className='info-display'>
        <li>
            <label htmlFor="display-size">Size of the Display</label>
            <input type="number" name="display-size" id="display-size" value={displaySize} onChange={(e) => {
                updateDisplaySize(clamp(1, Number.parseInt(e.target.value), 150));
                updateCount(0);
            }}/>
        </li>
        <li>Count: {count}</li>
        <div className={`controls ${isWorking ? 'greyed-out': ''}`}>
            <button onClick={() => !isWorking && updateIndividuum(randomLocalSearchStep(individuum, oneMax))}>Step</button>
            <button onClick={() => !isWorking && makeNSteps(1000)}>1000 Steps</button>
            <div className='animation-button-box'>
                <span>Count number of needed iterations</span>
                <button onClick={() => !isWorking && countSteps(true)}>With animation</button>
                <button onClick={() => !isWorking && countSteps(false)}>Without animation</button>
            </div>
            <button onClick={() => !isWorking && reset()}>Reset</button>
        </div>
      </ul>
    </>
  )
}

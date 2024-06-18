import React, { useEffect, useState } from 'react'
import { OptimizationAlgo, TestFunction, needle } from '../logic/Simple_EA';
import Display from './Display';
import { generateRandomIndividuum } from '../logic/helpers';
import './EACounter.scss'

const clamp = (min: number, val: number, max: number) => Math.min(max, Math.max(min, val))
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function EACounter(props: { optimizationAlgo: OptimizationAlgo, testFunction: TestFunction, algoName: string}) {
  const [displaySize, updateDisplaySize] = useState(20);
  const [individuum, updateIndividuum_raw] = useState(generateRandomIndividuum(displaySize * displaySize) as boolean[]);
  const [count, updateCount] = useState(0);
  const [isWorking, setIsWorking] = useState(false);

  const  updateIndividuum = (newIndividuum: Array<boolean>, counterIncrement=1) => {
    updateIndividuum_raw(newIndividuum);
    updateCount(count + counterIncrement);
  }

  // button functions
  const makeNSteps = (n=1000) => {
    let newIndividuum = individuum;
    for (let i = 0; i < n; i ++) {
        newIndividuum = props.optimizationAlgo(newIndividuum, props.testFunction)[0];
    }
    updateIndividuum(newIndividuum, n);
  }
  const reset = () => {
    updateIndividuum(generateRandomIndividuum(displaySize * displaySize) as boolean[])
    updateCount(0);
  }
  const countSteps = async (isAnimated=true, delay=1) => {
    const testFunction = props.testFunction;
    setIsWorking(true);
    // as long as maximum of oneMax isn't reached 
    // - TODO what is the maximum of other functions?
    //  -> kind of harder to tell 
    //  -> maybe stop when no more improvement can be noticed for N steps
    let stepsNeeded = count;
    let oldIndividuum;
    let newIndividuum = individuum;
    let didChangeIndividuum;
    let optimalScore = individuum.length;
    if (props.testFunction === needle) optimalScore = 1;
    while(testFunction(newIndividuum) < optimalScore) {
        oldIndividuum = newIndividuum;
        [newIndividuum, didChangeIndividuum] = props.optimizationAlgo(oldIndividuum, testFunction);
        if (isAnimated && didChangeIndividuum){
            updateCount(stepsNeeded);
            updateIndividuum_raw(newIndividuum);
            await sleep(delay);
        }
        if (stepsNeeded % 50000 === 0){
          updateCount(stepsNeeded);
          updateIndividuum_raw(newIndividuum);
          await sleep(.01);
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
    updateIndividuum(generateRandomIndividuum(displaySize * displaySize) as boolean[], 0);
  }, [displaySize])

  return (
    <div className='ea-counter'>
      <h2>{props.algoName}</h2>
      <Display  value={individuum} displayWidth={displaySize} />
      <ul className='info-display'>
        <li>
            <label htmlFor="display-size">Size of the Display</label>
            <input type="number" name="display-size" id="display-size" value={displaySize} onChange={(e) => {
                updateDisplaySize(clamp(1, Number.parseInt(e.target.value), 60) ?? 2);
                updateCount(0);
            }}/>
        </li>
        <li>Count: {count}</li>
        <div className={`controls ${isWorking ? 'greyed-out': ''}`}>
            <button onClick={() => !isWorking && makeNSteps(1)}>Step</button>
            <button onClick={() => !isWorking && makeNSteps(1000)}>1000 Steps</button>
            {
              props.algoName !== "Needle" &&
              <div className='animation-button-box'>
                  <span>Count number of needed iterations</span>
                  <button onClick={() => !isWorking && countSteps(true)}>With animation</button>
                  <button onClick={() => !isWorking && countSteps(false)}>Without animation</button>
              </div>
            }
            <button onClick={() => !isWorking && reset()}>Reset</button>
        </div>
      </ul>
    </div>
  )
}

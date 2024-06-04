"use client";

import { useState } from 'react';
import Display from './Display';
import './page.scss'
import { oneMax, randomLocalSearchStep } from './logic/Simple_EA';
import { generateRandomIndividuum } from './logic/helpers';



export default function Home() {
  const [individuum, updateIndividuum] = useState(generateRandomIndividuum(36));
  // const [numOfSteps, setNumOfSteps] = useState(0);

  return (
    <main className="main-page">
      <h1>Simple Evolutionary Algorithms</h1>
      <Display  value={individuum} />
      <Display  value={individuum} />
      <button onClick={() => {
        updateIndividuum(randomLocalSearchStep(individuum, oneMax));
        // setNumOfSteps(numOfSteps + 1);
      }}>Step</button>
      {/* <div>Number of steps needed: {numOfSteps}</div> */}
    </main>
  );
}
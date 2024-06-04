"use client";

import { useState } from 'react';
import Display from './Display';
import './page.scss'
import { oneMax, randomLocalSearchStep } from './logic/Simple_EA';
import { generateRandomIndividuum } from './logic/helpers';



export default function Home() {
  const [individuum, updateIndividuum] = useState(generateRandomIndividuum(36));

  return (
    <main className="main-page">
      <h1>Simple Evolutionary Algorithms</h1>
      <Display  value={individuum} />
      <Display  value={individuum} />
      <button onClick={() => {
        updateIndividuum(randomLocalSearchStep(individuum, oneMax));
      }}>Step</button>
    </main>
  );
}
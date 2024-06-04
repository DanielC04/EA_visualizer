"use client";

import { useState } from 'react';
import Display from './Display';
import './page.css'

export default function Home() {
  const [individuum, updateIndividuum] = useState("0101010101011111");

  return (
    <main className="main-page">
      <h1>Simple Evolutionary Algorithms</h1>
      <Display  value={individuum} />
      <Display  value={individuum} />
      <button onClick={() => {}}></button>
    </main>
  );
}

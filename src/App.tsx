import { useState } from 'react';
import './index';
import './App.scss'
import { generateRandomIndividuum } from './logic/helpers';
import { oneMax, randomLocalSearchStep } from './logic/Simple_EA';
import Display from './components/Display';

function App() {
  const [individuum, updateIndividuum] = useState(generateRandomIndividuum(5*5));

  return (
    <main className="main-page">
      <h1>Simple Evolutionary Algorithms</h1>
      <Display  value={individuum} />
      <button onClick={() => {
        updateIndividuum(randomLocalSearchStep(individuum, oneMax));
      }}>Step</button>
      <button onClick={() => {
        let newIndividuum = individuum;
        for (let i = 0; i < 100; i ++) {
          newIndividuum = randomLocalSearchStep(newIndividuum, oneMax);
        }
        updateIndividuum(newIndividuum);
      }}>100 Steps</button>
    </main>
  );

}

export default App;

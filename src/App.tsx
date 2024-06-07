import './index';
import './App.scss'
import EACounter from './components/EACounter';
import { leadingOnes, needle, oneMax, oneOneEAStep, randomLocalSearchStep } from './logic/Simple_EA';


function App() {
  return (
    <main className="main-page">
      <h1>Simple Evolutionary Algorithms</h1>
      <div className='ea-counters'>
        <EACounter optimizationAlgo={randomLocalSearchStep} testFunction={oneMax} algoName="Random local search + OneMax"/>
        <EACounter optimizationAlgo={oneOneEAStep} testFunction={oneMax} algoName="(1+1)EA + OneMax"/>
        <EACounter optimizationAlgo={randomLocalSearchStep} testFunction={leadingOnes} algoName="Random local search + Leading Ones" />
        <EACounter optimizationAlgo={oneOneEAStep} testFunction={leadingOnes} algoName="(1+1)EA + Leading Ones" />
        <EACounter optimizationAlgo={oneOneEAStep} testFunction={needle} algoName='Needle'/>
      </div>
    </main>
  );

}

export default App;

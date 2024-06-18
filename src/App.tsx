import './index';
import './App.scss'
import EACounter from './components/EACounter';
import { circle, leadingOnes, needle, oneMax, oneOneEAStep, randomLocalSearchStep} from './logic/Simple_EA';


function App() {
  return (
    <main className="main-page">
      <h1>Simple Evolutionary Algorithms</h1>
      <div className='ea-counters'>
        <EACounter optimizationAlgo={randomLocalSearchStep} testFunction={leadingOnes} algoName="(1+1)EA + Leading Ones" />
        <EACounter optimizationAlgo={randomLocalSearchStep} testFunction={oneMax} algoName="(1+1)EA + OneMax"/>
        <EACounter optimizationAlgo={randomLocalSearchStep} testFunction={needle} algoName='(1+1)EA + Needle'/>
        <EACounter optimizationAlgo={randomLocalSearchStep} testFunction={circle} algoName="(1+1)EA + Circle"/>
      </div>
    </main>
  );
}

export default App;
import './Display.scss'
import Pixel from './Pixel';

export default function Display(props: {value: string}) {
  const individuum = props.value;
  const width = Math.floor(Math.pow(individuum.length, 0.5));

  return (
      <div className="display" style={{gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`}}>
      {
        [...Array(individuum.length)].map((_, i) => 
          <Pixel key={i} value={individuum.charAt(i)} />
        )
      }
    </div>
  )
}
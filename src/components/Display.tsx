import './Display.scss'
import Pixel from './Pixel';

export default function Display(props: {value: Array<number>, displayWidth: number}) {
  const individuum = props.value;
  const displayWidth = props.displayWidth;

  const sideLength = `min(calc(60vh / ${displayWidth}), calc(60vw / ${displayWidth}))`;

  const styles = {
    gridTemplateColumns: `repeat(${displayWidth}, ${sideLength})`,
    gridTemplateRows: `repeat(${displayWidth}, ${sideLength})`,
  }

  return (
      <div className="display" style={styles}>
      {
        [...Array(individuum.length)].map((_, i) => 
          <Pixel key={i} value={individuum[i]} />
        )
      }
    </div>
  )
}
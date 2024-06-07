import React from 'react'

export default function Pixel(props: {value: number}) {
  const greyTone = props.value * 255;
  return (
    <div className='pixel' style={{ backgroundColor: `rgb(${greyTone}, ${greyTone}, ${greyTone})` }}></div>
  )
}
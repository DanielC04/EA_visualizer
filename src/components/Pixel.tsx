import React from 'react'

const whitePixel = <div className='pixel white'></div>
const blackPixel = <div className='pixel black'></div>

export default function Pixel(props: {value: boolean}) {
  return props.value ? whitePixel : blackPixel;
}
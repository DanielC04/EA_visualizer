import React from 'react'

export default function Pixel(props: {value: string}) {
  const color = props.value === "0" ? "white" : "black";
  return (
    <div className={`pixel ${color}`}></div>
  )
}
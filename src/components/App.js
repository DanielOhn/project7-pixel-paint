import React, { useState } from 'react'
import '../styles/App.css'

function App() {
  const [context, setContext] = useState()
  const [canvas, setCanvas] = useState()

  const mouse = {x: 0, y: 0}

  function getCanvas() {
    const canv = document.getElementById('drawing')
    var ctx = canv.getContext('2d')

    const painting = document.getElementById('paint')
    const paint_style = getComputedStyle(painting)

    canv.width = parseInt(paint_style.getPropertyValue('width'))
    canv.height = parseInt(paint_style.getPropertyValue('height'))

    ctx.lineWidth = 3
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#00CC99'

    setCanvas(canv)
    setContext(ctx)
  }

  const mouseMove = () => {
    canvas &&
      canvas.addEventListener(
        'mousemove',
        e => {
          mouse.x = e.clientX 
          mouse.y = e.clientY 
        },
        false
      )
  }

  const mouseDown = () => {
    canvas.addEventListener(
      'mousedown',
      () => {
        context.beginPath()
        context.moveTo(mouse.x, mouse.y)
        canvas.addEventListener('mousemove', onPaint, false)
      },
      false
    )
  }

  const mouseUp = () => {
    canvas.addEventListener(
      'mouseup',
      () => {
        canvas.removeEventListener('mousemove', onPaint, false)
      },
      false
    )
  }

  const onPaint = () => {
    context.lineTo(mouse.x, mouse.y)
    context.stroke()
  }

  return (
    <div className="App">
      <h1>Paint</h1>
      <div id="paint">
        <canvas
          id="drawing"
          onMouseMove={mouseMove}
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
        ></canvas>
      </div>
      {canvas && <div>Canvas Created!</div>}
      {mouse && (
        <div>
          {mouse.x} - {mouse.y}
        </div>
      )}
      <button onClick={getCanvas}>create</button>
    </div>
  )
}

export default App

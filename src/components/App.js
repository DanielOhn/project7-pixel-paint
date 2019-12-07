import React, { useState, useEffect } from 'react'
import '../styles/App.css'

function App() {
  const mouse = { x: 0, y: 0 }
  var canv
  var ctx

  var background = '#555'

  useEffect(() => {
    const painting = document.getElementById('paint')
    const paint_style = getComputedStyle(painting)

    canv = document.getElementById('drawing')
    ctx = canv.getContext('2d')

    canv.width = parseInt(paint_style.getPropertyValue('width'))
    canv.height = parseInt(paint_style.getPropertyValue('height'))

    ctx.lineWidth = 6
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#00CC99'
  }, [])

  const changeSize = size => {
    ctx.lineWidth = size
  }

  const changeColor = color => {
    ctx.strokeStyle = color
  }

  const changeEraser = () => {
    ctx.strokeStyle = background
  }

  const mouseMove = () => {
    canv &&
      canv.addEventListener(
        'mousemove',
        e => {
          const rect = canv.getBoundingClientRect()

          mouse.x = e.clientX - rect.left
          mouse.y = e.clientY - rect.top
        },
        false
      )
  }

  const mouseDown = () => {
    canv.addEventListener(
      'mousedown',
      () => {
        ctx.beginPath()
        ctx.moveTo(mouse.x, mouse.y)
        canv.addEventListener('mousemove', onPaint, false)
      },
      false
    )
  }

  const mouseUp = () => {
    canv.addEventListener(
      'mouseup',
      () => {
        canv.removeEventListener('mousemove', onPaint, false)
      },
      false
    )
  }

  const onPaint = () => {
    ctx.lineTo(mouse.x, mouse.y)
    ctx.stroke()
  }

  // selection

  return (
    <div className="App">
      <h1>Paintin'</h1>
      <div className="content">
        <div id="paint">
          <canvas
            id="drawing"
            onMouseMove={mouseMove}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
          ></canvas>
        </div>
        <div className="colors">
          <h2>Colors</h2>
          <div className="button-list">
            <button
              style={{ backgroundColor: '#00CC99' }}
              onClick={() => changeColor('#00CC99')}
            />
            <button
              style={{ backgroundColor: '#000' }}
              onClick={() => changeColor('#000')}
            />
            <button
              style={{ backgroundColor: '#FFF' }}
              onClick={() => changeColor('#FFF')}
            />
            <button onClick={() => changeEraser()} />
          </div>
          <h2>Size</h2>
          <div className="marker">
            <button
              style={{ height: '10px', width: '10px' }}
              onClick={() => changeSize(10)}
            />
            <button
              style={{ height: '14px', width: '14px' }}
              onClick={() => changeSize(14)}
            />
            <button
              style={{ height: '18px', width: '18px' }}
              onClick={() => changeSize(18)}
            />
            <button
              style={{ height: '22px', width: '22px' }}
              onClick={() => changeSize(22)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

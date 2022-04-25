import 'glsl-canvas-js'
import './Renderer.css'

export function render(shader) {
  if (window.previousRendering) {
    window.previousRendering.destroy()
  }

  const main = document.createElement('main')
  document.body.appendChild(main)

  main.innerHTML = `
    <div id="scene">
      <canvas></canvas>
    </div>
  `

  const canvas = main.querySelector('canvas')
  const glsl = new window.GlslCanvas(canvas)
  let played = false

  glsl.on('error', e => {
    const error = String(e.error)
    console.error(error)
  })

  glsl.load(shader)
  if (!played) {
    glsl.play()
  }

  window.previousRendering = {
    destroy() {
      glsl.destroy()
      main.remove()
    },
  }
}

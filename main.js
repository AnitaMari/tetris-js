import './style.css'
import { BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, EVENT_MOVEMENTS } from './const'

// para hacer el tablero:
// 1. Inicializar el canvas:
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
// 13. Continuación:
const $score = document.querySelector('span')

// 12. Puntuación:
// eslint-disable-next-line no-unused-vars
let score = 0

// 1. Continuación:
canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

// vamos a escalar para que cada punto de nuestro canvas utilice el block size para la x y la y
context.scale(BLOCK_SIZE, BLOCK_SIZE)

// 3. Hacer el board: (14x30) (los 0 son los huecos y los 1 donde hay piezas)
// const board = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
// ]
// 15.
const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT)

// 14. Vamos a refactorizar el board:
function createBoard (width, height) {
  return Array(height).fill().map(() => Array(width).fill(0))
}

// 4. Pieza player:
const piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1]
  ]
}

// 8. Random pieces:
const PIECES = [
  [
    [1, 1],
    [1, 1]
  ],
  [
    [1, 1, 1, 1]
  ],
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [
    [0, 1],
    [0, 1],
    [0, 1]
  ]
]

// 2. Game loop: (sin auto drop)
// function update () {
//   draw()
//   window.requestAnimationFrame(update)
// }

// 7. Auto drop (para que la pieza baje rápido)
let dropCounter = 0
let lastTime = 0

function update (time = 0) {
  const deltaTime = time - lastTime
  lastTime = time

  dropCounter += deltaTime

  if (dropCounter > 1000) {
    piece.position.y++
    dropCounter = 0

    if (checkCollision()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }

  draw()
  window.requestAnimationFrame(update)
}

function draw () {
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = 'yellow'
        context.fillRect(x, y, 1, 1)
      }
    })
  })

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = 'red'
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
      }
    })
  })

  // 13. Para actualizar score
  $score.innerText = score
}

document.addEventListener('keydown', event => {
  // if (event.key === 'ArrowLeft') { // 15. Vamos a refactorizar esto también:
  if (event.key === EVENT_MOVEMENTS.LEFT) {
    piece.position.x--
    if (checkCollision()) {
      piece.position.x++
    }
  }

  if (event.key === EVENT_MOVEMENTS.RIGHT) {
    piece.position.x++
    if (checkCollision()) {
      piece.position.x--
    }
  }

  if (event.key === EVENT_MOVEMENTS.DOWN) {
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }

  // 11. Para rotar:
  if (event.key === 'ArrowUp') {
    const rotated = []

    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = []

      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i])
      }

      rotated.push(row)
    }

    // para que las piezas no roten si no caben porque hay colisión
    const previousShape = piece.shape
    piece.shape = rotated
    if (checkCollision()) {
      piece.shape = previousShape
    }
  }
})

// 4. Para las colisiones:
function checkCollision () {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 &&
        board[y + piece.position.y]?.[x + piece.position.x] !== 0
      )
    })
  })
}

// 5. Hacer que la pieza forme parte del board cuando haga una línea (solidificar)
function solidifyPiece () {
  piece.shape.forEach((row, y) => { // en las matrices es al revés, hay que poner primero la y
    row.forEach((value, x) => { // con estas dos líneas estamos todo el tiempo iterando matrices
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1
      }
    })
  })

  // reseteamos la posición de la pieza:
  piece.position.x = Math.floor(BOARD_WIDTH / 2 - 2) // para que siempre salga la pieza por la mitad más o menos
  piece.position.y = 0

  // 9. Get random shape
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]

  // 10. Game over
  if (checkCollision()) {
    window.alert('Game over! Try again!')
    board.forEach((row) => row.fill(0))
  }
}

// 6. Para eliminar las líneas:
function removeRows () {
  const rowsToRemove = []

  board.forEach((row, y) => {
    if (row.every(value => value === 1)) {
      rowsToRemove.push(y)
    }
  })

  rowsToRemove.forEach(y => {
    board.splice(y, 1) // eliminamos una línea
    const newRow = Array(BOARD_WIDTH).fill(0) // y ponemos una nueva línea y la llenamos de 0
    board.unshift(newRow) // y la añadimos al principio
    // 12. (Continuación). Puntuación. Después ir al index.html
    score += 10
  })
}

// 16. Ponemos música:
const $section = document.querySelector('section')

$section.addEventListener('click', () => {
  update()

  $section.remove()
  const audio = new window.Audio('./tetris.mp3')
  audio.volume = 0.5
  audio.play()
})

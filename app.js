document.addEventListener('DOMContentLoaded', () => {
    console.log('Game initialized')

    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startButton = document.querySelector('#start-button')
    const width = 10

    console.log(squares)

    // The Tetrominoes

    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0

    // Randomly select a Tetromino and it's first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]

    // Draw the first rotation in the first tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    // Undraw the Tetromino
    function unDraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    // Make the tetromino move down every second
    timerId = setInterval(moveDown, 1000)

    // Assing functions to keyCodes
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            // move down
        }
    }
    document.addEventListener('keyup', control)

    // Move down function
    function moveDown() {
        unDraw()
        currentPosition += width
        draw()
        freezeTetromino()
    }

    // Freeze function
    // Stops move down when is floor
    function freezeTetromino() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))

            // starts a new tetromino falling
            random = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }

    // Move the tetromino left, unless is at the edge or is another tetromino
    function moveLeft() {
        unDraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if (!isAtLeftEdge) currentPosition -= 1

        if (current.some(index => squares[currentPosition + index].classList.contains['taken'])) {
            currentPosition += 1
        }

        draw()
    }

    // Move the tetromino left, unless is at the edge or is another tetromino
    function moveRight() {
        unDraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

        if (!isAtRightEdge) currentPosition += 1

        if (current.some(index => squares[currentPosition + index].classList.contains['taken'])) {
            currentPosition -= 1
        }

        draw()
    }

    // Rotates the tetromino
    function rotate() {
        unDraw()
        currentRotation++
        if (currentRotation === current.length) {
            // if current rotation gets to 4, make it go back to 0
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

})
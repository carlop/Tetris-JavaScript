document.addEventListener('DOMContentLoaded', () => {
    console.log('Game initialized')

    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startButton = document.querySelector('#start-button')
    const width = 10

    console.log(squares)

})
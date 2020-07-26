const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
let score = 0 // кол-во кликов по квадратам
const $time = document.querySelector('#time')
let isGameStarted = false
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $result = document.querySelector('#result')
const $gameTime = document.querySelector('#game-time')

$resultHeader.classList.remove('hide')

$start.addEventListener('click', startGame)

$game.addEventListener('click', handlerBoxClick)

$gameTime.addEventListener('input', setGameTime)

function startGame() {
    isGameStarted = true
    $result.textContent = score = 0
    $timeHeader.classList.remove('hide')
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')

    $start.classList.add('hide')
    $game.style.backgroundColor = '#fff'

    let interval = setInterval(function() {
        let timer1 = parseFloat($time.textContent)
        if (timer1 <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (timer1 - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function endGame() {
    isGameStarted = false
    $gameTime.removeAttribute('disabled')

    $start.classList.remove('hide')
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'

    $timeHeader.classList.add('hide')
    // $resultHeader.classList.remove('hide')

    setGameScore()
}

function renderBox() {
    $game.innerHTML = ''

    const box = document.createElement('div')
    const boxSize = getRandom(30, 100)
    const gameSize = $game.getBoundingClientRect()
    const maxTop = gameSize.height - boxSize
    const maxLeft = gameSize.width - boxSize

    box.style.width = box.style.height = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = '#000'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', true)

    $game.insertAdjacentElement('afterbegin', box)
}

function handlerBoxClick(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        // клик по квадрату
        printPlus()
        score++
    } else {
        // промах
        if (score > 0) {
            printMinus()
            score--
        }
    }

    renderBox()
    $result.textContent = score
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    let timeS = +$gameTime.value
    $time.textContent = timeS.toFixed(1)
}

function printPlus() {
    const el = document.createElement('span')
    el.style.fontSize = '36px'
    el.style.color = 'green'
    el.style.fontWeight = 'bold'

    el.style.transitionProperty = 'color'
    el.style.transitionDuration = '1s'

    el.textContent = '  +1'

    $result.insertAdjacentElement('afterend', el)

    setTimeout(() => {
        el.remove()
    }, 500)
}

function printMinus() {
    const el = document.createElement('span')
    el.style.fontSize = '36px'
    el.style.color = 'red'
    el.style.fontWeight = 'bold'

    el.style.transitionProperty = 'color'
    el.style.transitionDuration = '1s'

    el.textContent = '  -1'

    $result.insertAdjacentElement('afterend', el)

    setTimeout(() => {
        el.remove()
    }, 500)
}
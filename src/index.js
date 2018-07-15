const speedDash = document.querySelector(".speedDash")
const scoreDash = document.querySelector(".scoreDash")
const lifeDash = document.querySelector(".lifeDash")
const btnStart = document.querySelector(".btnStart")
const container = document.getElementById("container")

// game variables
let player;
let gamePlay = false
let keys = {
  w: false // up
  , s: false // down
  , a: false // left
  , d: false // right
}

btnStart.addEventListener("click", startGame)
document.addEventListener("keydown", pressKeyOn)
document.addEventListener("keyup", pressKeyOff)

function pressKeyOn(e) {
  e.preventDefault()
  // console.log(keys)
  for (let i in keys) {
    if ( keys.hasOwnProperty(e.key) ) {
      keys[e.key] = true
    }
  }
}

function pressKeyOff(e) {
  e.preventDefault()
  console.log(keys)
  for (let i in keys) {
    if ( keys.hasOwnProperty(e.key) ) {
      keys[e.key] = false
    }
  }
}

function updateDashboard() {
  const {speed, lives, gameScore, carsToPass} = player
  // console.log(player)
  speedDash.innerHTML = speed
  scoreDash.innerHTML = gameScore
  lifeDash.innerHTML = lives
}

function startGame() {
  let div = document.createElement("div")
  div.setAttribute("class", "playerCar")
  div.x = 250
  div.y = 500
  container.appendChild(div)
  // hide btnStart
  btnStart.style.display = "none"
  // set conditional for requestAnimationFrame callback fn
  gamePlay = true

  // constantly changing variables
  player = {
    speed: 1
    , lives: 3
    , gameScore: 0
    , carsToPass: 10
    , roadWidth: 250
    , ele: div // player position obj
  }
  requestAnimationFrame(playGame)
  // create game board (ie road)
  startBoard()
}

function startBoard() {
  for (let i = 0; i < 13; i++) {
    let div = document.createElement("div")
    div.setAttribute("class", "road")
    div.style.top = (i * 50) + "px"
    div.style.width = player.roadWidth
    container.appendChild(div)
  }
}

function playGame() {
  if (gamePlay) {
    // console.log("Game in play")
    updateDashboard()

    // player movement
    const {w, s, a, d} = keys // destructure
    if (w) {
      player.ele.y += (-1)
      player.speed = player.speed < 20 ? (player.speed + 0.05) : 20
    }
    if (s) {
      player.ele.y += (1)
      player.speed = player.speed > 0 ? (player.speed - 0.1) : 0
    }
    if (a) {
      player.ele.x += (-1)
    }
    if (d) {
      player.ele.x += (1)
    }
  }

  player.ele.style.top = player.ele.y + "px"
  player.ele.style.left = player.ele.x + "px"

  // callback fn
  requestAnimationFrame(playGame)
}

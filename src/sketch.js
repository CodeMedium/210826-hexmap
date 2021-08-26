/**
 * Title
 * Started: 8/22/21
 * By: Art See Clarke
 * Twitter: https://twitter.com/thecodemedium
 * GitHub: https://github.com/codemedium
 * Personal website: https://codemedium.com
 *
 * 		 "Any sufficiently advanced technology is indistinguishable from magic"
 * 		 - Arthur C. Clarke
 *
 * Description: 
 */
let size
let boardRadius
let originHex
let hexes = []
let mainLayout
 
/**
 * Color palettes
 */
// VSCode Shades of purple editor colors
colors = ['#ffffff', '#ff628c', '#FF9D00', '#fad000', '#2ca300', '#2EC4B6', '#5D37F0']

/**
 * Sketch entry point
 */
function setup() {
  // Param args
  params = Object.assign({
    hexSize: 20,
    noiseScale: 1 / 500,
    noiseLod: 5,
    noiseFalloff: 0.5
  }, getURLParams())

  if (params.seed) {
    randomSeed(params.seed)
    noiseSeed(params.seed)
  }

  boardRadius = Math.floor(Math.min(windowWidth, windowHeight) / params.hexSize)

  background(25)
  angleMode(degrees)
  size = Point(params.hexSize, params.hexSize)
  originPixel = Point(width / 2, height / 2)
  mainLayout = hexLayout(pointyOrient, size, originPixel)
  hexGenerateBoard(boardRadius, hexes, Hex(0, 0, 0))
  originHex = Hex(0, 0, 0)

	createCanvas(windowWidth, windowHeight)
  recreateMap()
}

/**
 * Regenerates the map
 */
function recreateMap () {
  noiseDetail(params.noiseLod, params.noiseFalloff)
  generateTerrainNoise()

  // stroke(getColor())
  background(50)
  push()
  translate(width/2, height/2)
  for (var i = 0; i < hexes.length; i++) {
    hexDraw(mainLayout, hexes[i], hexes[i].color)
  }
  pop()
}

/**
 * Generates a terrain using noisy data
 */
function generateTerrainNoise () {
  hexes.forEach((hex, i) => {
    hexes[i].color = noise(hex.q / params.noiseScale, hex.r / params.noiseScale) * 255
  })
}

/**
 * Main draw loop
 */
function draw() {
}

/**
 * Returns a color in colors
 */
 function getColor (transparent = '') {
  return colors[Math.floor(random(colors.length))] + transparent
}















/**
 * Handle keypressed across multiple files
 */
function keyPressed () {
  keypressFn.forEach(fn => fn())
}

/**
 * Split keypressed into multiple functions
 * - On my localhost I have another file to record the canvas into a video,
 *   but on OpenProcessing.org this file is not. Locally, the other file
 *   adds another function that starts recording if space is pressed
 * 
 * @see https://github.com/CodeMedium/subdivided-starships
 */
const keypressFn = [function () {
  switch (keyCode) {
    // Space
    case 32:
      recreateMap()
      break
    // 1
    case 49:
      break
    // 2
    case 50:
      break
    // 3
    case 51:
      break
    // 4
    case 52:
      break
    // 5
    case 53:
      break
  }
}]

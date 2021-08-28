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
 * Sketch entry point
 */
function preload() {
  bgImage = loadImage('fantasyhextiles_v3_borderless.png')
}
function setup() {
  // VSCode Shades of purple editor colors
  colors = [
    // Water
    color('#595675'),
    // shore
    color('#82aeaf'),
    // light sand
    color('#f4de5f'),
    // dark sand
    color('#daa06e'),
    // grass
    color('#9ec78a'),
    // trees
    color('#4b8351'),
    // mountain
    color('#bdb29f'),
    // snow
    color('#f4f4e0')
  ]  
  
  // Param args
  params = Object.assign({
    hexSize: 15,
    noiseScale: 6,
    noiseLod: .55,
    noiseFalloff: .25
  }, getURLParams())

  if (params.seed) {
    randomSeed(params.seed)
    noiseSeed(params.seed)
  }

  boardRadius = Math.floor(Math.max(windowWidth, windowHeight) / params.hexSize) / 2

  size = Point(params.hexSize, params.hexSize)
  originPixel = Point(width / 2, height / 2)
  mainLayout = hexLayout(flatOrient, size, originPixel)
  originHex = Hex(0, 0, 0)
  
	main = createCanvas(windowWidth, windowHeight)
  world = createGraphics(windowWidth, windowHeight)
  magnifier = createGraphics(windowWidth, windowHeight)
  
  angleMode(degrees)
  world.angleMode(degrees)
  magnifier.angleMode(degrees)
  
  recreateMap()
}

/**
 * Regenerates the map
 */
function recreateMap () {
  hexGenerateBoard(boardRadius, hexes, Hex(0, 0, 0))
  noiseDetail(params.noiseLod, params.noiseFalloff)
  generateTerrainNoise()
  renderHexes()
}
function renderHexes () {
  world.clear()
  world.stroke(50)
  world.push()
  world.translate(width/2, height/2)
  for (var i = 0; i < hexes.length; i++) {
    hexDraw(mainLayout, hexes[i], colors[hexes[i].type], world)
  }
  world.pop()

  // Render images
  magnifier.clear()
  magnifier.push()
  magnifier.translate(width/2, height/2)
  for (var i = 0; i < hexes.length; i++) {
    // Grab the sprite
    let imgCoord = {}
    switch (hexes[i].type) {
      // Ocean
      case 0: imgCoord = {x: 7, y: 0}; break;
      // Shore
      case 1: imgCoord = {x: 6, y: 0}; break;
      // Beach
      case 2: imgCoord = {x: 0, y: 3}; break;
      // Desert
      case 3: imgCoord = {x: 2, y: 3}; break;
      // Grass
      case 4: imgCoord = {x: 0, y: 0}; break;
      // Forrest
      case 5: imgCoord = {x: 0, y: 4}; break;
      // Mountain
      case 6: imgCoord = {x: 3, y: 0}; break;
      // Snow
      case 7: imgCoord = {x: 5, y: 0}; break;
    }

    // Draw the sprite
    let corners = hexGetCorners(mainLayout, hexes[i])
    magnifier.image(bgImage, corners[5].x, corners[5].y, 32, 48, imgCoord.x * 32, imgCoord.y * 48, 32, 48)
  }
  magnifier.pop()
}

/**
 * Generates a terrain using noisy data
 */
function generateTerrainNoise () {
  let minQ = Math.min.apply(Math, hexes.map(function(hex) {return hex.q}))
  let minR = Math.min.apply(Math, hexes.map(function(hex) {return hex.r}))
  
  // Basic colors
  hexes.forEach((hex, i) => {
    hexes[i].type = getColor(
      noise((hex.q + minR) / params.noiseScale, (hex.r + minQ) / params.noiseScale) * 255
    )
  })
}

/**
 * Main draw loop
 */
function draw() {
  // Draw main world
  clear()
  image(world, 0, 0, windowWidth, windowHeight)
  strokeWeight(3)
  stroke('#fff')
  noFill()
  rect(mouseX - 150, mouseY - 150, 300, 300)
  image(magnifier, mouseX - 150, mouseY - 150, 300, 300, mouseX, mouseY, 150, 150)
}

/**
 * Returns a color in colors
 */
function getColor (noise) {
  // Ocean
  if (noise < 15) {
    return 0
  // Shore
  } else if (noise < 24) {
    return 1
  // Beach
  } else if (noise < 32) {
    return 2
  // Dirt
  } else if (noise < 45) {
    return 3
  // Grass
  } else if (noise < 80) {
    return 4
  // Forrest
  } else if (noise < 100) {
    return 5
  // Mountain
  } else if (noise < 115) {
    return 6
  // Snow
  } else {
    return 7
  }
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
function mouseClicked() {
  hexes = []
  noiseSeed()
  recreateMap()
}
const keypressFn = [function () {
  hexes = []
  noiseSeed()
  recreateMap()

  switch (keyCode) {
    // Space
    case 32:
      noiseSeed()
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

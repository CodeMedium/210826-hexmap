# 210826-hexmap
A minimal p5.js starter kit with the following features:

![ezgif-3-5afed11d0c06](https://user-images.githubusercontent.com/89111078/131428841-63a01367-ecc0-4a19-9f63-0173f74a8297.gif)

```js
// Querystrings
?hexSize=15&noiseScale=.001&noiseLod=5&noiseFalloff=.5&seed=1
```

## CCapture to mp4 with spacebar

Uncomment `ccapturer` line in `index.html` to enable. Then press Space to start recording the canvas into an mp4

## `keyPressed.push(fn)`

All functions passed into this array will be called when p5 calls `keyPressed()`. This is helpful for splitting it across multiple files (eg to record the canvas into a mp4)

## `getColor(transparentAmountHex)`

Returns a random color from `colors`

# Assets
https://cuddlyclover.itch.io/fantasy-hex-tiles

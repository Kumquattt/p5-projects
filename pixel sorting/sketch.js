let img;
let currentColumn = 0;
let sortingDone = false;

let threshold = 30;

function preload() {
  img = loadImage("expedition33.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
}

function draw() {
  if (!sortingDone) {
    if (currentColumn < img.width) {
      //console.log(`${currentColumn}`)
      img.loadPixels();
      sortColumn(currentColumn);
      img.updatePixels();
      currentColumn++;
    } else {
      sortingDone = true;
    }
  }
  image(img, 0, 0);
}

function sortColumn(x) {
  //console.log("sortColumn " + x);
  let y = 0;

  while (y < img.height) {
    ({ startY, y } = getStartY(y, x));

    let endY;
    ({ endY, y } = getEndY(y, x));

    //console.log(`y: ${startY} to ${endY}`);
    if (startY < endY) {
      sortPixelsInColumn(startY, endY, x);
    }
  }
}

function getStartY(y, x) {
  while (y < img.height) {
    let index = getPixelIndex(x, y);
    bn = getBrightness(index);
    if (bn > threshold) {
      //console.log(`Brightness at ${index} = ${bn}`);
      break;
    }
    y++;
  }
  let startY = y;
  return { startY, y };
}

function getEndY(y, x) {
  while (y < img.height) {
    let index = getPixelIndex(x, y);
    bn = getBrightness(index);
    if (bn <= threshold) break;
    y++;
  }
  let endY = y - 1;
  return { endY, y };
}

function sortPixelsInColumn(startY, endY, x) {
  let pixelColumn = [];
  for (let i = startY; i <= endY; i++) {
    pixelColumn.push(getPixelColor(x, i));
  }
  pixelColumn.sort((a, b) => brightness(a) - brightness(b));

  applyColorToImg(startY, endY, pixelColumn, x);
}

function applyColorToImg(startY, endY, pixelColumn, x) {
  //console.log(`Apply color column ${x} from ${startY} to ${endY}`);
  for (let i = startY; i <= endY; i++) {
    let index = getPixelIndex(x, i);
    let newColor = pixelColumn[i - startY];
    img.pixels[index + 0] = red(newColor);
    img.pixels[index + 1] = green(newColor);
    img.pixels[index + 2] = blue(newColor);
    img.pixels[index + 3] = 255; // why ?
  }
}

function getBrightness(index) {
  return brightness(getColor(index));
}

function getPixelColor(x, y) {
  return getColor(getPixelIndex(x, y));
}

function getColor(index) {
  let r = img.pixels[index + 0];
  let g = img.pixels[index + 1];
  let b = img.pixels[index + 2];
  return color(r, g, b);
}

function getPixelIndex(x, y) {
  return (x + y * img.width) * 4;
}

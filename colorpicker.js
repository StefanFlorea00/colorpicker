"use strict";

runColorPicker();

function runColorPicker() {
  const colorPicker = document.querySelector("#colorpicker");
  const harmonySelect = document.querySelector("#harmonySelect");

  initColorPicker(colorPicker, harmonySelect, "#c0ffee");

  harmonySelect.addEventListener("change", function () {
    console.log(getHarmony(this));
    calculateHarmony(getHarmony(this), getHexValue(colorPicker));
  });
  colorPicker.addEventListener("input", function () {
    updateDisplayHex("#colorSelect", getHexValue(this));
    calculateHarmony(getHarmony(harmonySelect), getHexValue(this));
  });
}

function initColorPicker(colorPicker, harmonySelect, color) {
  setHexValue(colorPicker, color);
  updateDisplayHex("#colorSelect", colorPicker.value);
  calculateHarmony(getHarmony(harmonySelect), getHexValue(colorPicker));
}

function setHarmony(element, value) {
  return (element.value = value);
}

function getHarmony(element) {
  switch (element.value) {
    case "analogous":
      return "analogous";
    case "monochromatic":
      return "monochromatic";
    case "triad":
      return "triad";
    case "shades":
      return "shades";
    case "compound":
      return "compound";
  }
}

function getHexValue(element) {
  return element.value;
}

function setHexValue(element, value) {
  return (element.value = value);
}

function getRGBValue(element) {
  let hex = element.value;
  let rgbValue = {
    r: hexToRGB(hex).r,
    g: hexToRGB(hex).g,
    b: hexToRGB(hex).b,
  };
  return rgbValue;
}

function getHSLValue(element) {
  let hex = element.value;
  let rgbValue = hexToRGB(hex);
  let hslValue = {
    h: RGBToHSL(rgbValue.r, rgbValue.g, rgbValue.b).h,
    s: RGBToHSL(rgbValue.r, rgbValue.g, rgbValue.b).s,
    l: RGBToHSL(rgbValue.r, rgbValue.g, rgbValue.b).l,
  };
  return hslValue;
}

function calculateHarmony(type, hexValue) {
  switch (type) {
    case "analogous":
      calculateAnalogous(hexValue);
      break;
    case "monochromatic":
      calculateMonochromatic(hexValue);
      break;
    case "triad":
      calculateTriad(hexValue);
      break;
    case "shades":
      calculateShades(hexValue);
      break;
    case "compound":
      calculateCompound(hexValue);
      break;
  }
}

function calculateAnalogous(hexValue) {
  let rgbValue = hexToRGB(hexValue);
  let hslValue = RGBToHSL(rgbValue);
  for (let i = 0; i < 5; i++) {
    let j = 1;
    if (i <= 1) j *= -1;
    hslValue.h = hslValue.h + i * j * 10;
    if (hslValue.h >= 360) hslValue.h -= 360;
    if (hslValue.h < 0) hslValue.h += 360;
    updateDisplayHSL(`#colorResult${i}`, hslValue);
  }
}

function calculateMonochromatic(hexValue) {
  let rgbValue = hexToRGB(hexValue);
  let hslValue = RGBToHSL(rgbValue);
  for (let i = 0; i < 5; i++) {
    let j = 1;
    if (i <= 1) j *= -1;
    hslValue.l = hslValue.l + i * j * 5;
    if (hslValue.l >= 100) hslValue.l = 100;
    if (hslValue.l < 1) hslValue.l = 0;
    updateDisplayHSL(`#colorResult${i}`, hslValue);
  }
}

function calculateTriad(hexValue) {
  let rgbValue = hexToRGB(hexValue);
  let hslValue = RGBToHSL(rgbValue);
  for (let i = 0; i < 5; i++) {
    let j = 1;
    if (i <= 1) j *= -1;
    hslValue.h = hslValue.h + i * j * 60;
    if (hslValue.h >= 360) hslValue.h -= 360;
    if (hslValue.h < 0) hslValue.h += 360;
    updateDisplayHSL(`#colorResult${i}`, hslValue);
  }
}

function calculateShades(hexValue) {
  let rgbValue = hexToRGB(hexValue);
  let hslValue = RGBToHSL(rgbValue);
  for (let i = 0; i < 5; i++) {
    let j = 1;
    if (i <= 1) j *= -1;
    hslValue.l = hslValue.l - i * j * 5;
    if (hslValue.l >= 100) hslValue.l = 100;
    if (hslValue.l < 1) hslValue.l = 0;
    updateDisplayHSL(`#colorResult${i}`, hslValue);
  }
}

function calculateCompound(hexValue) {
  let rgbValue = hexToRGB(hexValue);
  let hslValue = RGBToHSL(rgbValue);
  for (let i = 0; i < 5; i++) {
    let j = 1;
    if (i <= 1) j *= -1;
    hslValue.h = hslValue.h + 30 * (i + 1) * j;
    while (hslValue.h >= 360) hslValue.h -= 360;
    while (hslValue.h < 0) hslValue.h += 360;
    updateDisplayHSL(`#colorResult${i}`, hslValue);
  }
}

function updateDisplayHSL(element, hslValue) {
  let rgbValue = HSLtoRGB(hslValue);
  let hexValue = RGBToHex(rgbValue);
  updateHexView(`${element} #hexP`, hexValue);
  updateRGBView(`${element} #rgbP`, rgbValue);
  updateHSLView(`${element} #hslP`, hslValue);
  updateColorView(`${element} .colorDiv`, hexValue);
}

function updateDisplayHex(element, hexValue) {
  updateHexView(`${element} #hexP`, hexValue);
  let rgbValue = hexToRGB(hexValue);
  updateRGBView(`${element} #rgbP`, rgbValue);
  let hslValue = RGBToHSL(rgbValue);
  updateHSLView(`${element} #hslP`, hslValue);
  updateColorView(`${element} .colorDiv`, hexValue);
}

function updateColorView(element, hex) {
  document.querySelector(element).style.backgroundColor = hex;
}

function updateHexView(element, hex) {
  document.querySelector(element).textContent = hex;
}

function updateHSLView(element, hsl) {
  document.querySelector(element).textContent =
    "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)";
}

function updateRGBView(element, rgb) {
  document.querySelector(element).textContent =
    "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
}

function hexToRGB(hex) {
  if (hex.charAt(0) != "#" || hex.length < 7) {
    return "#000000";
  } else {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5), 16);
    return {
      r: r,
      g: g,
      b: b,
    };
  }
}

function RGBToHSL(rgb) {
  let r = (rgb.r /= 255);
  let g = (rgb.g /= 255);
  let b = (rgb.b /= 255);
  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }
  if (h < 0) {
    h = h + 360;
  }
  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  s *= 100;
  l *= 100;
  return {
    h: Math.floor(h),
    s: Math.floor(s),
    l: Math.floor(l),
  };
}

function HSLtoRGB(hsl) {
  let h = hsl.h;
  let s = hsl.s / 100;
  let l = hsl.l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function RGBToHex(rgb) {
  return (
    "#" + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b)
  );
}

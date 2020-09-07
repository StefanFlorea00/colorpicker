const colorPicker = document.querySelector("#colorpicker");
colorPicker.addEventListener("input", update);

function update() {
    document.querySelector(".colorDiv").style.backgroundColor = this.value;

    document.querySelector("#hexP").textContent = "HEX: " + this.value;

    const rgb = {
        r: hexToRGB(this.value).r,
        g: hexToRGB(this.value).g,
        b: hexToRGB(this.value).b,
    }
    document.querySelector("#rgbP").textContent = "RGB: " + rgb.r + "," + rgb.g + "," + rgb.b;

    const hsl = {
        h: RGBToHSL(rgb.r, rgb.g, rgb.b).h,
        s: RGBToHSL(rgb.r, rgb.g, rgb.b).s,
        l: RGBToHSL(rgb.r, rgb.g, rgb.b).l,
    }
    document.querySelector("#hslP").textContent = "HSL: " + hsl.h + "," + hsl.s + "%," + hsl.l + "%";
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
        }
    }
}

function RGBToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
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
        s = (max - l) / (Math.min(l, 1 - l));
    }
    s *= 100;
    l *= 100;
    console.log("hsl(%f,%f%,%f%)", h, s, l);
    return {
        h: Math.floor(h),
        s: Math.floor(s),
        l: Math.floor(l),
    }
}
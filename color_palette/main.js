const generateBtn = document.querySelector(".generate-btn");
const paletteContainer = document.querySelector(".palette-box");



const paletteBox = 12;

const generatePalette = () => {
    paletteContainer.innerHTML = "";
    for(let x = 0; x < paletteBox; x++){
        let R = Math.floor((Math.random() * 127) + 127);
        let G = Math.floor((Math.random() * 127) + 127);
        let B = Math.floor((Math.random() * 127) + 127);
        
        let randomColor = (R << 16) + (G << 8) + B;
        randomColor = `#${randomColor.toString(16)}`;
        
        const color = document.createElement("li");
        color.classList.add("color");
        color.innerHTML = `<div class="color-box" style = "background: ${randomColor}"></div> <span class="hex-color">${randomColor}</span>`;
        color.addEventListener("click", () => copyColor(color, randomColor));
        
        paletteContainer.appendChild(color)
    } 
}
const copyColor = (element, colorVal) => {
    const colorElement = element.querySelector(".hex-color");
    navigator.clipboard.writeText(colorVal).then(() => {
        colorElement.innerText = "Copied"
        setTimeout(() => colorElement.innerText = colorVal, 500)
    })
}

generatePalette();
generateBtn.addEventListener("click", generatePalette);
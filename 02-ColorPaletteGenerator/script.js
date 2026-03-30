const generateBtn = document.querySelector(".js-random-button");
const colorBoxes = document.querySelectorAll(".js-color-box");
const hexCodes = document.querySelectorAll(".js-hex-code");
const copyBtns = document.querySelectorAll(".js-copy-button");
function generateHex() {
  const alphabet = "0123456789ABCDEF";
  let newColor = "#";
  for (let i = 0; i < 6; i++) {
    let randomNumber = Math.floor(Math.random() * 16);
    newColor += alphabet[randomNumber];
  }
  return newColor;
}
generateBtn.addEventListener("click", () => {
  colorBoxes.forEach((box, index) => {
    let newColor = generateHex();
    box.style.backgroundColor = newColor;
    hexCodes[index].innerText = newColor;
  });
});
copyBtns.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (hexCodes[index].innerText === "Copied!") return;
    let copyColor = hexCodes[index].innerText;
    navigator.clipboard.writeText(copyColor);
    hexCodes[index].innerText = "Copied!";
    setTimeout(() => {
      hexCodes[index].innerText = copyColor;
    }, 1500);
  });
});

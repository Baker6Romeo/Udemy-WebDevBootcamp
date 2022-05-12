var randomNumber1 = Math.floor(Math.random() * 6 + 1)
document.querySelector(".img1").setAttribute("src", "images/dice" + randomNumber1 + ".png")

var randomNumber2 = Math.floor(Math.random() * 6 + 1)
document.querySelector(".img2").setAttribute("src", "images/dice" + randomNumber2 + ".png")

var header = "Draw"
if (randomNumber1 > randomNumber2) {
  header = "Player 1 Wins!";
} else if (randomNumber2 > randomNumber1) {
  header = "Player 2 Wins!";
}

document.querySelector("h1").textContent = header;

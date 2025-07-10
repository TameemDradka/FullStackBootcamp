const isRefresh = performance.getEntriesByType("navigation")[0].type === "reload";

if (isRefresh) {
    let randomNumber1 = Math.floor((Math.random() * 6)) + 1;
    let randomImg1 = "./images/dice" + randomNumber1 + ".png";
    document.querySelector(".img1").setAttribute("src", randomImg1);

    let randomNumber2 = Math.floor((Math.random() * 6)) + 1;
    let randomImg2 = "./images/dice" + randomNumber2 + ".png";
    document.querySelector(".img2").setAttribute("src", randomImg2);

    if (randomNumber1 === randomNumber2) {
        document.querySelector("h1").textContent = "Draw!";
    } else if (randomNumber1 > randomNumber2) {
        document.querySelector("h1").textContent = "🚩 Player 1 Wins!";
    } else {
        document.querySelector("h1").textContent = "Player 2 Wins! 🚩";
    }
}
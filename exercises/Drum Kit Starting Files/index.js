let numOfDrumBtns = document.getElementsByClassName("drum").length;

for (let i = 0; i < numOfDrumBtns; i++) {
    document.getElementsByClassName("drum")[i].addEventListener("click", function() {
        let btnInnerHtml = this.innerHTML;
        makeSound(btnInnerHtml);
        btnAnimation(btnInnerHtml);
    });
}

document.addEventListener("keydown", function(event) {
    makeSound(event.key);
    btnAnimation(event.key);
});

function makeSound(key) {
    switch (key) {
        case "w":
            let btnAudio1 = new Audio("sounds/tom-1.mp3")
            btnAudio1.play();
            break;

        case "a":
            let btnAudio2 = new Audio("sounds/tom-2.mp3")
            btnAudio2.play();
            break;

        case "s":
            let btnAudio3 = new Audio("sounds/tom-3.mp3")
            btnAudio3.play();
            break;

        case "d":
            let btnAudio4 = new Audio("sounds/tom-4.mp3")
            btnAudio4.play();
            break;

        case "j":
            let btnAudio5 = new Audio("sounds/crash.mp3")
            btnAudio5.play();
            break;    

        case "k":
            let btnAudio6 = new Audio("sounds/kick-bass.mp3")
            btnAudio6.play();
            break;

        case "l":
            let btnAudio7 = new Audio("sounds/snare.mp3")
            btnAudio7.play();
            break;

        default:
            break;
    }
}

function btnAnimation(key) {
    let activeBtn = document.querySelector("." + key);
    activeBtn.classList.add("pressed");

    setTimeout(function() {
        activeBtn.classList.remove("pressed");
    }, 100)
}
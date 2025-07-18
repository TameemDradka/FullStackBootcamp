let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern= [];
let level = 0;
let currentOrder = 0;

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");

    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    
    if (gamePattern[currentOrder] !== userClickedPattern[currentOrder]) {
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        userClickedPattern = [];
        gamePattern = [];
        currentOrder = 0;
        level = 0;

        $(document).keydown(function() {
            nextSequence();
        });
        return;
    } else if (currentOrder === (gamePattern.length - 1)) {
        setTimeout(function() {
            addColourToGamePatternAndPlayIt();
            currentOrder = 0;
            userClickedPattern = [];
            level++;
            $("h1").text("level " + level);
        }, 1000);
        return;
    }

    currentOrder++;
});

$(document).one("keydown", function() {
    nextSequence();
});

function nextSequence() {
    level++;
    $("h1").text("level " + level);

    addColourToGamePatternAndPlayIt();
}

function playSound(name) {
    let btnAudio = new Audio("sounds/" + name + ".mp3");
    btnAudio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function addColourToGamePatternAndPlayIt() {
    let randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);   
}
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

/**
 * generate random sequence and increment the level
 * @returns index of next color sequence
 */
function nextSequence() {
    ++level;
    return Math.floor((Math.random() * 4));
}

$('.btn').on("click", function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    if (userClickedPattern.length === gamePattern.length) {

        if (isUserClickedAndGamePatternsTheSame()) {
            randomChosenColor = buttonColors[nextSequence()]
            setTimeout(function () {
                animateChosenColor();
                changeHeader();
            }, 500);
            gamePattern.push(randomChosenColor);
            userClickedPattern = [];
        } else {
            startOver();
            gameOver();
            changeHeader();

        }
    } else if (userClickedPattern.length > gamePattern.length) {
        startOver();
        gameOver();
        changeHeader();
    }
});

/**
 * generates the syle applied when the game is over
 */
function gameOver() {
    changeHeader();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
}


$(document).on("keypress", function () {
    if (level === 0) {
        randomChosenColor = buttonColors[nextSequence()]
        gamePattern.push(randomChosenColor);
        changeHeader();
        setTimeout(function () {
            animateChosenColor();
            playSound(randomChosenColor);
        }, 500);

    }
});


/**
 * plays the audio associated to the color passed
 * @param {*} userChosenColor 
 */
function playSound(userChosenColor) {
    var audio = new Audio(`sounds/${userChosenColor}.mp3`);
    audio.play();
}

/**
 * utility method to animate the pressed button
 * @param {*} currentColor 
 */
function animatePress(currentColor) {
    $(`#${currentColor}`).animate({}, 100, function () {
        $(`#${currentColor}`).addClass("pressed");
        setTimeout(function () {
            $(`#${currentColor}`).removeClass("pressed");
        }, 100);
    });
}

/**
 * utility method to change the header when the player reaches another level of the game is over.
 */
function changeHeader() {

    if (level === 0) {
        $(`h1`).html(`Game Over, Press Any Key to Restart`);
    } else {
        $(`h1`).html(`Level ${level}`);
    }

}

/**
 * checks whether the game pattern is the same as the user clicked pattern
 * @returns true or false
 */
function isUserClickedAndGamePatternsTheSame() {
    for (var counter = 0; counter < gamePattern.length; ++counter) {
        if (!(gamePattern[counter] === userClickedPattern[counter])) {
            return false;
        }
    }
    return true;
}

/**
 * utility method to animate the random chosen color
 */
function animateChosenColor() {
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
}

/**
 * resets the global values when the game is restarted
 */
function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}
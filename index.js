// Variables for whether the usernames are set:
let User1Set = false;
let User2Set = false;
// Variables for storing the usernames:
let User1Name = "";
let User2Name = "";

// Validating Username:
var regExp = /[a-zA-Z]/g;
function ValidUsername(str) {
    if (regExp.test(str)) {
        console.log(str + " contains characters")
        return true;
    }
    else {
        console.log(str + " Username is invalid")
        return false;
    }
}

// Checking if both usernames are set:
function AreBothUsernamesSet(){
    if (User1Set == true && User2Set == true) {
        return true;
    }
    else {
        return false;
    }
}

// If both usernames are set, the game will start:
function StartGame(){
    console.log("are both usernames set:" + AreBothUsernamesSet());
    if (AreBothUsernamesSet()) {
        console.log("Game has started");
        Game();
    }
    else {
        console.log("Not ready to start")
    }
}

// Button 1 onClick:
function Button1() {

    // Set username:
    User1Name = document.getElementById("username1").value;
    if (ValidUsername(User1Name)) {
        User1Set = true;
        document.getElementById("button1div").innerHTML = "<p>Username is set</p>";
        document.getElementById("username1").disabled = true;
        StartGame();
    }
    else {
        console.log("no no no")
    }
    console.log("Username1set: " + User1Set)
}

// Button 2 onClick.
function Button2() {

    // Set username:
    User2Name = document.getElementById("username2").value;
    if (ValidUsername(User2Name)) {
        User2Set = true;
        document.getElementById("button2div").innerHTML = "<p>Username is set</p>";
        document.getElementById("username2").disabled = true;
        StartGame();
    }
    else {
        console.log("no no no")
    }
    console.log("Username2set: " + User2Set)
}

// Gives visual input for the usernames while typing.
function Username1() {
    let text = document.getElementById("username1");
    let textvalue = text.value;
    
    let result = document.getElementById("result1");
    result.innerText = textvalue;
    const Nav = document.getElementById("nav");
}
function Username2() {
    let text = document.getElementById("username2");
    let textvalue = text.value;

    let result = document.getElementById("result2");
    result.innerText = textvalue;
    const Nav = document.getElementById("nav");
}


/////////////////////////// Game has started /////////////////////////////

// Function for starting the background music.
function PlayMusic() {
    BackgroundMusic = new Audio("kahoot.mp3");
    BackgroundMusic.play();
}
// Function for button click sound effect.
function PlayButtonClickSound() {
    const ButtonClickSound = new Audio("buttonclick.mp3");
    ButtonClickSound.play();
}

// Function that removes an element with a transition. I found this one on stackoverflow and thought it was nice.
function removeFadeOut( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease";

    el.style.opacity = 0;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, speed);
}

// Declaration for the music variable.
var BackgroundMusic;

// Declaring variables for the two players as well as a counter for which question you're on and the correct answer.
let CorrectAnswer;
let CurrentGame = 1;

let p1hasguessed = false;
let p2hasguessed = false;

let p1guess = false;
let p2guess = false;

let p1points = 0;
let p2points = 0;

/* The first function that executes when the game is about to start. It updates the navbar, removes the set-username forms with a transition
and then renders the first question on the screen with the RenderCard() function, after an interval of 1.5 seconds. */
function Game() {
    PlayMusic();
    const Nav = document.getElementById("nav");

    const NavP1 = document.createElement("p");
    NavP1.innerText = User1Name;
    NavP1.id = "navp1";

    const NavVS = document.createElement("strong");
    NavVS.id = "navscoreboard";
    NavVS.innerText = p1points + " - " + p2points;

    const NavP2 = document.createElement("p");
    NavP2.innerText = User2Name;
    NavP2.id = "navp2";

    Nav.innerText = "";
    Nav.append(NavP1, NavVS, NavP2);

    removeFadeOut(document.getElementById("form1"), 1000);
    removeFadeOut(document.getElementById("form2"), 1000);

    setTimeout(function(){
        RenderCard("Can gorillas be dangerous to humans?", true);
    }, 1500);
}

/* The RenderCard() function renders a question with the passed in text. */
function RenderCard(question, questionAnswer) {
    CorrectAnswer = questionAnswer;
    document.getElementById("navp1").style.fontWeight = "bold";
    // Root path
    const App = document.getElementById("app");

    // Creating the card,
    const Card = document.createElement("div");
    Card.id = "card";
    App.append(Card);

    // Creating the question
    const TheQuestion = document.createElement("strong");
    TheQuestion.innerText = question;
    Card.append(TheQuestion);

    // Creating response text or whatever
    let Response = document.createElement("p");
    Response.id = "response";

    // Creating div for the buttons
    const ButtonDiv = document.createElement("div");
    ButtonDiv.id = "ButtonDiv";
    Card.append(Response, ButtonDiv);

    // Creating the true/false buttons
    const TrueButton = document.createElement("button");
    TrueButton.innerText = "👍";
    TrueButton.id = "ButtonOne";
    TrueButton.onclick = ClickedTrue;

    const FalseButton = document.createElement("button");
    FalseButton.innerText = "👎";
    FalseButton.id = "ButtonTwo";
    FalseButton.onclick = ClickedFalse;

    // Appending the buttons
    ButtonDiv.append(TrueButton, FalseButton);
}

/* Functions that executes when the true/false button has been pressed. It checks which user that put the guess and updates it for them. When both 
players have placed their guess, the GuessingComplete() function will execute. */
function ClickedTrue() {
    PlayButtonClickSound()
    console.log("Clicked true button")
    if (!p1hasguessed) {
        p1guess = true;
        p1hasguessed = true;
        console.log(User1Name + " has put their guess on true");
        document.getElementById("response").innerText = User1Name + " guessed True.";
        document.getElementById("ButtonOne").disabled = true;
        document.getElementById("ButtonTwo").disabled = true;
        document.getElementById("navp1").style.fontWeight = "normal";
        setTimeout(function(){
            document.getElementById("ButtonOne").disabled = false;
            document.getElementById("ButtonTwo").disabled = false;
            document.getElementById("navp2").style.fontWeight = "bold";
            document.getElementById("response").innerText = "";
        }, 1000);
    }
    else {
        p2guess = true;
        p2hasguessed = true;
        console.log(User2Name + " has put their guess on true");
        document.getElementById("response").innerText = User2Name + " guessed True.";
        document.getElementById("navp2").style.fontWeight = "normal";
        GuessingComplete();
    }
}
function ClickedFalse() {
    PlayButtonClickSound()
    console.log("Clicked false button")
    if (!p1hasguessed) {
        p1guess = false;
        p1hasguessed = true;
        console.log(User1Name + " has put their guess on false");
        document.getElementById("response").innerText = User1Name + " guessed False.";
        document.getElementById("ButtonOne").disabled = true;
        document.getElementById("ButtonTwo").disabled = true;
        document.getElementById("navp1").style.fontWeight = "normal";
        setTimeout(function(){
            document.getElementById("ButtonOne").disabled = false;
            document.getElementById("ButtonTwo").disabled = false;
            document.getElementById("navp2").style.fontWeight = "bold";
            document.getElementById("response").innerText = "";
        }, 1000);
    }
    else {
        p2guess = false;
        p2hasguessed = true;
        console.log(User2Name + " has put their guess on false")
        document.getElementById("response").innerText = User2Name + " guessed False.";
        document.getElementById("navp2").style.fontWeight = "normal";
        GuessingComplete();
    }
}

/* The GuessingComplete() function disables the buttons, smoothly removes the questioncard and then renders the results
for that question with the RenderResults() function. */
function GuessingComplete() {
    document.getElementById("ButtonOne").disabled = true;
    document.getElementById("ButtonTwo").disabled = true;

    setTimeout(function(){
        if (p1guess == CorrectAnswer) {
            console.log(User1Name + " has guessed the correct answer");
            p1points++;
        }
        else {
            console.log(User1Name + " has not guessed the correct answer");
        }
        if (p2guess == CorrectAnswer) {
            console.log(User2Name + " has guessed the correct answer");
            p2points++;
        }
        else {
            console.log(User2Name + " has not guessed the correct answer");
        }
        console.log(User1Name + " has " + p1points);
        console.log(User2Name + " has " + p2points);
        removeFadeOut(card, 1000);
        setTimeout(RenderResults, 1500);
    }, 700);
}

/* This function renders the result board that displays what the correct answer was as well as how many points each player now has in total.
When you press the "Next Question" button, the NextGame() function will execute. */
function RenderResults() {
    const App = document.getElementById("app");
    const NavScoreBoard = document.getElementById("navscoreboard");
    NavScoreBoard.innerText = p1points + " - " + p2points;


    // Creating resultboard
    let ResultBoard = document.createElement("div");
    ResultBoard.id = "resultboard";
    App.append(ResultBoard);

    // Creating result texts
    let CorrectAnswerText = document.createElement("p");
    CorrectAnswerText.innerText = "The correct answer was: " + CorrectAnswer;
    let P1PointBoard = document.createElement("p");
    P1PointBoard.innerText = User1Name + " currently has " + p1points + " points."
    let P2PointBoard = document.createElement("p");
    P2PointBoard.innerText = User2Name + " currently has " + p2points + " points.";

    ResultBoard.append(CorrectAnswerText, P1PointBoard, P2PointBoard);

    p1hasguessed = false;
    p2hasguessed = false;
    p1guess = false;
    p2guess = false;

    let NextGameBtn = document.createElement("button");
    NextGameBtn.id = "nxtbutton";
    NextGameBtn.innerText = "Next Question";
    NextGameBtn.onclick = NextGame;
    ResultBoard.append(NextGameBtn);
}

/* The NextGame() function slowly removes the resultboard with the help of the removeFadeOut() function, 
then decides which question to render next based on which the previous one was. */
function NextGame() {
    var NextGameBtn = document.getElementById("nxtbutton");
    NextGameBtn.disabled = true;

    removeFadeOut(document.getElementById("resultboard"), 1000);
    setTimeout(function(){
       switch (CurrentGame) {
        case 1:
            CurrentGame++;
            RenderCard("Can gorillas weight over 200kg?", true);
            break;
        case 2:
            CurrentGame++;
            RenderCard("Are gorillas anti-social animals?", false);
            break;
        case 3:
            CurrentGame++;
            RenderCard("Are there only two species of gorilla?", true);
            break;
        case 4:
            CurrentGame++;
            RenderCard("Are the adult males known as silverbacks?", true);
            break;
        case 5:
            CurrentGame++;
            RenderCard("Have gorillas ever been recorded making and using tools?", true);
            break;
        case 6:
            CurrentGame++;
            RenderCard("Are gorillas able to live for more than 100 years?", false);
            break;
        case 7:
            CurrentGame++;
            RenderCard("Do gorillas have longer legs than arms?", false);
            break;
        default:
            RenderFinalStats();
       }
    }, 1500);
}

/* This is the last function which executes when all questions are answered. It renders a board that shows who the winner was, or if it
was a tie. */
function RenderFinalStats() {

    // Pauses the background music.
    BackgroundMusic.pause();
    // Plays the victory sound!
    new Audio("victory.mp3").play();

    const App = document.getElementById("app");
    const FinalResultBoard = document.createElement("div");
    FinalResultBoard.id = "finalresults";
    const Title = document.createElement("strong");
    Title.innerText = "The Winner Is...";
    App.append(FinalResultBoard);
    FinalResultBoard.append(Title);
    setTimeout(function(){
        const FinalResultBoard = document.getElementById("finalresults");
        const WinnerTitle = document.createElement("p");
        if (p1points > p2points) {
            WinnerTitle.innerText = User1Name;
        }
        else if (p1points === p2points) {
            WinnerTitle.innerText = "No one. It's a tie!"
        }
        else {
            WinnerTitle.innerText = User2Name;
        }
        FinalResultBoard.append(WinnerTitle);
    }, 1000);
}
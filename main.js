//1. Bewegungsfunktion für Balken-Bewegung Player (oben und unten)

document.addEventListener("DOMContentLoaded", function() {
    var player1 = document.querySelector(".player1");
    var player2 = document.querySelector(".player2");
    var puck = document.querySelector(".puck");
    var newGameButton = document.querySelector("button");

    var player1Position = 240;
    var player2Position = 240;
    var puckPositionX = 400;
    var puckPositionY = 300;
    var puckSpeedX = 3; // Geschwindigkeit in horizontaler Richtung
    var puckSpeedY = 2; // Geschwindigkeit in vertikaler Richtung

    var player1Score = 0;
    var player2Score = 0;
    var roundsPlayed = 0;
    var roundsToReset = 5;

    var KEY_UP = 38;
    var KEY_DOWN = 40;

    document.addEventListener("keydown", function(event) {
        switch(event.key) {
            case "ArrowUp":
                movePlayer1Up();
                break;
            case "ArrowDown":
                movePlayer1Down();
                break;
        }
    });

    // 2. Spielstart: Klick auf Button

    newGameButton.addEventListener("click", function() {
        if (roundsPlayed >= roundsToReset) {
            // Wenn die maximale Anzahl von Runden erreicht ist, starte das Spiel neu
            resetGame();
            roundsPlayed = 0;
        } else {
            // Starte ein neues Spiel
            startNewRound();
        }
    });

    function movePlayer1Up() {
        if (player1Position > 0) {
            player1Position -= 10;
            player1.style.top = player1Position + "px";
        }
    }

    function movePlayer1Down() {
        if (player1Position < 480) {
            player1Position += 10;
            player1.style.top = player1Position + "px";
        }
    }

    function movePlayer2() {
        var puckPosition = puckPositionY + puck.offsetHeight / 2;

        if (puckPosition < player2Position) {
            player2Position -= 5;
        } else {
            player2Position += 5;
        }

        if (player2Position < 0) {
            player2Position = 0;
        } else if (player2Position > 480) {
            player2Position = 480;
        }

        player2.style.top = player2Position + "px";
    }

    function updateGame() {
        puckPositionX += puckSpeedX;
        puckPositionY += puckSpeedY;

        // Überprüfen, ob der Puck die Spielfeldgrenzen erreicht hat
        if (puckPositionX < 0 || puckPositionX > 800) {
            // Der Puck hat eine Seitenwand erreicht, das Spiel ist vorbei
            handleRoundEnd();
            return;
        }
// 4. // Reaktion, wenn Ball an Spielfeldrand gerät -> Punkt für gegn. Spieler

        // Überprüfen, ob der Puck die oberen oder unteren Spielfeldgrenzen erreicht hat
        if (puckPositionY < 0 || puckPositionY > 600) {
            // Der Puck hat die obere oder untere Wand erreicht, ändere die Richtung
            puckSpeedY = -puckSpeedY;
        }
// 5. // Reaktion, wenn Ball auf Balken trifft -> Bewegung in entgegengesetzte Richtung
        // Überprüfen, ob der Puck den Spieler 1 oder Spieler 2 berührt hat
        if (
            (puckPositionX <= 11 && puckPositionY >= player1Position && puckPositionY <= player1Position + 120) ||
            (puckPositionX >= 789 && puckPositionY >= player2Position && puckPositionY <= player2Position + 120)
        ) {
            // Der Puck hat einen Spieler getroffen, ändere die Richtung horizontal
            puckSpeedX = -puckSpeedX;
        }

        puck.style.left = puckPositionX + "px";
        puck.style.top = puckPositionY + "px";

        movePlayer2();
        requestAnimationFrame(updateGame);
    }
    function handleRoundEnd() {
        if (puckPositionX < 0) {
            // Punkt für Spieler 2
            player2Score++;
        } else {
            // Punkt für Spieler 1
            player1Score++;
        }

        // Aktualisiere den Punktestand
        updateScore();

        roundsPlayed++;

        if (roundsPlayed >= roundsToReset) {
            // Wenn die maximale Anzahl von Runden erreicht ist, aktiviere den Button für ein neues Spiel
            newGameButton.disabled = false;
        } else {
            // Starte eine neue Runde
            startNewRound();
        }
    }

    function startNewRound() {
        // Setze den Puck in der Spielfeldmitte
        puckPositionX = 400;
        puckPositionY = 300;
        puckSpeedX = Math.random() > 0.5 ? 3 : -3; // Zufällige Richtung horizontal
        puckSpeedY = Math.random() > 0.5 ? 2 : -2; // Zufällige Richtung vertikal

        // Deaktiviere den Button für ein neues Spiel
        newGameButton.disabled = true;

        updateGame();
    }

    function updateScore() {
        document.querySelector("h1").textContent = "Spielstand " + player1Score + " : " + player2Score;
    }

    function resetGame() {
        // Setze den Punktestand zurück
        player1Score = 0;
        player2Score = 0;

        // Aktualisiere den Punktestand
        updateScore();

        // Starte eine neue Runde
        startNewRound();
    }
});



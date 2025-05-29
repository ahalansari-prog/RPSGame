      // Creating the score object to track the game score
      const score = {
        wins: 0,
        losses: 0,
        ties: 0,
      };

      //Adding a listener to check local storage and if there is data score will update
      window.addEventListener("storage", updateScore(), true);
      // Generating the computer move [Using random number]
      //comparing the user and computer moves
      function generateComputerMove(userMove) {
        // Using random method to generate random value
        const randNumber = Math.random();
        // Creating a variable to hold computer move
        let computerMove = "";
        // Checking the random value to assign a move
        // Assumption [dividing a random range into 3 sections]
        if (randNumber >= 0 && randNumber < 1 / 3) {
          computerMove = "Rock";
        } else if (randNumber >= 1 / 3 && randNumber < 2 / 3) {
          computerMove = "Paper";
        } else if (randNumber >= 2 / 3 && randNumber < 1) {
          computerMove = "Scissors";
        }

        console.log(computerMove, " - ", randNumber);

        compareMoves(computerMove, userMove);
      }

      function compareMoves(computerChoice, userChoice) {
        //Creating a variable to store comparison result
        let theResult = "";

        //Comparing user and computer moves
        if (computerChoice === userChoice) {
          theResult = "Tie";
        } else if (computerChoice === "Rock" && userChoice === "Paper") {
          theResult = "You win";
        } else if (computerChoice === "Rock" && userChoice === "Scissors") {
          theResult = "You lose";
        } else if (computerChoice === "Paper" && userChoice === "Rock") {
          theResult = "You lose";
        } else if (computerChoice === "Paper" && userChoice === "Scissors") {
          theResult = "You win";
        } else if (computerChoice === "Scissors" && userChoice === "Paper") {
          theResult = "You lose";
        } else if (computerChoice === "Scissors" && userChoice === "Rock") {
          theResult = "You win";
        }
        if (theResult === "You win") {
          score.wins += 1;
        } else if (theResult === "You lose") {
          score.losses += 1;
        } else if (theResult === "Tie") {
          score.ties += 1;
        }

        // Storing the current score in the local storage Object
        // local storage object works with "String" typed data, so we need to convert
        // the score object into string before adding it
        localStorage.setItem("score", JSON.stringify(score));
        displayResults(theResult,computerChoice,userChoice);
        // console.log(`You picked: ${userChoice}. Computer picked: ${computerChoice}. ${theResult}\n Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
      }

      function resetScore() {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        // localStorage.clear(); clears all local storage
        localStorage.removeItem("score"); // removes specific item in local storage
        displayResults();
        // console.log(`The score has been reset. This is a fresh start.\n Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
      }
      function displayResults(
        aResult = "New Game",
        aComputerChoice = "No Moves",
        aUserChoice = "No Moves"
      ) {
        let theResultDisplay = document.querySelector(".jsResult");
        let theMovesDisplay = document.querySelector(".jsMoves");
        let theScoreDisplay = document.querySelector(".jsScore");
        theResultDisplay.innerHTML = aResult;
        theMovesDisplay.innerHTML = `You
                <img class="moveIcon" src="/img/${aUserChoice}Final.png" alt="${aUserChoice}"/>
                <img class="moveIcon" src="/img/${aComputerChoice}Final.png" alt="${aComputerChoice}"/> Computer`;
        theScoreDisplay.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
      }
      // Adding a function to update the object using the local storage
      function updateScore() {
        // Getting data from local storage object
        let newScore = JSON.parse(localStorage.getItem("score"));

        //checking if the score object is not null

        if (newScore === null) {
          alert("There is no saved score.");
        } else {
          alert("Saved score available");
          //Updating the score object
          score.wins = newScore.wins;
          score.ties = newScore.ties;
          score.losses = newScore.losses;
        //   console.log(`Current score:\n Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
          displayResults();
        }
      }
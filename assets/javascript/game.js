$(document).ready(function() {

    var characterChoices = [
        ["Luke", 175, 4, 25, '<div class="card player-character" alt="Luke" style="width: 100%;"><img src="assets/images/luke.jpeg" class="card-img-top" alt="Luke Skywalker"><div class="card-body"><h5 class="card-title">Luke Skywalker</h5><p class="card-text" id="Luke-text">175 HP</p></div></div>'],
        ["Han", 100, 8, 8, '<div class="card player-character" alt="Han" style="width: 100%;"><img src="assets/images/han.jpeg" class="card-img-top" alt="Han Solo"><div class="card-body"><h5 class="card-title">Han Solo</h5><p class="card-text" id="Han-text">100 HP</p></div></div>'],
        ["Vader", 140, 6, 5, '<div class="card player-character" alt="Vader" style="width: 100%;"><img src="assets/images/vader.jpeg" class="card-img-top" alt="Darth Vader"><div class="card-body"><h5 class="card-title">Darth Vader</h5><p class="card-text" id="Vader-text">140 HP</p></div></div>'],
        ["Boba-Fett", 125, 7, 35, '<div class="card player-character" alt="Boba-Fett" style="width: 100%;"><img src="assets/images/fett.jpeg" class="card-img-top" alt="Boba Fett"><div class="card-body"><h5 class="card-title">Boba Fett</h5><p class="card-text" id="Boba-Fett-text">125 HP</p></div></div>']];
    
    var usedNames = [];
    var opponentsFought = 0;
    
    const character = {
        name: "",
        hp: 0,
        attackStat: 0,
        counterAttackStat: 0,
        characterCard: "",
        pickMe: function(arr) {
            this.name = arr[0];
            this.hp = arr[1];
            this.attackStat = arr[2];
            this.counterAttackStat = arr[3]
            this.characterCard = arr[4];
        },
        resetCharacter: function() {
            this.name = "";
            this.hp = 0;
            this.attackStat = 0;
            this.counterAttackStat = 0;
            this.characterCard = "";
        },
    };
    //make two variables to hold character objects
    var playerCharacter = Object.create(character);
    var opponentCharacter = Object.create(character);
    
    //rewrite the info in the html after the player is chosen
    function playerPickRewrite() {
        //empty the player chooser divs
        for(var PCID=1; PCID < 5; PCID++) {
            $("#PC" + PCID).empty();
        }
        //rewrite the html so the chosen player's card is displayed in the first column
        $("#PC1").html(playerCharacter.characterCard);
        //change the "choose a player" text
        $("#player-head").text("Player!");
        rewriteOpponentSelector();
    };
    //empty the opponent selector area then
    //check each character against usedNames to make sure we don't display
    //the ones who have been defeated or the ones who are currently fighting
    function rewriteOpponentSelector() {
        for(var oppNum=1; oppNum < 5; oppNum++) {
            $(".opponent-" + oppNum).empty();
        }
        var opponentSelector = 1;
        for(var oppId=0; oppId < characterChoices.length; oppId++) {
            if(jQuery.inArray(characterChoices[oppId][0], usedNames) === -1){
                $(".opponent-" + opponentSelector).html(characterChoices[oppId][4]);
                $(".opponent-" + opponentSelector).attr("alt", characterChoices[oppId][0])
                opponentSelector++;
            }
        }
        //if you chose the last opponent, remove the opponent selector area from the screen
        if(opponentsFought < 3){
            $("#picked-opponent-head").text("Choose an opponent!");
        } else {
            $("#picked-opponent-head").empty();
        }
    };
    //function to add the character you chose to the opponent area
    function rewriteFightingOpponent() {
        $(".chosen-opponent").html(opponentCharacter.characterCard);
        $("#opponent-head").text("Opponent!");
        rewriteOpponentSelector();
    };
    //attack function
    function attack() {
        //decrement player and opponent hp with appropriate damage taken
        opponentCharacter.hp -= playerCharacter.attackStat;
        playerCharacter.hp -= opponentCharacter.counterAttackStat;
        //add an area to display how much damge each character did
        $("#damage-box").css("border", "solid black 2px");
        $("#damage-box").css("background-color", "white");
        //update the damage in the damage display area
        $("#player-damage").text(`You did ${playerCharacter.attackStat} damage!`);
        $("#opponent-damage").text(`You took ${opponentCharacter.counterAttackStat} damage!`);
        //update player's attackStat
        playerCharacter.attackStat = playerCharacter.attackStat * 2;
        //update the hp on the character cards
        $("#" + playerCharacter.name + "-text").text(`${playerCharacter.hp} HP`);
        $("#" + opponentCharacter.name + "-text").text(`${opponentCharacter.hp} HP`);
        //if the player's health goes to 0 or lower you lose
        if(playerCharacter.hp <= 0) {
            alert("Oh no! You lost!");
            $(".opponent-choice").text("");
            //change attack button text to reset
            $("#Attack").text("Reset");
        //if opponent health goes to or below 0 you beat them
        } else if(opponentCharacter.hp <= 0) {
            alert(`You beat ${opponentCharacter.name}!`);
            //remove the charater card
            $(".chosen-opponent").empty();
            $("#opponent-head").empty();
            //remove the character from the object
            opponentCharacter.resetCharacter();
            //if you beat all the characters you win the game
            if(opponentsFought  === 3) {
                alert("You beat them all! You win!");
                $(".opponent-choice").text("");
                //change the attack button text to reset
                $("#Attack").text("Reset");
                //change player's health so the reset button will work
                playerCharacter.hp = 0;
            }
        };
        //if both players have 0 hp change the attack button text to reset
        if(opponentCharacter.hp <= 0 && playerCharacter.hp <= 0) {
            $(".opponent-choice").text("");
            $("#Attack").text("Reset");
        }
    };

    //pick a player character
    $(".player-character").on("click", function() {
        //use the attribute "alt" of the card we clicked to find out which character we picked
        //this corresponds with the name of the characters in the array of possible characters and add this to the usedNames array
        var chosenName;
        //if the name in the alt attribute matches the first part of the index of the array, that is the player's choice
        //and use the pickMe method to assign the info to the playerCharacter object
        //then refresh the info on the page, but only if there isn't already a character chosen
        if(!playerCharacter.name) {
            chosenName = $(this).attr("alt");
            usedNames[opponentsFought] = chosenName;  
            for(var characterIdx = 0; characterIdx < characterChoices.length; characterIdx++){
                if(chosenName === characterChoices[characterIdx][0]) {
                    playerCharacter.pickMe(characterChoices[characterIdx]);
                    playerPickRewrite();
                }
            }
        }
    });
    //choose the opponent if there hasn't already been one chosen then update the info on the screen
    $(".opponent-choice").on("click", function() {
        var chosenOpponent;
        if(!opponentCharacter.name) {
            chosenOpponent = $(this).attr("alt");
            opponentsFought= opponentsFought + 1;
            usedNames[opponentsFought] = chosenOpponent;
            for(var characterIdx = 0; characterIdx < characterChoices.length; characterIdx++){
                if(chosenOpponent === characterChoices[characterIdx][0]) {
                    opponentCharacter.pickMe(characterChoices[characterIdx]);
                    rewriteFightingOpponent()
                }
            }
        } 
    })
    //attack if possible. if not possible, reload the page to start the game over
    $("#attack-button").on("click", function() {
        if (playerCharacter.hp > 0 && opponentCharacter.hp > 0){
            attack();
        }
        else if(playerCharacter.hp <= 0 && playerCharacter.name !== "") {
            location.reload();
        };
    });

});

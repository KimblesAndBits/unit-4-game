$(document).ready(function() {

    var characterChoices = [
        ["Luke", 175, 4, 25, '<div class="card" id="player-character alt="Luke" style="width: 100%;"><img src="assets/images/luke.jpeg" class="card-img-top" alt="Luke Skywalker"><div class="card-body"><h5 class="card-title">Luke Skywalker</h5><p class="card-text" id="Luke-text">175 HP</p></div></div>'],
        ["Han", 100, 8, 8, '<div class="card player-character" alt="Han" style="width: 100%;"><img src="assets/images/han.jpeg" class="card-img-top" alt="Han Solo"><div class="card-body"><h5 class="card-title">Han Solo</h5><p class="card-text" id="Han-text">100 HP</p></div></div>'],
        ["Vader", 140, 6, 5, '<div class="card player-character" alt="Vader" style="width: 100%;"><img src="assets/images/vader.jpeg" class="card-img-top" alt="Darth Vader"><div class="card-body"><h5 class="card-title">Darth Vader</h5><p class="card-text" id="Vader-text">140 HP</p></div></div>'],
        ["Boba-Fett", 125, 7, 18, '<div class="card player-character" alt="Boba-Fett" style="width: 100%;"><img src="assets/images/fett.jpeg" class="card-img-top" alt="Boba Fett"><div class="card-body"><h5 class="card-title">Boba Fett</h5><p class="card-text" id="Boba-Fett-text">125 HP</p></div></div>']];
    
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
    //make two variables that equal character objects
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
        if(opponentsFought < 3){
            $("#picked-opponent-head").text("Choose an opponent!");
        } else {
            $("#picked-opponent-head").empty();
        }
    };
    
    function rewriteFightingOpponent() {
        $(".chosen-opponent").html(opponentCharacter.characterCard);
        $("#opponent-head").text("Opponent!");
        rewriteOpponentSelector();
    };
    
    function attack() {
        opponentCharacter.hp -= playerCharacter.attackStat;
        playerCharacter.hp -= opponentCharacter.counterAttackStat;
        $("#player-damage").text(`You did ${playerCharacter.attackStat} damage!`);
        $("#opponent-damage").text(`You took ${opponentCharacter.counterAttackStat} damage!`);
        $("#damage-box").css("border", "solid black 2px");
        $("#damage-box").css("background-color", "white");
        playerCharacter.attackStat = playerCharacter.attackStat * 2;
        $("#" + playerCharacter.name + "-text").text(`${playerCharacter.hp} HP`);
        $("#" + opponentCharacter.name + "-text").text(`${opponentCharacter.hp} HP`);
        if(playerCharacter.hp <= 0) {
            alert("Oh no! You lost!");
            $(".opponent-choice").text("");
            $("#Attack").text("Reset");
        } else if(opponentCharacter.hp <= 0) {
            alert(`You beat ${opponentCharacter.name}!`);
            $(".chosen-opponent").empty();
            $("#opponent-head").empty();
            opponentCharacter.resetCharacter();
            if(opponentsFought  === 3) {
                alert("You beat them all! You win!");
                $(".opponent-choice").text("");
                $("#Attack").text("Reset");
                playerCharacter.hp = 0;
            }
        };
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
        //then refresh the page
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

    $("#attack-button").on("click", function() {
        if (playerCharacter.hp > 0){
            attack();
        }
        else if(playerCharacter.hp <= 0 && playerCharacter.name !== "") {
            location.reload();
        };
    });

});

var characterChoices = [
["Luke", 175, 4, 25, '<div class="card" alt="Luke" style="width: 100%;"><img src="assets/images/luke.jpeg" class="card-img-top" alt="Luke Skywalker"><div class="card-body"><h5 class="card-title">Luke Skywalker</h5><p class="card-text" id="Luke-text">175 HP</p></div></div>'],
["Han", 100, 8, 12, '<div class="card" alt="Han" style="width: 100%;"><img src="assets/images/han.jpeg" class="card-img-top" alt="Han Solo"><div class="card-body"><h5 class="card-title">Han Solo</h5><p class="card-text" id="Han-text">100 HP</p></div></div>'],
["Vader", 140, 6, 5, '<div class="card" alt="Vader" style="width: 100%;"><img src="assets/images/vader.jpeg" class="card-img-top" alt="Darth Vader"><div class="card-body"><h5 class="card-title">Darth Vader</h5><p class="card-text" id="Vader-text">140 HP</p></div></div>'],
["Boba-Fett", 125, 7, 16, '<div class="card" alt="Boba-Fett" style="width: 100%;"><img src="assets/images/fett.jpeg" class="card-img-top" alt="Boba Fett"><div class="card-body"><h5 class="card-title">Boba Fett</h5><p class="card-text" id="Boba-Fett-text">125 HP</p></div></div>']];

var character = {
    name: "?",
    hp: 0,
    attackStat: 0,
    counterAttackStat: 0,
    characterCard: "?",
    pickMe: function(arr) {
        this.name = arr[0];
        this.hp = arr[1];
        this.attackStat = arr[2];
        this.counterAttackStat = arr[3]
        this.characterCard = arr[4];
    },
    resetCharacter: function() {
        this.name = "?";
        this.hp = 0;
        this.attackStat = 0;
        this.counterAttackStat = 0;
        this.characterCard = "?";
    },
}
//make two variables that equal character objects
var playerCharacter = character;
var opponentCharacter = character;
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
    //initialize a variable to count through the opponent choice divs
    var oppNum = 1;
    //move through characterChoices and assign the card html to each column as long as it isn't the chosen character
    for(var oppId=0; oppId < characterChoices.length; oppId++) {
        if(playerCharacter.name !== characterChoices[oppId][0]){
            $(".opponent-" + oppNum).html(characterChoices[oppId][4]);
            oppNum++;
        }
    }
}

$(document).ready(function() {
    //pick a player character
    $(".player-character").on("click", function() {
        //use the attribute "alt" of the card we clicked to find out which character we picked
        //this corresponds with the name of the characters in the array of possible characters
        var chosenName = $(this).attr("alt");
        //if the name in the alt attribute matches the first part of the index of the array, that is the player's choice
        //and use the pickMe method to assign the info to the playerCharacter object
        //then refresh the page
        if(playerCharacter.name === "?") {
            for(var characterIdx = 0; characterIdx < characterChoices.length; characterIdx++){
                if(chosenName === characterChoices[characterIdx][0]) {
                    playerCharacter.pickMe(characterChoices[characterIdx]);
                    playerPickRewrite();
                }
            }
        }
    });

    $(".")

});

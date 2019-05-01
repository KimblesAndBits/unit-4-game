var characterChoices = [
["Luke", 175, 4, 25, "assets/images/luke.jpeg"],
["Han", 100, 8, 12, "assets/images/han.jpeg"],
["Vader", 140, 6, 5, "assets/images/vader.jpeg"],
["Boba-Fett", 125, 7, 16, "assets/images/fett.jpeg"]];

var character = {
    name: "?",
    hp: 0,
    attackStat: 0,
    counterAttackStat: 0,
    characterImage: "?",
    pickMe: function(arr) {
        this.name = arr[0];
        this.hp = arr[1];
        this.attackStat = arr[2];
        this.counterAttackStat = arr[3]
        this.characterImage = arr[4];
    },
    resetCharacter: function() {
        this.name = "?";
        this.hp = 0;
        this.attackStat = 0;
        this.counterAttackStat = 0;
        this.characterImage = "?";
    },
}
var playerCharacter = character;
var opponentCharacter = character;

function rewrite() {
    for(i=0; i < characterChoices.length; i++) {
        console.log(characterChoices[i][0]);
        $("#" + characterChoices[i][0]).empty();
        $("#" + characterChoices[i][0]).removeElement("id");
    }
}

$(document).ready(function() {

    $("#Luke").on("click", function() {
        if(playerCharacter.name === "?") {
        playerCharacter.pickMe(characterChoices[0]);
        rewrite();
        }
    });

});

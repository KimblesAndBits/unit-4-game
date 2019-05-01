var info = ["name", "hp", "attack stat", "counter attack stat", "character image"];

var Luke = ["Luke", 175, 4, 25, "assets/images/luke.jpeg"];

var Han = ["Han", 100, 8, 12, "assets/images/han.jpeg"];

var Vader = ["Vader", 140, 6, 5, "assets/images/vader.jpeg"];

var bobaFett = ["Boba Fett", 125, 7, 16, "assets/images/fett.jpeg"];

var playerCharacter = {
    name: "?",
    hp: 0,
    attackStat: 0,
    characterImage: "?",
    pick = function(arr) {
        this.name = arr[0];
        this.hp = arr[1];
        this.attackStat = arr[2];
        this.characterImage = arr[4];
    },
    resetCharacter = function() {
        this.name = "?";
        this.hp = 0;
        this.counterAttackStat = 0;
        this.characterImage = "?";
    },
}

var opponentCharacter = {
    name: "?",
    hp: 0,
    counterAttackStat: 0,
    characterImage: "?",
    pick = function(arr) {
        this.name = arr[0];
        this.hp = arr[1];
        this.counterAttackStat = arr[3];
        this.characterImage = arr[4];
    },
    resetCharacter = function() {
        this.name = "?";
        this.hp = 0;
        this.counterAttackStat = 0;
        this.characterImage = "?";
    },
}
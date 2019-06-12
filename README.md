# unit-4-game
Star Wars RPG

This is a short Star Wars game where you pick a fighter and fight against a few enemies.

# Problem:
When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.
The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen.
The player chooses an opponent by clicking on an enemy's picture.
Once the player selects an opponent, that enemy is moved to a defender area.

The player will now be able to click the attack button.


Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points). These points are displayed at the bottom of the defender's picture. 
The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their HP. These points are shown at the bottom of the player character's picture.

The player will keep hitting the attack button in an effort to defeat their opponent.

When the defender's HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent.

The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below.

# Solution:
I started with a two dimensional array that contains all of the info for each character including the html for their card. When you click on a character it is moved to the first position on the screen and the others are moved down to the enemy selection area. The player character object is filled with the info from the array that matches the character you chose. Then you pick your enemy and it is moved down to the enemy fighter area while the other two stay in the selection area but are moved over so there is no space between them. The enemy character is then filled with the info from the array of the character you chose to fight. Then you attack the enemy and they attack back. if you win you chose another enemy until there are no more. Then you win. If your health goes down to zero you lose. Either way the attack button changes to a reset button so you can start over.

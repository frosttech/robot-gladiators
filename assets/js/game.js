var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 50;

var fightReward = 20;
var skipCost = 10;

var fight = function(enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {
        var promptFight = prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // CHECKING FOR SKIP
        if (promptFight.toLowerCase() == "skip") {
            if (playerMoney >= skipCost) {
                var confirmSkip = confirm(`Are you sure you'd like to quit?\nTHIS WILL COST ${skipCost} GOLD!`);
                if (confirmSkip) {
                    playerMoney = playerMoney - skipCost;
                    var skippedBattle = `Player ${playerName} skipped the battle and lost ${enemyAttack} gold!\n--- Player Stats ---\nName: ${playerName}\nHealth: ${playerHealth}HP\nAttack: ${playerAttack}\nMoney: ${playerMoney} Gold`;
                    alert(skippedBattle);
                    console.log(skippedBattle);
                    break;
                }
            }
            else {
                alert('You do not have enough gold to skip the battle!');
            }
        }

        // ENEMY DAMAGE
        enemyHealth = enemyHealth - playerAttack;
        console.log(`Enemy ${enemyName} was attacked by player ${playerName} and lost ${playerAttack}HP!\n--- Enemy Stats ---\nName: ${enemyName}\nHealth: ${enemyHealth}HP\nAttack: ${enemyAttack}`);
        if (enemyHealth <= 0) {
            alert(`Enemy ${enemyName} has died!`);
            playerMoney = playerMoney + fightReward;
            break;
        }
        else {
            alert(`Enemy ${enemyName} has ${enemyHealth}HP remaining.`);
        }

        // PLAYER DAMAGE
        playerHealth = playerHealth - enemyAttack;
        console.log(`Player ${playerName} was attacked by enemy ${enemyName} and lost ${enemyAttack}HP!\n--- Player Stats ---\nName: ${playerName}\nHealth: ${playerHealth}HP\nAttack: ${playerAttack}\nMoney: ${playerMoney} Gold`);
        if (playerHealth <= 0) {
            alert(`Player ${playerName} has died!`);
            break;
        }
        else {
            alert(`Player ${playerName} has ${playerHealth}HP remaining.`);
        }
    } // while loop end
}; // fight(); end

for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
        alert("Welcome to Robot Gladiators! Round " + (i + 1));
        var pickedEnemyName = enemyNames[i];
        enemyHealth = 50;
        debugger;
        fight(pickedEnemyName);
    }
    else {
        alert("You have lost your robot in battle! GAME OVER!");
        break;
    }
} // for loop end
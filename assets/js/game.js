
alert("Welcome to Robot Gladiators!");

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fightReward = 20;
var skipCost = 10;

var fight = function(enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {
        var promptFight = prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        switch (promptFight) {
            case 'fight' || 'FIGHT':
                // Subtracts 'playerAttack' from 'enemyHealth' and saves new value
                enemyHealth = enemyHealth - playerAttack;
                // Player -> Enemy damage results
                console.log(`Enemy ${enemyName} was attacked by player ${playerName} and lost ${playerAttack}HP!\n--- Enemy Stats ---\nName: ${enemyName}\nHealth: ${enemyHealth}HP\nAttack: ${enemyAttack}`);
                // check enemy's health
                if (enemyHealth <= 0) {
                    alert(`Enemy ${enemyName} has died!`);
                    playerMoney = playerMoney + fightReward;
                    break;
                }
                else {
                    alert(`Enemy ${enemyName} has ${enemyHealth}HP remaining.`);
                }

                // subtracts 'enemyAttack' from 'playerHealth' and saves new value
                playerHealth = playerHealth - enemyAttack;
                // Enemy -> Player damage results
                console.log(`Player ${playerName} was attacked by enemy ${enemyName} and lost ${enemyAttack}HP!\n--- Player Stats ---\nName: ${playerName}\nHealth: ${playerHealth}HP\nAttack: ${playerAttack}\nMoney: ${playerMoney} Gold`);
                // check player's health
                if (playerHealth <= 0) {
                    alert(`Player ${playerName} has died!`);
                    break;
                }
                else {
                    alert(`Player ${playerName} has ${playerHealth}HP remaining.`);
                }

                break;


            case 'skip' || 'SKIP':
                if (playerMoney >= skipCost) {
                    var confirmSkip = window.confirm(`Are you sure you'd like to quit?\nTHIS WILL COST ${skipCost} GOLD!`);
                    if (confirmSkip) {
                        playerMoney = playerMoney - skipCost;
                        var skippedBattle = `Player ${playerName} skipped the battle and lost ${enemyAttack} gold!\n--- Player Stats ---\nName: ${playerName}\nHealth: ${playerHealth}HP\nAttack: ${playerAttack}\nMoney: ${playerMoney} Gold`;
                        alert(skippedBattle);
                        console.log(skippedBattle);
                    }
                    else {
                        fight();
                    }
                }
                else {
                    alert('You do not have enough gold to skip the battle!')
                    fight();
                }
                break;
            default:
                alert(`'${promptFight}' is not a valid option, please try again!`);
                console.log(`User entered invalid option: '${promptFight}'`);
                break;
        }
    }

    
};

for (var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}
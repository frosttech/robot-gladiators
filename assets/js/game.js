
// PLAYER CONFIG
var playerName = window.prompt("What is your robot's name?");
var setPlayerHealth = 100;
var setPlayerAttack = 20;
var setPlayerMoney = 10;

// ENEMY CONFIG
var setEnemyHealthMax = 60;
var setEnemyHealthMin = 20;
var setEnemyAttackMax = 20;
var setEnemyAttackMin = 10;
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];

// BATTLE CONFIG
var setFightReward = 20;
var setSkipCost = 10;
var setDamageOffset = 3;

// SHOP CONFIG
var setRefillValue = 20;
var setRefillCost = 7;
var setUpgradeValue = 6;
var setUpgradeCost = 7;



var fight = function(enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {
        var promptFight = prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // CHECKING FOR SKIP
        if (promptFight.toLowerCase() == "skip") {
            if (playerMoney >= skipCost) {
                var confirmSkip = confirm(`Are you sure you'd like to quit?\nTHIS WILL COST ${skipCost} GOLD!`);
                if (confirmSkip) {
                    playerMoney = Math.max(0, playerMoney - skipCost);
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
        var damage = randomNumber(playerAttack, playerAttack - damageOffset);
        enemyHealth = Math.max(0, enemyHealth - damage);
        console.log(`Enemy ${enemyName} was attacked by player ${playerName} and lost ${damage}HP!\n--- Enemy Stats ---\nName: ${enemyName}\nHealth: ${enemyHealth}HP\nAttack: ${enemyAttack}`);
        if (enemyHealth <= 0) {
            alert(`Enemy ${enemyName} has died!`);
            playerMoney = playerMoney + fightReward;
            break;
        }
        else {
            alert(`Enemy ${enemyName} has ${enemyHealth}HP remaining.`);
        }

        // PLAYER DAMAGE
        var damage = randomNumber(enemyAttack, enemyAttack - damageOffset);
        playerHealth = Math.max(0, playerHealth - damage);
        console.log(`Player ${playerName} was attacked by enemy ${enemyName} and lost ${damage}HP!\n--- Player Stats ---\nName: ${playerName}\nHealth: ${playerHealth}HP\nAttack: ${playerAttack}\nMoney: ${playerMoney} Gold`);
        if (playerHealth <= 0) {
            alert(`Player ${playerName} has died!`);
            break;
        }
        else {
            alert(`Player ${playerName} has ${playerHealth}HP remaining.`);
        }
    } // while loop end
}; // fight(); end

var startGame = function() {
    // resets game config
    playerHealth = setPlayerHealth;
    playerAttack = setPlayerAttack;
    playerMoney = setPlayerMoney;
    // randomizes enemy health based on Min and Max variables
    enemyHealth = randomNumber(setEnemyHealthMax, setEnemyHealthMin);
    console.log(`- Enemy Health Range -\nMin: ${setEnemyHealthMin} | Max: ${setEnemyHealthMax}\nRandomized Value: ${enemyHealth}`);
    // randomizes enemy attack based on Min and Max variables
    enemyAttack = randomNumber(setEnemyAttackMax, setEnemyAttackMin);
    console.log(`- Enemy Attack Range -\nMin: ${setEnemyAttackMin} | Max: ${setEnemyAttackMax}\nRandomized Value: ${enemyAttack}`);
    fightReward = setFightReward;
    skipCost = setSkipCost;
    refillValue = setRefillValue;
    refillCost = setRefillCost;
    upgradeValue = setUpgradeValue;
    upgradeCost = setUpgradeCost;
    damageOffset = setDamageOffset;


    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            fight(pickedEnemyName);

            if (playerHealth > 0 && i < enemyNames.length - 1) {
                var storeConfirm = confirm("The fight is over, visit the store before the next round?");

                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            alert("You have lost your robot in battle! GAME OVER!");
            break;
        }
    } // for loop end
    endGame();
};

var endGame = function() {
    if (playerHealth > 0) {
        alert(`Great job, you've survived the game! You now have a score of ${playerMoney} Gold!`);
    }

    var playAgainConfirm = confirm("Would you like to play again?");
    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    var shopOptionPrompt = prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice");

    switch (shopOptionPrompt.toLowerCase()) {
        case "refill":
            if (playerMoney >= refillCost) {
                alert(`Refilling player's health by ${String(refillValue)} for ${String(refillCost)} Gold.`);
                // increase health and decrease gold
                playerHealth = playerHealth + refillValue;
                playerMoney = Math.max(0, playerMoney - refillCost);
            }
            else {
                alert("You don't have enough Gold!");
            }
            break;
        case "upgrade":
            if (playerMoney >= upgradeCost) {
                alert(`Upgrading player's attack by ${String(upgradeValue)} for ${String(upgradeCost)} Gold.`);
                // increase attack and decrease gold
                playerAttack = playerAttack + upgradeValue;
                playerMoney = Math.max(0, playerMoney - upgradeCost);
            }
            else {
                alert("You don't have enough Gold!");
            }
            break;
        case "leave":
            alert("Leaving the store.");
            break;
        default:
            alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

var randomNumber = function(max, min) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
};

startGame();

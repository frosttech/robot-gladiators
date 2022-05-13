
// PLAYER CONFIG
var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 20,
    money: 10
}

// ENEMY CONFIG
var enemyInfo = {
    config: {
        maxHealth: 60,
        minHealth: 20,
        maxAttack: 20,
        minAttack: 10
    },
    enemies: [
        {
            name: "Roborto",
            shield: {
                type: "wood",
                strength: 10
            }
        },
        {
            name: "Amy Android"
        },
        {
            name: "Robo Trumble"
        }
    ]
}

// BATTLE CONFIG
var battleInfo = {
    reward: 20,
    cost: 10,
    offset: 3
}

// SHOP CONFIG
var shopInfo = {
    refill: {
        cost: 7,
        value: 20
    },
    upgrade: {
        cost: 7,
        value: 6
    }
}



var fight = function(enemy) {
    while (enemy.health > 0 && playerHealth > 0) {
        var promptFight = prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // CHECKING FOR SKIP
        if (promptFight.toLowerCase() == "skip") {
            if (playerMoney >= skipCost) {
                var confirmSkip = confirm(`Are you sure you'd like to quit?\nTHIS WILL COST ${skipCost} GOLD!`);
                if (confirmSkip) {
                    playerMoney = Math.max(0, playerMoney - skipCost);
                    var skippedBattle = `Player ${playerInfo.name} skipped the battle and lost ${enemy.attack} gold!\n--- Player Stats ---\nName: ${playerInfo.name}\nHealth: ${playerHealth}HP\nAttack: ${playerAttack}\nMoney: ${playerMoney} Gold`;
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
        var preDamage = enemy.health;
        enemy.health = Math.max(0, enemy.health - damage);
        // console.log(`Enemy ${enemy.name} was attacked by player ${playerInfo.name} and lost ${damage}HP!\n--- Enemy Stats ---\nName: ${enemy.name}\nHealth: ${enemy.health}HP\nAttack: ${enemy.attack}`);
        console.log(`${enemy.name}\n HP: ${preDamage} -> ${enemy.health}\nDMG: ${damage}`);
        if (enemy.health <= 0) {
            alert(`Enemy ${enemy.name} has died!`);
            playerMoney = playerMoney + fightReward;
            break;
        }
        else {
            alert(`Enemy ${enemy.name} has ${enemy.health}HP remaining.`);
        }

        // PLAYER DAMAGE
        var damage = randomNumber(enemy.attack, enemy.attack - damageOffset);
        playerHealth = Math.max(0, playerHealth - damage);
        // console.log(`Player ${playerInfo.name} was attacked by enemy ${enemy.name} and lost ${damage}HP!\n--- Player Stats ---\nName: ${playerInfo.name}\nHealth: ${playerHealth}HP\nAttack: ${playerAttack}\nMoney: ${playerMoney} Gold`);
        console.log(`${playerInfo.name}\n HP: ${preDamage} -> ${playerHealth}\nDMG: ${damage}\nGLD: ${playerMoney}`);
        if (playerHealth <= 0) {
            alert(`Player ${playerInfo.name} has died!`);
            break;
        }
        else {
            alert(`Player ${playerInfo.name} has ${playerHealth}HP remaining.`);
        }
    } // while loop end
}; // fight(); end

var startGame = function() {
    // resets game config
    playerHealth = playerInfo.health;
    playerAttack = playerInfo.attack;
    playerMoney = playerInfo.money;


    /*
    // randomizes enemy health based on Min and Max variables
    enemyHealth = randomNumber(enemyInfo.config.maxHealth, enemyInfo.config.minHealth);
    console.log(`- Enemy Health Range -\nMin: ${enemyInfo.config.minHealth} | Max: ${enemyInfo.config.maxHealth}\nRandomized Value: ${enemyHealth}`);
    // randomizes enemy attack based on Min and Max variables
    enemyAttack = randomNumber(enemyInfo.config.maxAttack, enemyInfo.config.minAttack);
    console.log(`- Enemy Attack Range -\nMin: ${enemyInfo.config.minAttack} | Max: ${enemyInfo.config.maxAttack}\nRandomized Value: ${enemyAttack}`);
    */


    fightReward = battleInfo.reward;
    skipCost = battleInfo.cost;
    refillValue = shopInfo.refill.value;
    refillCost = shopInfo.refill.cost;
    upgradeValue = shopInfo.upgrade.value;
    upgradeCost = shopInfo.upgrade.cost;
    damageOffset = battleInfo.offset;


    for (var i = 0; i < enemyInfo.enemies.length; i++) {
        if (playerHealth > 0) {
            alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyObj = enemyInfo.enemies[i];
            // adds a random value for health to active enemy object (min/max determined by config)
            pickedEnemyObj.health = randomNumber(enemyInfo.config.maxHealth, enemyInfo.config.minHealth);
            // adds a random value for attack to active enemy object (min/max determined by config)
            pickedEnemyObj.attack = randomNumber(enemyInfo.config.maxAttack, enemyInfo.config.minAttack);
            fight(pickedEnemyObj);

            if (playerHealth > 0 && i < enemyInfo.enemies.length - 1) {
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

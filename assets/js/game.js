
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 10;
var enemyAttack = 12;

var fight = function() {
    window.alert("Welcome to Robot Gladiators!");

    //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
    enemyHealth = enemyHealth - playerAttack;

    // Log a resulting message to the console so we know that it worked.    
    console.log(`You attacked enemy ${enemyName}, they lost ${playerAttack}HP!\n--- Enemy Stats ---\nName: ${enemyName}\nHealth: ${enemyHealth}HP\nAttack: ${enemyAttack}`);

    // check enemy's health
    if (enemyHealth <= 0) {
        alert(`Enemy ${enemyName} has died!`);
    }
    else {
        alert(`Enemy ${enemyName} has ${enemyHealth}HP remaining.`);
    }

    // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
    playerHealth = playerHealth - enemyAttack;

    // Log a resulting message to the console so we know that it worked.
    console.log(`You were attacked by enemy ${enemyName} and lost ${enemyAttack}HP!\n--- Player Stats ---\nName: ${playerName}\nHealth: ${playerHealth}HP\nAttack: ${playerAttack}`);

    // check player's health
    if (playerHealth <= 0) {
        alert(`Player ${playerName} has died!`);
    }
    else {
        alert(`Player ${playerName} has ${playerHealth}HP remaining.`);
    }

};

fight();
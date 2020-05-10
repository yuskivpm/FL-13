function Fighter({ name, damage, hp, strength, agility }) {
  const MAX_PROBABILITY = 100;
  let health = hp;
  let wins = 0;
  let losses = 0;
  return {
    getName: () => name,
    getDamage: () => damage,
    getStrength: () => strength,
    getAgility: () => agility,
    getHealth: () => health,
    attack: defender => {
      if (Math.random() * MAX_PROBABILITY > defender.getStrength() + defender.getAgility()) {
        defender.dealDamage(damage);
        console.log(`${name} makes ${damage} damage to ${defender.getName()}`);
      } else {
        console.log(`${name} attack missed`);
      }
    },
    logCombatHistory: () => console.log(`Name: ${name}, Wins: ${wins}, Losses: ${losses}`),
    heal: healAmount => {
      health = Math.min(hp, health + healAmount);
    },
    dealDamage: damageAmount => {
      health = Math.max(0, health - damageAmount);
    },
    addWin: () => ++wins,
    addLoss: () => ++losses
  };
}

function battle(...fighters) {
  for (const fighter of fighters) {
    if (!fighter.getHealth()) {
      console.log(`${fighter.getName()} is dead and can't fight`);
      return;
    }
  }
  let currentFighter = 0;
  while (fighters[currentFighter].getHealth()) {
    fighters[currentFighter].attack(fighters[1 - currentFighter]);
    currentFighter = 1 - currentFighter;
  }
  fighters[currentFighter].addLoss();
  currentFighter = 1 - currentFighter;
  fighters[currentFighter].addWin();
  console.log(`${fighters[currentFighter].getName()} has won!`);
}

class Hero {
  constructor(level, positionX, positionY) {
    this.width = 10;
    this.height = 7;
    this.positionX = positionX;
    this.positionY = positionY;
    this.domElm = null;
    this.centeredDiv = null;
    this.level = level;

    this.centerdDivX = 4;
    this.centerdDivY = 4;
    this.centerdDivWidth = 10;
    this.centerdDivHeight = 10;

    this.createCenteredDiv();
    this.createDomElement();
  }

  createCenteredDiv() {
    this.centeredDiv = document.createElement("div");
    this.centeredDiv.innerHTML = "Pacman, go there to win !";
    //We give a css class to our div
    this.centeredDiv.setAttribute("class", "centered");
    this.centeredDiv.style.width = "10vw";
    this.centeredDiv.style.height = "10vh";
    this.centeredDiv.style.left = "4vw";
    this.centeredDiv.style.bottom = "4vh";

    //We add the newly created div element to board id.
    const board = document.getElementById("board");
    board.appendChild(this.centeredDiv);
  }

  createDomElement() {
    // step1: create the element
    this.domElm = document.createElement("div");

    // step2: add content or modify
    this.domElm.setAttribute("id", "Hero");
    this.domElm.style.width = this.width + "vw";
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.left = this.positionX + "vw";
    this.domElm.style.bottom = this.positionY + "vh";

    //step3: append to the dom: `parentElm.appendChild()`
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElm);

    //Create the image inside the div.
    this.createImage("bunswe-get-real.gif");
  }
  createImage(image) {
    let img = document.createElement("img");
    img.src = "./images/" + image;
    img.width = "60";
    img.height = "60";
    img.style.borderRadius = "100%";
    this.domElm.appendChild(img);
  }

  moveLeft() {
    if (this.positionX > 0) {
      this.positionX--;
      this.domElm.style.left = this.positionX + "vw";
      //image rotation left
      let heroImage = document.querySelector("#board img");
      heroImage.style.transform = "rotate(180deg)";
    }
  }
  moveRight() {
    if (this.positionX + this.width < 100) {
      this.positionX++;
      this.domElm.style.left = this.positionX + "vw";
      //image rotation right
      let heroImage = document.querySelector("#board img");
      heroImage.style.transform = "rotate(0deg)";
    }
  }
  moveUp() {
    if (this.positionY + this.height < 100) {
      this.positionY++;
      this.domElm.style.bottom = this.positionY + "vh";
      //image rotation up
      let heroImage = document.querySelector("#board img");
      heroImage.style.transform = "rotate(-90deg)";
    }
  }
  moveDown() {
    if (this.positionY > 0) {
      this.positionY--;
      this.domElm.style.bottom = this.positionY + "vh";
      //image rotation down
      let heroImage = document.querySelector("#board img");
      heroImage.style.transform = "rotate(90deg)";
    }
  }
}

class Monster {
  /* 
        - We want to modify the behavior of the constructor relatively to the level.
        For instance , at level 1 we need a random X and Y position , and not at level 2 
        where we want an initial fixed position.
        - Also we want differents starting X positions for the monsters at level 2 so 
        i put positionX on parameter's constructor.
    */
  constructor(level, posX, posY) {
    this.width = 10;
    this.height = 10;
    this.level = level;
    this.positionX = posX;
    this.positionY = posY;
    this.domElm = null;

    this.createDomElement();
    switch (level) {
      case "level1":
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100 - this.width)
        this.positionY = Math.floor(Math.random() * (100 - this.height + 1));
        break;
      case "level2":
        this.positionX = posX;
        this.positionY = posY;
        break;
    }
  }

  createDomElement() {
    // step1: create the element
    this.domElm = document.createElement("div");
    // step2: add content or modify
    this.domElm.setAttribute("class", "Monster");
    this.domElm.style.width = this.width + "vw";
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.left = this.positionX + "vw";
    this.domElm.style.bottom = this.positionY + "vh";

    const boardElm = document.getElementById("board");
    //step3: append to the dom: `parentElm.appendChild()`
    if (boardElm) {
      boardElm.appendChild(this.domElm);
      //Create the image inside the div.
      this.createImage("oacmn.gif");
    }
  }
  removeDomElement() {
    const monsterElt = document.querySelector(".Monster");
    if (monsterElt) {
      monsterElt.remove();
    }
  }
  createImage(image) {
    let img = document.createElement("img");
    img.src = "./images/" + image;
    img.width = "60";
    img.height = "60";
    this.domElm.appendChild(img);
  }

  moveDown() {
    if (this.positionY > 0) {
      this.positionY--;
      this.domElm.style.bottom = this.positionY + "vh";
    }
  }
  moveUp() {
    if (this.positionY + this.height < 100) {
      this.positionY++;
      this.domElm.style.bottom = this.positionY + "vh";
    }
  }
  moveLeft() {
    if (this.positionX > 0) {
      this.positionX--;
      this.domElm.style.left = this.positionX + "vw";
    }
  }
  moveRight() {
    if (this.positionX + this.width < 100) {
      this.positionX++;
      this.domElm.style.left = this.positionX + "vw";
    }
  }
  //used in the level 1
  generateRandomSquare() {
    //x random position in level 1
    //100 vh is the height of the screen, so we multiply it by random() between 0 and 1.
    this.domElm.style.left = Math.floor(Math.random() * 100) + "vw";
    this.domElm.style.bottom = Math.floor(Math.random() * 100) + "vh";
  }
}

//The start of my program:
const hero = new Hero("level1", 50, 10);
const monstersLvl1 = []; // will store instances of the class Monster for lvl1
const monsters = [];
let pathIdInterval;
const frequencyMonsterGeneration = 3000; //time in milliseconds

// add event keyboard listener
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    hero.moveLeft();
  } else if (e.code === "ArrowRight") {
    hero.moveRight();
  } else if (e.code === "ArrowUp") {
    hero.moveUp();
  } else if (e.code === "ArrowDown") {
    hero.moveDown();
  }
});

/***************************************************************************************
 *  Function declarations
 ***************************************************************************************/
function collisionMonsterHero(hero, monsterInstance) {
  //added hero now...
  if (
    hero.positionX < monsterInstance.positionX + monsterInstance.width && //smaller than monster vertical right side
    hero.positionX + hero.width > monsterInstance.positionX && //bigger than monster vertical left side
    hero.positionY < monsterInstance.positionY + monsterInstance.height && //smaller than monster top side
    hero.positionY + hero.height > monsterInstance.positionY //bigger than monster bottom side
  ) {
    location.href = "gameover.html";
  }
}

//The win function detects a collision between the hero and the centered green div.
function win(hero) { 
    if (hero.positionX < hero.centerdDivX + hero.centerdDivWidth && 
      hero.positionX + hero.width > hero.centerdDivX &&
      hero.positionY < hero.centerdDivY + hero.centerdDivHeight && 
      hero.positionY + hero.height > hero.centerdDivY) {
      console.log("You won!");
      return true;
  }
  return false
  
}

function nextLevel(hero) {
  switch (hero.level) {
    case "level1":
      level1(hero);
      break;
    case "level2":
      level2(hero);
      break;
  }
}

function level1() {
  return new Promise((resolve, reject) => {
    const level = document.getElementById("level");
    level.innerHTML = "Level 1 : Monsters appearing randomly and regularly";

    // generate monsters
    const intervalId_generate = setInterval(() => {
      const newMonster = new Monster();
      monsters.push(newMonster);
      newMonster.generateRandomSquare();
    }, 3000);

    // move monsters & detect collision
    const intervalId_move_detect = setInterval(() => {
      monsters.forEach((monsterInstance) => {
        //Detect if there's a collision between the current Monster and the Hero
        collisionMonsterHero(hero, monsterInstance);
        //Detect collision between the hero and the centered green div.
        let isWin = win(hero);
        if (isWin === true) {
          clearMonsters(); //delete the monsters if it's won.
          //make the hidden level2 link appear
          setVisibleLevel2();
          clearInterval(intervalId_generate);
          clearInterval(intervalId_move_detect);
        }
      });
    }, 1000);

    resolve("End of level 1");
  });
}

function clearMonsters() {
  monsters.forEach((a_monster) => {
    a_monster.removeDomElement();
  });
}

function setVisibleLevel2() {
  //make the div visible
  let level2Div = document.getElementById("level2");
  if (level2Div) {
    level2Div.style.display = "block";
    level2Div.style.alignContent = "center";
    level2Div.style.visibility = "visible";
    //recenter the styles
    level2Div.style.display = "flex";
    level2Div.style.justifyContent = "center";
    level2Div.style.alignItems = "center";
  } else {
    console.log("level2 element doesnt exists. ");
  }

  let link = document.querySelector("#level2 a");
  link.style.textDecoration = "none"; // Remove the link style
  link.style.color = "orange";
}

// start by defining this moveDirection as right and then change it on every collision
//with the borders or with the maxTop parameter
function path(x_monster, moveDirection, maxTop) {
  let monster = new Monster(level2, x_monster, 50);
  let speed = 200; //Speed in ms

  pathIdInterval = setInterval(() => {
    if (moveDirection === "right") {
      monster.moveRight();
      if (monster.positionX === 90) {
        moveDirection = "down";
      }
    } else if (moveDirection === "down") {
      monster.moveDown();
      if (monster.positionY === 0) {
        moveDirection = "left";
      }
    } else if (moveDirection === "left") {
      monster.moveLeft();
      if (monster.positionX === 0) {
        moveDirection = "up";
      }
    } else if (moveDirection === "up") {
      monster.moveUp();
      if (monster.positionY === maxTop) {
        moveDirection = "right";
      }
    }
  }, speed);
  return monster;
}

function level2() {
  //Make sure that all the precedents listeners are stopped before starting the level2 execution.
  //clearInterval(intervalId_generate)
  //clearInterval(intervalId_move_detect)

  //Set the html h1 title
  const level = document.getElementById("level");
  level.innerHTML = "Level 2 : Four moving monsters , no walls";

  let monster1 = path(80, "right", 65); //x coordinate: 80 = 80% of the size screen
  let monster2 = path(40, "down", 80); //80 is the max top before changing direction
  let monster3 = path(20, "up", 70);
  let monster4 = path(15, "right", 40);

  monsters.push(monster1);
  monsters.push(monster2);
  monsters.push(monster3);
  monsters.push(monster4);

  // Every six seconds i am testing if there is a collision between my hero and any of the 4 monsters.
  // If there is a collision, i loose the game.
  setInterval(() => {
    collisionMonsterHero(hero, monster1);
    collisionMonsterHero(hero, monster2);
    collisionMonsterHero(hero, monster3);
    collisionMonsterHero(hero, monster4);

    //The win condition
    let isWin = win(hero);
    if (isWin === true) {
      setVisibleLevel2();
      // clearInterval(intervalId_generate)
      clearInterval(pathIdInterval);
      clearMonsters();
    }
  }, 1000);
}
//The call of my functions
level1()
  .then((result) => {
    //console.log(result);
    level2();
  })
  .catch((error) => {
    console.log(error);
  });

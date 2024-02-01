class Hero {
    constructor(level,positionX,positionY){
        this.width = 10;
        this.height = 10;
        this.positionX = positionX;
        this.positionY = positionY;
        this.domElm = null;
        this.centeredDiv = null;
        this.level = level

        this.createCenteredDiv();

        this.createDomElement();
    }

    createCenteredDiv(){
        this.centeredDiv = document.createElement("div")
        this.centeredDiv.innerHTML = 'Go there to win'
        //We give a css class to our div
        this.centeredDiv.setAttribute('class','centered')
        this.centeredDiv.style.width = this.width+ "vw"
        this.centeredDiv.style.height = this.height+ "vh"
        this.centeredDiv.style.left = this.positionX+ "vw"
        this.centeredDiv.style.bottom = this.positionY+ "vh"
        
        this.centeredDiv.width = this.width
        this.centeredDiv.height = this.height
        this.centeredDiv.left = 50
        this.centeredDiv.bottom = 50
        
        //We add the newly created div element to board id.
        const board = document.getElementById('board')
        //console.log(board)
        board.appendChild(this.centeredDiv)
       
    }

    createDomElement(){
        // step1: create the element
        this.domElm = document.createElement("div");

        // step2: add content or modify
        this.domElm.setAttribute("id", "Hero");
        this.domElm.style.width = this.width + "vw"
        this.domElm.style.height = this.height + "vh"
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";
  
        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);

         //Create the image inside the div.
         this.createImage('bunswe-get-real.gif')
    }
    createImage(image){
        let img = document.createElement("img");
         img.src = './images/'+image
         img.width = '60';
         img.height = '60';
         this.domElm.appendChild(img)
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
    moveUp(){
        if(this.positionY + this.height < 100){
            this.positionY++;
            this.domElm.style.bottom = this.positionY + "vh";
        }
    }
    moveDown(){
        if(this.positionY > 0){
            this.positionY--;
            this.domElm.style.bottom = this.positionY + "vh";
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
    constructor(level,posX,posY){
        this.width = 10;
        this.height = 10;
        this.level = level; 
        this.positionX = posX
        this.positionY = posY;
        this.domElm = null;

        this.createDomElement();
         switch (level){
            case 'level1':
                this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100 - this.width)
                this.positionY = Math.floor(Math.random() * (100 - this.height + 1));
              //  this.domElm.style.left = Math.random()*100 + "vw";
              //  this.domElm.style.bottom = Math.random()*100+ "vh"; 
                break;
            case 'level2':
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
        this.domElm.style.width = this.width + "vw"
        this.domElm.style.height = this.height + "vh"
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);

         //Create the image inside the div.
         this.createImage('oacmn.gif')
    }
    createImage(image){
        let img = document.createElement("img");
         img.src = './images/'+image
         img.width = '60';
         img.height = '60';
         this.domElm.appendChild(img)
    }
    
    moveDown(){
        if(this.positionY > 0){
            this.positionY--;
            this.domElm.style.bottom = this.positionY + "vh";
        }
    }
    moveUp(){
        if(this.positionY + this.height < 100){
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
    generateRandomSquare(){
        //x random position in level 1 
        //100 vh is the height of the screen, so we multiply it by random() between 0 and 1.
        this.domElm.style.left = Math.random()*100 + "vw";
        this.domElm.style.bottom = Math.random()*100+ "vh"; 
    }
}

//The start of my program:
const hero = new Hero('level1',50,10);
//console.log('hero: ',hero)
const monstersLvl1 = []; // will store instances of the class Monster for lvl1
const monsters = []
let pathIdInterval
//const levels = ["level1","level2","level3","level4"]; // will store the levels of the game.
const frequencyMonsterGeneration = 3000 //time in milliseconds 
//let lev1 = true
//let lev2 = false



// add event listeners
document.addEventListener("keydown", (e) => {
    if (e.code === 'ArrowLeft') {
        hero.moveLeft();
    } else if (e.code === 'ArrowRight') {
        hero.moveRight();
    } else if(e.code === 'ArrowUp'){
        hero.moveUp();
    } else if(e.code === 'ArrowDown'){
        hero.moveDown();
    }
});
/***************************************************************************************
 *  Function declarations
 ***************************************************************************************/
function collisionMonsterHero(hero , monsterInstance){
    let condition1 = hero.positionX < monsterInstance.positionX + monsterInstance.width
    let condition2 = hero.positionX + hero.width > monsterInstance.positionX
    let condition3 = hero.positionY < monsterInstance.positionY + monsterInstance.height
    let condition4 = hero.positionY + hero.height > monsterInstance.positionY

    let cond1Left = monsterInstance.positionX + monsterInstance.width

    //console.log('cond1 ',condition1, ' cond2 ',condition2,' cond3 ',condition3,' cond4 ',condition4)

    // 2. detect if there's a collision between the current Monster and the Hero
    if (condition1 && condition2 && condition3 && condition4) {
        console.log("game over");
        location.href = "gameover.html";
    }
}

//The win function detects a collision between the hero and the centered green div.
function win(hero) {
    let centeredDiv = hero.centeredDiv //html element
    let x_goal_position = centeredDiv.left;
    let y_goal_position = centeredDiv.bottom;

    let condition1 = hero.positionX < x_goal_position + centeredDiv.width
    let condition2 = hero.positionX + hero.width > x_goal_position
    let condition3 = hero.positionY < y_goal_position + centeredDiv.height
    let condition4 = hero.positionY + hero.height > y_goal_position

    if (hero.positionX < x_goal_position + centeredDiv.width && hero.positionX + hero.width > x_goal_position &&
        hero.positionY < y_goal_position + centeredDiv.height && hero.positionY + hero.height > y_goal_position) {
        console.log("You won!");
        hero.level = 'level2'
        return true;
    }
    return false
}

function nextLevel(hero) {
    console.log('hero.level just before the switch: ', hero.level)
    switch (hero.level) {
        case 'level1':
            console.log("starting level 1...");
            level1(hero);
            break;
        case 'level2':
            console.log("starting level 2...");
          level2(hero);
          break;
      }
}

function level1() {
    const level = document.getElementById('level')
    level.innerHTML = 'Level 1 : Monsters appearing randomly and regularly'

    // generate monsters 
    const intervalId_generate = setInterval(() => {
        const newMonster = new Monster();
        monsters.push(newMonster);
    }, 3000);

    // move monsters & detect collision
    const intervalId_move_detect = setInterval(() => {
        monsters.forEach((monsterInstance) => {
            monsterInstance.generateRandomSquare()
            //Detect if there's a collision between the current Monster and the Hero
            collisionMonsterHero(hero, monsterInstance)
            //Detect collision between the hero and the centered green div.
            //if win() return true , i clearInterval....(TO DO)
            let isWin = win(hero, this.centeredDiv)
            if (isWin === true) {
                console.log("Level 1 is won here")
                clearInterval(intervalId_generate)
                clearInterval(intervalId_move_detect)
            }

        });
    }, 2000);
}


// start by defining this moveDirection as right and then change it on every collision 
//with the borders or with the maxTop parameter
function path(x_monster,moveDirection,maxTop){
     
    let monster = new Monster(level2,x_monster,50)
    let speed = 200 //Speed in ms
    
    pathIdInterval = setInterval(() => {
        if (moveDirection === 'right') {
            monster.moveRight();
            if (monster.positionX === 90) {
                moveDirection = 'down';
            }
        } else if (moveDirection === 'down') {
            monster.moveDown();
            if (monster.positionY === 0) {
                moveDirection = 'left';
            }
        } else if (moveDirection === 'left') {
            monster.moveLeft();
            if (monster.positionX === 0) {
                moveDirection = 'up';
            }
        } else if (moveDirection === 'up') {
            monster.moveUp();
            if (monster.positionY === maxTop) {
                moveDirection = 'right';
            }
        }
    }, speed);
    return monster
}



function level2() {
     //Set the html h1 title
     const level = document.getElementById('level')
     level.innerHTML = 'Level 2 : Four moving monsters , no walls'
 
    // let monster1 = new Monster(1,65,this.positionY)
    // let monster2 = new Monster(1,80,this.positionY)
    // let monster3 = new Monster(1,65,this.positionY)
 
     let monster1 = path(80,'right',65);//x coordinate: 65 = 65% of the size screen
     let monster2 = path(40,'down',80)//80 is the max top
     let monster3 = path(20,'up',70)
     let monster4 = path(15,'right',40)
 
     monsters.push(monster1)
     monsters.push(monster2)
     monsters.push(monster3)
     monsters.push(monster4)
 
     console.log('My monsters in level 2 ',monsters)
 
     //The win condition
     let isWin = win(hero)
     if (isWin === true) {
        console.log("Level 2 is won here")
        clearInterval(intervalId_generate)
       // clearInterval(intervalId_move_detect)
        clearInterval( pathIdInterval)
    }
     
}
//The call of my functions
//level1()
level2()
//nextLevel(hero)







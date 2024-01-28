class Hero {
    constructor(){
        this.width = 10;
        this.height = 10;
        this.positionX = 50;
        this.positionY = 0;
        this.domElm = null;

        this.createDomElement();
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
    constructor(){
        this.width = 10;
        this.height = 10;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100 - this.width)
        this.positionY = 100;
        this.domElm = null;

        this.createDomElement();
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
    }
    moveDown(){
        this.positionY--;
        this.domElm.style.bottom = this.positionY + "vh"; 
    }
    generateRandomSquare(){
        this.positionY = Math.random()*100;
        //100 vh is the height of the screen, so we multiply it by random() between 0 and 1.
        this.domElm.style.bottom = Math.random()*100+ "vh"; 
    }
}


const hero = new Hero();
const monsters = []; // will store instances of the class Monster
const levels = ["level1","level2","level3","level4"]; // will store the levels of the game.
const speedMonsterGeneration = 3000 //time in milliseconds 

// generate monsters 
setInterval(() => {
    const newMonster = new Monster();
    monsters.push(newMonster);
}, speedMonsterGeneration);

function createCenteredDiv(){
    const centeredDiv = document.createElement("div")
    centeredDiv.innerHTML = 'Go there to win'
    //We give a css class to our div
    centeredDiv.setAttribute('class','centered')

    //We add the newly created div element to board id.
    const board = document.getElementById('board')
    console.log(board)
    board.appendChild(centeredDiv)
}

function chooseLevel(myChoosenLevel){
    levels.forEach((level)=>{
        level === myChoosenLevel; //we want to execute the level defined in parameter's method.
        switch(level){
           case "level1":level1(monsters,undefined);break;
            //case "level2":level2();break;
            //case "level3":level3();break;
       }
    })
}



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


function level1(){
    // move monsters & detect collision
setInterval(() => {
    monsters.forEach((monsterInstance) => {
 
        // 1. move current Monster
       // monsterInstance.moveDown();
        monsterInstance.generateRandomSquare()
       // level1(monsters)
      
        
        // 2. detect if there's a collision between the current Monster and the Hero
        if (hero.positionX < monsterInstance.positionX + monsterInstance.width &&
            hero.positionX + hero.width > monsterInstance.positionX &&
            hero.positionY < monsterInstance.positionY + monsterInstance.height &&
            hero.positionY + hero.height > monsterInstance.positionY) {
            console.log("game over");
            location.href = "gameover.html";
        }

    });
}, 2000);
}
//The call of my functions
createCenteredDiv()
chooseLevel("level1")




//Sprite Variables
var monkey, ground, rock, banana, score, back, gamestate, PLAY, END, textend, deadcount;

//Group variable
var bananagroup, stonegroup;

// variables for loading images
var monkeyimg, rockimg, bananaimg, backimg;

function preload() {
  //loading animation of monkey
  monkeyimg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",
    "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  //loading images of ground,rock,banana and background
  rockimg = loadImage("stone.png");
  bananaimg = loadImage("banana.png");
  backimg = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600, 300);

  //background
  back = createSprite(300, 90);
  back.addImage("Lable2", backimg);
  back.scale = 1.2;
  back.velocityX = -5;

  //gamestate
  PLAY = 1;
  END = 0;
  gamestate = PLAY;
  //monkey
  monkey = createSprite(60, 230);
  monkey.addAnimation("Lable1", monkeyimg);
  monkey.scale = 0.2;

  //ground
  ground = createSprite(300, 295, 600, 10);
  ground.visible = false;

  //stone and banana groups
  stonegroup = createGroup();
  bananagroup = createGroup();

  //scoring
  score = 0;

  //counting the number of time monkey is touching obstacle
  deadcount = 0;
}


function draw() {
  background(255);
  textSize(20);
  fill("black");
  monkey.collide(ground);
  if (gamestate === PLAY) {
    //repeating ground
    if (back.x <= 0) {
      back.x = 300;
    }

    //Monkey jump with gravity
    if (keyDown("Space")) {
      monkey.velocityY = -18;
    }
    monkey.velocityY = monkey.velocityY + 1;
    //stone creating function
    stonecreator();
    //banana creating function
    bananacreator();

    console.log(deadcount);
    if (bananagroup.isTouching(monkey)) {
      bananagroup.destroyEach();
      score = score + 1;
    }
    if (stonegroup.isTouching(monkey)) {
      monkey.scale = monkey.scale - 0.1;
      stonegroup.destroyEach();
      deadcount = deadcount + 1;
    }
    if (deadcount === 2) {
      gamestate = END;
    }
    switch (score) {
      case 10: monkey.scale = 0.23;
        break;
      case 20: monkey.scale = 0.25;
        break;
      case 30: monkey.scale = 0.27;
        break;
      case 40: monkey.scale = 0.29;
        break;
      case 50: monkey.scale = 0.3;
        break;
      default: break;
    }
  }
  drawSprites();
  if (gamestate === END) {
    back.velocityX = 0;
    stonegroup.setVelocityXEach(0);
    bananagroup.setVelocityXEach(0);
    stonegroup.setLifetimeEach(-1);
    bananagroup.setLifetimeEach(-1);
    text("Press R to restart", 200, 200);
    if (keyDown("r")) {
      gamestate = PLAY;
      monkey.y = 230;
      back.velocityX = -5;
      stonegroup.destroyEach();
      bananagroup.destroyEach();
      score = 0;
      deadcount = 0;
      monkey.scale = 0.2;
    }
  }
  //displaying score
  textSize(24);
  text("Score - " + score, 450, 25);
}

function stonecreator() {
  if (World.frameCount % 150 === 0) {
    stone = createSprite(600, 260);
    stone.addImage("Lable4", rockimg);
    stone.scale = 0.15;
    stone.velocityX = -8;
    stone.lifeTime = 58;
    stonegroup.add(stone);
  }
}
function bananacreator() {
  if (World.frameCount % 70 === 0) {
    banana = createSprite(600, 100);
    banana.addImage("Lable5", bananaimg);
    banana.velocityX = -8;
    banana.scale = 0.05;
    bananagroup.add(banana);
  }
}
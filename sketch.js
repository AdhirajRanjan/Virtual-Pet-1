//Create variables here
var dog, dogimg, happyDog,happyDogimg, database, foodS, foodStock;

function preload()
{
  //load images here
  dogimg = loadImage("Dog.png")
  happyDogimg = loadImage("happydog.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database()
  dog = createSprite(250,200,50,50)
  dog.addImage("happy",dogimg)
  dog.addImage("happ", happyDogimg)
  dog.scale = 0.4

  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  
}


function draw() { 
  background(46,139,87)
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS)
    dog.changeImage("happ", happyDogimg)

  } 

  drawSprites();
  //add styles here
  textSize(15)
  fill("blue")
  stroke("red")
  text("Food Remaining: "+foodS,200,250)

}

function readStock(data)
{
  foodS=data.val()
}

function writeStock(x)
{

  if(x<=0)
  {
    x=0
  }
  else
  {
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}




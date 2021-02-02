var dog,dogImg,dogImg1;
var database;
var food,foodStock;

function preload()
{
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database;
  createCanvas(800, 700);
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.50;

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  textSize(22);
}


function draw() {  
  if(keyDown("up")){
    writeStock(food);
    dog.addImage(dogImg1);
  }
  drawSprites();
  //add styles here
  fill (255,255,254);
  stroke ("black");
  text("food remaining"+food,170,200);
  textSize(13);
  text("Note: press Up arrow key to feed the dog",130,10,300,20);

}

function readStock(data){
  food=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}
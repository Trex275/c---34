var ball;
var database, position;

function setup(){
    createCanvas(500,500);

    database = firebase.database();
    console.log(database);
    ball = createSprite(100,100,10,10);
    ball.shapeColor = "red";

    var positionref = database.ref('ball/position');
    positionref.on("value", readposition);
}

function readposition(data){
    position = data.val();
    console.log(position);
    ball.x = position.x;
    ball.y = position.y;
}

function changePosition(x,y){
    var positionref = database.ref('ball/position');
    positionref.update({
        x: position.x + x,
        y: position.y + y
    });
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }

    drawSprites();
}

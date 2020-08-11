var Canvas = document.getElementById('Rain');
var c = Canvas.getContext("2d");
var drops = 245;
var ParticlesArr = [];
var w,h;
w = Canvas.width = window.innerWidth;
h = Canvas.height = window.innerHeight;

function Random (min,max){
    return  min + Math.random() * (max-min + 1);
};
function resizeWindow(){
    w = Canvas.width = window.innerWidth;
    h = Canvas.height =  window.innerHeight;
}
window.addEventListener('resize',resizeWindow);

function Drop(){
    for(i=0;i<drops;i++){
        ParticlesArr.push({
            x: Math.random() + w,
            y: Math.random() + h,
            opacity: Math.random(),
            speedX: Random(-11,11),
            speedY: Random(7,15),
            radius: Random(0.5,4.2)
        })
    }
};
function DrawDrops(){
    for(var i=0; i<ParticlesArr.length; i++){
        var Gradi = c.createRadialGradient(
            ParticlesArr[i].x,
            ParticlesArr[i].y,
            0,
            ParticlesArr[i].x,
            ParticlesArr[i].y,
            ParticlesArr[i].radius
        );

        Gradi.addColorStop(0,"rgba(255,255,255," + ParticlesArr[i].opacity + ")" );
        Gradi.addColorStop(0,"rgba(210,236,242," + ParticlesArr[i].opacity + ")" );
        Gradi.addColorStop(0,"rgba(237,247,249," + ParticlesArr[i].opacity + ")" );

        c.beginPath();
        c.arc(
            ParticlesArr[i].x,
            ParticlesArr[i].y,
            ParticlesArr[i].radius,
            0,
            Math.PI * 2,
            false  
        );
        c.fillStyle = Gradi;
        c.fill();
    }
};
function DropFalling(){
    for(var i = 0;i< ParticlesArr.length;++i){
        ParticlesArr[i].x += ParticlesArr[i].speedX;
        ParticlesArr[i].y += ParticlesArr[i].speedY;

        if(ParticlesArr[i].y > h){
            ParticlesArr[i].x = Math.random() * w * 1.5;
            ParticlesArr[i].y = -50;
        }

    }
};

function upDateDrops(){
    c.clearRect(0,0,w,h);
    DrawDrops();
    DropFalling();
};

setInterval(upDateDrops, 50);
Drop();

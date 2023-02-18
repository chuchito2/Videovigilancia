var objects = [];
var estatus = "";

function preload()
{
video = createVideo("video.mp4");
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function modelLoaded()
{
    console.log("modelo cargado");
    estatus = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function play()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("estado").innerHTML = "estado: detectando objetos"
}

function gotResult(error, results)
{
if(error)
{
    console.log(error);
}
console.log(results);
objects = results;
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(estatus != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("estado").innerHTML = "Estado: objeto detectado"
            document.getElementById("objetos").innerHTML = "Número de objetos detectados: " + objects.length;
            fill("#FF0000")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreleftWrist = 0;
scorerightWrist = 0;

function setup()
{
    canvas = createCanvas(500 ,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video ,modelLoaded);
    poseNet.on('pose', gotPoses);
    
}
function modelLoaded()    {
    console.log("Pose Loaded");
}
function play(){

    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}

function draw() {
   image( video , 0, 0, 600, 500);
   song1Status = song1.isPlaying();
   song2Status = song2.isPlaying();
    if (scorerightWrist > 0.2)
    {
  
        fill("#ff0000");
        stroke("#ff0000");

        circle(rightWristX ,rightWristY ,20);

        if(song1Status == false )
        {
            song2.stop();
            song1.play();
            document.getElementById("songName").innerHTML = "Song Name : On My Way";
            
        }
    }
    if (scoreleftWrist > 0.2)
    {
        fill("#ff0000");
        stroke("#ff0000");

        circle(leftWristX ,leftWristY ,20);
    
        if(song2Status == false )
        {
            song1.stop();
            song2.play();
            document.getElementById("songName").innerHTML = "Song Name : ALONE II";
        }
    }
}
function preload() 
{
    song1 = loadSound("on-my-way.mp3");
    song2 = loadSound("Alan-Walker-Ava-Max-Alone-Pt-II.mp3");
}
function gotPoses(results)
{
    if(results.lenght > 0)
    {
        console.log(results);

        leftWristX = results[0].poseNet.leftWrist.x;
        leftWristY = results[0].poseNet.leftWrist.y;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("Score = " + scoreleftWrist);
        console.log("leftWristx ="+leftWristX+"leftWristY ="+leftWristY);

        rightWristX = results[0].poseNet.righttWrist.x;
        rightWristY = results[0].poseNet.rightWrist.y;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("rightWristX ="+rightWristX+"rightWristY ="+rightWristY);
    }
}
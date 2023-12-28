prediction= "";
Webcam.set({
    height:300,
    width:350,
    Image_format:'png',
    png_quality:95,
});
camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML ='<img id="captured_gesture" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/hqudlsUVc/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}
function speak(){
    var synth =window.speechSynthesis;
    var speak_data="Theprediction is" + prediction;
    var utterThis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check()
{
    img = document.getElementById('captured_gesture');
    classifier.classify(img , gotResult);
}
function gotResult(error, results){
    if(error) 
    {
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction= results[0].label;
        speak();
        if (results[0].label =="Amazing")
        {
            document.getElementById("result_emoji").innerHTML= "&#128076;";
        }
        else if(results[0].label =="Best")
        {
            document.getElementById("result_emoji").innerHTML= "&#128077;";
        }
        else(results[0].label =="Victory")
        {
            document.getElementById("result_emoji").innerHTML= "&#9996;";
        }
        
    }
}


var elem = document.getElementById('display');
var musicNode = document.createElement('audio');

function TimeData(){
    this.pauseBool = true;
    this.timer;
    this.startBool = true;
    this.porotime = 1499;
    this.coolTime = 299;
    this.coolBool = false;
}
var time = new TimeData();

function podomoro(){
    if(time.porotime < 1){
        var select = document.getElementById('timesel');
        time.porotime = time.coolTime;
        clearTimeout(time.timer);
        playSound();
        time.coolBool = true;
        coolDown()
    }else{
        time.porotime--;
        time.timer = setTimeout(podomoro, 1000, time.porotime);
        var sec = time.porotime % 60;
        var min = Math.floor(time.porotime / 60);
        elem.innerHTML = min+" :  "+sec;
    }
}

function coolDown(){
    if(time.porotime < 1){
        clearTimeout(time.timer);
        time.porotime = select.value;
        time.coolBool = false;
        podomoro();
    }
    else{
        time.porotime--;
        time.timer = setTimeout(coolDown, 1000, time.porotime);
        var sec = time.porotime % 60;
        var min = Math.floor(time.porotime / 60);
        elem.innerHTML = min+" :  "+sec;        
    }
}



var mog = document.getElementById("start");
mog.addEventListener('click', function(){

    if(time.startBool){
        podomoro();
        time.startBool = false;
    }
    else{
        if(time.pauseBool){
            clearTimeout(time.timer);
            time.pauseBool = false;
        }
        else{
            if(time.coolBool){
                coolDown();
                time.pauseBool = true;
            }
            else{
               podomoro();
                time.pauseBool = true; 
            }
            
        }
    }
});

var select = document.getElementById('timesel');
select.addEventListener('change', function(){
    time.porotime = this.value;
});


var finalFantasy = null;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

function loadMusic(){
    var request = new XMLHttpRequest();
    request.open('GET', "https://s3-us-west-2.amazonaws.com/sojuheroku/FF.mp3", true);
    request.responseType = 'arraybuffer';

    request.onload = function(){
        context.decodeAudioData(request.response, function(buffer){
            finalFantasy = buffer;
            //playSound();
        }, function(error){
            console.error("decodeAudioData error", error);
        });
    }
    request.send();
}

loadMusic();

function playSound(){
    var source = context.createBufferSource();
    source.buffer = finalFantasy;
    source.connect(context.destination);
    source.start(0);
}
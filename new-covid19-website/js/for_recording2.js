"use strict";

let audio_cough = null;
let audio_count = null;
let audio_aaa = null;
let audio_eee = null;
let audio_ooo = null;
let audio_az = null;

//var formData = new FormData($('form')[0]);

$(function(){

window.AudioContext = window.AudioContext || window.webkitAudioContext;
window.URL = window.URL || window.webkitURL;
navigator.getUserMedia =
    navigator.getUserMedia
     || navigator.webkitGetUserMedia
     || navigator.mozGetUserMedia
     || navigator.msGetUserMedia
     || navigator.mediaDevices.getUserMedia;
navigator.cancelAnimationFrame =
    navigator.cancelAnimationFrame
     || navigator.webkitCancelAnimationFrame
     || navigator.mozCancelAnimationFrame;
navigator.requestAnimationFrame =
     navigator.requestAnimationFrame
     || navigator.webkitRequestAnimationFrame
     || navigator.mozRequestAnimationFrame;


let createRecorder = function(div, callback){
    let recording = false;
    let rec = null;
    let ctx = null;
    let stream = null;
    let btn = div.find('button');
    let audio = div.find('audio');
    let audioInd = div.find('.audio-playback')
    let ind = div.find('.recording-indicator');

    let startRecording = function(){
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia(
            {
              "audio": true
            }).then(streamSuccess).catch(streamFail);
        }else{
            navigator.getUserMedia(
            {
              "audio": true
            }, streamSuccess, streamFail);
        }
    };
    let streamSuccess = function(theStream){
        stream = theStream;
        recording=true;
        ctx = new AudioContext();
        let src = ctx.createMediaStreamSource(stream);
        rec = new Recorder( src , {numChannels:1});
        rec.clear();
        rec.record();
        btn.addClass('recording');
        btn.prop("disabled",false);
        btn[0].innerText = "Stop Recording";
        ind.show();
        recording=true;
        audioInd.hide();
    };

    let streamFail = function(e){
        alert('Error occured while trying to record audio, please check if mic is connected and enabled.');
        btn.prop("disabled", false);
    };

    let stopRecording = function(){
        rec.stop();
        stream.getTracks().forEach(function(track){
            track.stop()
        });
        ctx.close();
        ctx = null;
        rec.exportWAV(streamDone);
    };

    let streamDone = function(blob){
        const audioUrl = URL.createObjectURL(blob);
        audioInd.show();
        audio.get(0).src = audioUrl;
        audio.get(0).load();
        callback(blob);
        btn.removeClass('recording');
        btn.prop("disabled",false);
        btn[0].innerHTML = '<i class="fas fa-microphone"> Record</i>';
        ind.hide();
        recording=false;
    };

    let toggleRecording=function(){
        btn.prop("disabled",true);
        if(recording){
            stopRecording();
        }else{
            startRecording();
        }
    };
    btn.click(toggleRecording);
};

createRecorder(
    $('#coughRecordControl'),
    function(blob){
        audio_cough=blob;
        console.log(audio_cough);
    }
);

createRecorder(
    $('#aaaRecordControl'),
    function(blob){
        audio_aaa=blob;
    }
);

createRecorder(
    $('#eeeRecordControl'),
    function(blob){
        audio_eee=blob;
    }
);

createRecorder(
    $('#oooRecordControl'),
    function(blob){
        audio_ooo=blob;
    }
);

createRecorder(
    $('#countRecordControl'),
    function(blob){
        audio_count=blob;
    }
);

createRecorder(
    $('#alphabetRecordControl'),
    function(blob){
        audio_az=blob;
    }
);

 });

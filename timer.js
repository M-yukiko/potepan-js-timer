//HTMLと紐付け
let start = document.getElementById('start');
let stop =  document.getElementById('stop');
let reset = document.getElementById('reset');
let timeDisplay = document.getElementById('display');

let startTime; //開始時刻
let stopTime; //終了時刻
let addTime;
let diff; //開始とストップ時の時間差分


//時間単位
let millisec;
let sec_100;
let sec;
let min;  //分
let hour; //時
let t_zone = new Date().getTimezoneOffset() / 60; //世界協定差分

//ステータス管理
let status;//start:1 stop:0
let timerId;
window.addEventListener("load",function() {
  resetBtn();
});

//スタート押した時////////////////////////////////////////////////////////
function startBtn(){
  status = 1; //動かす
  timerId = setTimeout(runTimer, 10); //計測開始
  
//ボタン処理    
  start.disabled = "true";
  stop.disabled = "";
  reset.disabled = "true";
  
//計測画面      
  startTime = new Date().getTime(); //開始時刻
  addTime = (hour*60*60*1000 + min*60*1000 + sec*1000 + millisec);
  startTime -= addTime;
}

//ストップ押した時////////////////////////////////////////////////////////
function stopBtn(){
  status = 0;
  clearTimeout(timerId);
  stopTime = new Date().getTime(); //終了時刻
        
  start.disabled = "";
  stop.disabled = "true";
  reset.disabled = "";
        
  TimeDisplay();
  }

//リセットした時/////////////////////////////////////////////////////////
function resetBtn(){
  status = 0;
  addTime = "0";
  millisec = sec_100 = sec = min = hour = "0";
  timeDisplay.innerHTML="00:00:00:00";
  
//ボタン処理
  start.disabled = "";
  stop.disabled = "true";
  reset.disabled = "true";
}

//時間の表示//////////////////////////////////////////////////////////////
function TimeDisplay(){
  let time_value ="";
  let sec_100_value, sec_value, min_value, hour_value;
  
  //表示と桁制御
  sec_100_value = "" + sec_100;
  if(sec_100_value.length < 2){
    sec_100_value = "0" + sec_100_value;
  }
  
  sec_value=""+sec;
  if(sec_value.length < 2){
    sec_value= "0" + sec_value;
  }
  
  min_value=""+min;
  if(min_value.length < 2){
    min_value = "0" + min_value;
  }
  
  hour_value = "" + hour;
  if(hour_value.length < 2){
    hour_value= "0" + hour_value;
  }
 
  time_value=hour_value+":"+min_value+":"+sec_value+":"+sec_100_value;
  timeDisplay.innerHTML = time_value;
}

//計測時の動作///////////////////////////////////////////////////////////
function runTimer(){
    stopTime = new Date().getTime(); //終了時刻
    diff = new Date(stopTime - startTime); //経過時間
    millisec = diff.getMilliseconds();
    sec_100 = Math.floor(millisec / 10); //整数
    sec = diff.getSeconds();
    min = diff.getMinutes();//分
    hour = diff.getHours() + t_zone;//-9時間引く
    
    TimeDisplay();
    timerId = setTimeout(runTimer,10);
}

<!-- 
// ----------------------------------------------------------------------------
// touch Event のプリントモニター
// ----------------------------------------------------------------------------
-->

function touchHandler(e){

	log.innerText = "ON\n";
	touchMonitor(e,-1);
}
function handleStart(e){

	log.innerText = "Start\n";
	touchMonitor(e,1);
}
function handleEnd(e){

	log.innerText = "End\n";
	touchMonitor(e,0);
}

function handleCancel(e){
	log.innerText = "Cancel\n";
	touchMonitor(e,-1);
}

function handleLeave(e){
	log.innerText = "handleLeave\n";
	touchMonitor(e,-1);
}

function handleMove(e){
	log.innerText = "Move\n";
	touchMonitor(e,-1);
}
<!-- 
// ----------------------------------------------------------------------------
// mousedown/mouseup のプリントモニター
// ----------------------------------------------------------------------------
-->
function handleMousedown(e){
	log.innerText = "moudeDown\n";
	chageColor(e,1);
}
function handleMouseup(e){
	log.innerText = "moudeUp\n";
	chageColor(e,0);
}

function chageColor(e,n){


	var num = serchTouchNum(e.clientX,e.clientY);

	if(num==-1) return;

	if(n==1){
		mNoteon(mDrumNoteNum[num]);
	} else {
		mNoteoff(mDrumNoteNum[num]);
	}

	// ブラウザのクライアント領域の左上を原点とした座標を取得
	log.innerText = "clientX:";
	log.innerText += e.clientX;
	log.innerText +=" ";
	log.innerText += "clientY:";
	log.innerText += e.clientY;
	log.innerText += " "
	log.innerText += "Num ="
	log.innerText += serchTouchNum(e.clientX,e.clientY);
	log.innerText +="\n";

/*
	var rx = Math.floor(e.clientX/mCv.clientWidth*5);
	var ry = Math.floor(e.clientY/mCv.clientHeight*4);

	if(rx<0 || rx>=5) return;
	if(ry<0 || ry>=4) return;

	var a0 = mPcolor[ry][rx][0];
	var a1 = mPcolor[ry][rx][1];
	var a2 = mPcolor[ry][rx][2];
	var x0=rx*mXx;
	var y0=ry*mYy;

	if(n==1){
		a0=0xFF-a0; a1=0xFF-a1; a2=0xFF-a2;
	}

	mCtx.fillStyle = "rgb("+a0+","+a1+","+a2+")";
	mCtx.fillRect(x0,y0,mXx,mYy);

	if(n==1){
		mNoteon(mNotenum[3-ry][rx]);
	} else {
		mNoteoff(mNotenum[3-ry][rx]);
	}
*/
}

function touchMonitor(e,n){

	// TouchList オブジェクトを取得
	var touch_list = e.changedTouches;

	if(touch_list==null) return;
	if(n==-1) return;

	// 中身に順番にアクセス
	var num = touch_list.length;

	for(var i=0; i < num; i++){

		// Touch オブジェクトを取得
		var touch = touch_list[i];

		chageColor(touch,n);

/*
		// 識別番号を取得
		log.innerText += "id:";
		log.innerText += touch.identifier;
		log.innerText +="\n";

		// モニタのスクリーン領域の左上を原点とした座標を取得
		log.innerText += "screenX:";
		log.innerText += touch.screenX;
		log.innerText +=" ";
		log.innerText += "screenY:";
		log.innerText += touch.screenY;
		log.innerText +="\n";

		// ブラウザのクライアント領域の左上を原点とした座標を取得
		log.innerText += "clientX:";
		log.innerText += touch.clientX;
		log.innerText +=" ";
		log.innerText += "clientY:";
		log.innerText += touch.clientY;
		log.innerText +="\n";

		// HTML 全体の左上を原点とした座標を取得
		log.innerText += "pageX:";
		log.innerText += touch.pageX;
		log.innerText +=" ";
		log.innerText += "pageX:";
		log.innerText += touch.pageX;
		log.innerText +="\n";

		log.innerText +="-------\n";
*/
	}
}

/* -----------------------------------------------------------------------	*/

window.addEventListener('DOMContentLoaded', function (){

	if(log!=null){
		var timerId=setInterval(function(){
			log.innerText += "*";
			if(mReadFlag==mSOUNDNUM || mImgFlag==(mSOUNDNUM+1)){
				clearInterval(timerId);
				setTouchEvent();
				log.innerText += "\n準備OK 画面を横向きにしてタッチしてください。\n";
			}
		}, 500 );
	}

});

var mWidth=0;
var mHeigth=0;
var mDrumNoteNum=[0,0,0,0,0,0,0,0];

function setTouchEvent()
{
	var mCv = fdg1.cv;
	if(log!=null) log.innerText = "準備できるまでお待ちください。\n";
	log.innerText += "height:";
	log.innerText += mCv.clientHeight;
	log.innerText +=" ";
	log.innerText += "width:";
	log.innerText += mCv.clientWidth;
	log.innerText +="\n";

	mCv.addEventListener("touchstart", handleStart, false);
	mCv.addEventListener("touchend", handleEnd, false);
	mCv.addEventListener("touchcancel", handleCancel, false);
	mCv.addEventListener("touchleave", handleLeave, false);
	mCv.addEventListener("touchmove", handleMove, false);
	mCv.addEventListener( "mousedown", handleMousedown ) ;
	mCv.addEventListener( "mouseup", handleMouseup ) ;

	mWidth=mImg_pad[1].width;
	mHeigth=mImg_pad[1].height;
	
	mDrumNoteNum[0]=crsl;
	mDrumNoteNum[1]=pdhh;
	mDrumNoteNum[2]=hftm;
	mDrumNoteNum[3]=srnr;
	mDrumNoteNum[4]=bdrm;
	mDrumNoteNum[5]=lftm;
	mDrumNoteNum[6]=cdhh;
	mDrumNoteNum[7]=ophh;
}

//	mPosx, mPosy
function serchTouchNum(x,y)
{
	var num=-1;
	for(i=0; i<8; i++){
		if(mPosx[i]<x && x<mPosx[i]+mWidth)
			if(mPosy[i]<y && y<mPosy[i]+mHeigth){
				num=i;
			}
	}
	return num;
}

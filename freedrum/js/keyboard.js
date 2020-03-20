
	var mPushkey=Array(128);

window.addEventListener('load', function (){

	document.onkeydown = keydown;
	document.onkeyup = keyup;
	for(var i=0; i<128; i++){ mPushkey[i]=0; }

}, false);

function keydown(event) {

	var cKeynum=setKeycode(event.keyCode);

	if(cKeynum!=-1){

		if(mPushkey[cKeynum]==0){
			mNoteon(cKeynum);
			mPushkey[cKeynum]=1;
		}
	}
}

function keyup(event) {

	var cKeynum=setKeycode(event.keyCode);

	if(cKeynum!=-1){

		if(mPushkey[cKeynum]==1){
			mNoteoff(cKeynum);
			mPushkey[cKeynum]=0;
		}
	}

}

function setKeycode( num ){

	var cKeynum=-1;

	switch(num){

		case 72:	//H ->Kick
			cKeynum=bdrm;
			break;
		case 74:	//J ->Floor Tom1
			cKeynum=lftm;
			break;
		case 75:	//K ->Hihat Close
			cKeynum=cdhh;
			break;
		case 76:	//L ->Hihat
			cKeynum=ophh;
			break;

		case 70:	//F ->Snare
			cKeynum=srnr;
			break;
		case 68:	//D ->Tom1
			cKeynum=hftm;
			break;
		case 83:	//S ->Hihat loose
			cKeynum=pdhh;
			break;
		case 65:	//A ->Crash
			cKeynum=crsl;
			break;

	}

	return cKeynum;
}

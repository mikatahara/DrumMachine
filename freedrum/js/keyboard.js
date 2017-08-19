
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

		case 72:	//H ->Bass
			cKeynum=bdrm;
			break;
		case 74:	//J ->Bass
			cKeynum=lftm;
			break;
		case 75:	//K ->Bass
			cKeynum=cdhh;
			break;
		case 76:	//L ->Bass
			cKeynum=ophh;
			break;

		case 70:	//F ->Bass
			cKeynum=srnr;
			break;
		case 68:	//D ->Bass
			cKeynum=hftm;
			break;
		case 83:	//S ->Bass
			cKeynum=pdhh;
			break;
		case 65:	//A ->Bass
			cKeynum=crsl;
			break;

	}

	return cKeynum;
}

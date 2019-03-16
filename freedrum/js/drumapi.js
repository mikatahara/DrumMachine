﻿// 1. Bass Drum			36	//kickbeateron1.wav
// 2. Snare				38	//snare1.wav
// 3. Low Floor Tom		41	//floortom1.wav
// 4. High Floor Tom	43	//tom1.wav
// 5. Closed Hi-Hat		42	//hihatclose1.wav
// 6. Pedal Hi-Hat		44	//hihatloose1.wav
// 7. Open Hi-Hat		46	//hihat1.wav
// 8. Crash Cymbal		49	//crash20inch1.wav


	const bdrm = 36;
	const srnr = 38
	const lftm = 41
	const hftm = 43
	const cdhh = 42
	const pdhh = 44
	const ophh = 46
	const crsl = 49

	const dm0 = 0;
	const dm1 = dm0 +1;
	const dm2 = dm1 +1;

	const dm3 = dm2 +1;
	const dm4 = dm3 +1;
	const dm5 = dm4 +1;

	const dm6 = dm5 +1;
	const dm7 = dm6 +1;

	const SOUNDNUM = dm7 +1;

	var mLocalAudioBuffer= null;
	var	mAudioBuffer = null;
	var audioContext = null;	//Use Audio Interface

	var mReadFlag=0;
	var audioSource = null;

	var mKeylim = Array(SOUNDNUM);
	var mKeyTotal = 0;

	var fdg1 = null;
	var mImg_pad = null;
	var mPosx=null;
	var mPosy=null;

	// グラフの座標
	var ixb = 12;	//描画X軸の基点
	var iyb = 12;	//描画Y軸の基点
	var ixw = 1024;	//描画のX軸のサイズ
	var iyw = 200;	//描画のX軸のサイズ

window.addEventListener('load', function (){

	// Web Audio API
	audioContext = new AudioContext(); //Use Audio Interface

	// Sound Buffer
	mReadFlag=0;
	mLocalAudioBuffer= Array(SOUNDNUM);
	mAudioBuffer = Array(SOUNDNUM);

	for(var i=0; i<SOUNDNUM; i++){
		mLocalAudioBuffer[i]=new LocalAudioBuffer();
	}

	//Key Information
	for(var i=0; i<SOUNDNUM; i++){
		mKeylim[i]=new Array(3);
	}

	mKeylim[dm0 ] = [ bdrm,bdrm,bdrm ];
	mKeylim[dm1 ] = [ srnr,srnr,srnr ];
	mKeylim[dm2 ] = [ lftm,lftm,lftm ];
	mKeylim[dm3 ] = [ hftm,hftm,hftm ];
	mKeylim[dm4 ] = [ cdhh,cdhh,cdhh ];
	mKeylim[dm5 ] = [ pdhh,pdhh,pdhh ];
	mKeylim[dm6 ] = [ ophh,ophh,ophh ];
	mKeylim[dm7 ] = [ crsl,crsl,crsl ];

	mKeyTotal = mKeylim[dm7 ][2] - mKeylim[dm0 ][0]+1;
	audioSource = Array(mKeyTotal);
	for(var i=0; i<mKeyTotal; i++){
		audioSource[i]=null;
	}

	//Load Wave Files
	loadDogSound("freedrum/wav/kickbeateron1.wav"	,dm0 );
	loadDogSound("freedrum/wav/snare1.wav" 			,dm1 );
	loadDogSound("freedrum/wav/floortom1.wav" 		,dm2 );
	loadDogSound("freedrum/wav/tom1.wav" 			,dm3 );
	loadDogSound("freedrum/wav/hihatclose1.wav"		,dm4 );
	loadDogSound("freedrum/wav/hihatloose1.wav"		,dm5 );
	loadDogSound("freedrum/wav/hihat1.wav" 			,dm6 );
	loadDogSound("freedrum/wav/crash20inch1.wav"	,dm7 );

}, false);

function loadDogSound(url, n) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

// Decode asynchronously
	request.onload = function() {
		audioContext.decodeAudioData(request.response, function(buffer) {
		mAudioBuffer[n]= buffer; 
		mLocalAudioBuffer[n].fSetBuffer(mAudioBuffer[n]);
		mReadFlag++;
		}, function(){ alert('Error'); } );
	}
	request.send();
}

function mNoteoff( ckey )
{
	var dnum=0;

	switch( ckey ){
		case bdrm: dnum=4; break;
		case srnr: dnum=3; break;
		case lftm: dnum=5; break;
		case hftm: dnum=2; break;
		case cdhh: dnum=6; break;
		case pdhh: dnum=1; break;
		case ophh: dnum=7; break;
		case crsl: dnum=0; break;
	}

	fdg1.fDrawImageW(mImg_pad[dnum],mPosx[dnum],mPosy[dnum]);
	fdg1.fClearWindowInside();

}

function mNoteon( ckey )
{
	var cnum=0;
	var dnum=0;
	var jnum=ckey- mKeylim[dm0 ][0];

	if( jnum >= mKeyTotal ) return; 

	for(var i=0; i<SOUNDNUM; i++){
		if( ckey >= mKeylim[i][0] && ckey <= mKeylim[i][2] ) {
			cnum =i;
			break;
		}
	}

	switch( ckey ){
		case bdrm: dnum=4; break;
		case srnr: dnum=3; break;
		case lftm: dnum=5; break;
		case hftm: dnum=2; break;
		case cdhh: dnum=6; break;
		case pdhh: dnum=1; break;
		case ophh: dnum=7; break;
		case crsl: dnum=0; break;
	}

	var computedPlaybackRate = Math.pow(2, (ckey-mKeylim[cnum][1])/12);

	audioSource[jnum] = audioContext.createBufferSource();	// creates a sound source
	audioSource[jnum].buffer = mAudioBuffer[cnum];			// tell the source which sound to play
	audioSource[jnum].connect(audioContext.destination);
	audioSource[jnum].playbackRate.value = computedPlaybackRate;
	audioSource[jnum].start(0);								// play the source now
}


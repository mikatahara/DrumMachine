// 1. Bass Drum			36	//kickbeateron1.wav
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

	const mSOUNDNUM = dm7 +1;

	var mLocalAudioBuffer= null;
	var	mAudioBuffer = null;
	var audioContext = null;	//Use Audio Interface

	var mReadFlag=0;
	var mImgFlag=0;
	var audioSource = null;

	var mKeylim = Array(mSOUNDNUM);
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

	// Image Position
	var xp=[[0,0],[0,0],[0,0],[0,0]];
	var yp=[[0,0],[0,0]];

	var img_width;
	var img_height;

window.addEventListener('load', function (){

	// Sound Buffer
	mReadFlag=0;
	mLocalAudioBuffer= Array(mSOUNDNUM);
	mAudioBuffer = Array(mSOUNDNUM);

	for(var i=0; i<mSOUNDNUM; i++){
		mLocalAudioBuffer[i]=new LocalAudioBuffer();
	}

	// Web Audio API
	window.AudioContext = window.AudioContext||window.webkitAudioContext;
	audioContext = new AudioContext(); //Use Audio Interface

	//Key Information
	for(var i=0; i<mSOUNDNUM; i++){
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


	//Load Image File
	mImg_pad =new Array(9);
	mPosx =new Array(8);
	mPosy =new Array(8);
	for(var i=0; i<mSOUNDNUM+1; i++){
		mImg_pad[i]= new Image();
		mImg_pad[i].onload = function(){
			mImgFlag++;
		}
	}

	mImg_pad[0].src = "freedrum/png/pad_blueA.png";
	mImg_pad[1].src = "freedrum/png/pad_blueS.png";
	mImg_pad[2].src = "freedrum/png/pad_blueD.png";
	mImg_pad[3].src = "freedrum/png/pad_blueF.png";
	mImg_pad[4].src = "freedrum/png/pad_greenH.png";
	mImg_pad[5].src = "freedrum/png/pad_greenJ.png";
	mImg_pad[6].src = "freedrum/png/pad_greenK.png";
	mImg_pad[7].src = "freedrum/png/pad_greenL.png";
	mImg_pad[8].src = "freedrum/png/pad_orange.png";

	// Image Position

	// wait Image load
	var timerId3=setInterval(function(){
		if(mImgFlag==(mSOUNDNUM+1)){
			clearInterval(timerId3);
			img_width=mImg_pad[0].width;
			img_height=mImg_pad[0].height;

			if(fdg1.cv.width<fdg1.cv.height){
				while(fdg1.cv.width<(img_width*2)*4){
					img_width/=2;
					img_height/=2;
				}
				img_width*=2;
				img_height*=2;

				var xpos=6;		//(fdg1.cv.width-img_width*4-400);
				var ypos=20;
				mPosx[0]=xpos; mPosy[0]=ypos;
				fdg1.fDrawImageWH(mImg_pad[0],xpos,ypos,img_width,img_height); 
				xpos=xpos+img_width+10; mPosx[1]=xpos; mPosy[1]=ypos;
				fdg1.fDrawImageWH(mImg_pad[1],xpos,ypos,img_width,img_height);

				xpos=6;
				ypos=ypos+img_height+10;
				mPosx[2]=xpos; mPosy[2]=ypos;
				fdg1.fDrawImageWH(mImg_pad[2],xpos,ypos,img_width,img_height);
				xpos=xpos+img_width+10; mPosx[3]=xpos; mPosy[3]=ypos;
				fdg1.fDrawImageWH(mImg_pad[3],xpos,ypos,img_width,img_height);

				xpos=6;			//(fdg1.cv.width-img_width*4-400);
				ypos=ypos+img_height+10;
				mPosx[4]=xpos; mPosy[4]=ypos;
				fdg1.fDrawImageWH(mImg_pad[4],xpos,ypos,img_width,img_height);
				xpos=xpos+img_width+10; mPosx[5]=xpos; mPosy[5]=ypos;
 				fdg1.fDrawImageWH(mImg_pad[5],xpos,ypos,img_width,img_height);

				xpos=6; 
				ypos=ypos+img_height+10;
				mPosx[6]=xpos; mPosy[6]=ypos;
				fdg1.fDrawImageWH(mImg_pad[6],xpos,ypos,img_width,img_height);
				xpos=xpos+img_width+10; mPosx[7]=xpos; mPosy[7]=ypos;
				fdg1.fDrawImageWH(mImg_pad[7],xpos,ypos,img_width,img_height);
			} else {
				var xpos=(fdg1.cv.width-img_width*4-150)*0.25;
				var ypos=20;
				mPosx[0]=xpos; mPosy[0]=ypos;
				fdg1.fDrawImageW(mImg_pad[0],xpos,ypos,img_width,img_height); 
				xpos=xpos+img_width+50; mPosx[1]=xpos; mPosy[1]=ypos;
				fdg1.fDrawImageW(mImg_pad[1],xpos,ypos,img_width,img_height);
				xpos=xpos+img_width+50; mPosx[2]=xpos; mPosy[2]=ypos;
				fdg1.fDrawImageW(mImg_pad[2],xpos,ypos,img_width,img_height);
				xpos=xpos+img_width+50; mPosx[3]=xpos; mPosy[3]=ypos;
				fdg1.fDrawImageW(mImg_pad[3],xpos,ypos,img_width,img_height);

				xpos=(fdg1.cv.width-img_width*4-150)*0.75;
				ypos=ypos+img_height+10;
				mPosx[4]=xpos; mPosy[4]=ypos;
				fdg1.fDrawImageW(mImg_pad[4],xpos,ypos,img_width,img_height);
				xpos=xpos+img_width+50; mPosx[5]=xpos; mPosy[5]=ypos;
 				fdg1.fDrawImageW(mImg_pad[5],xpos,ypos,img_width,img_height);
				xpos=xpos+img_width+50; mPosx[6]=xpos; mPosy[6]=ypos;
				fdg1.fDrawImageW(mImg_pad[6],xpos,ypos,img_width,img_height);
				xpos=xpos+img_width+50; mPosx[7]=xpos; mPosy[7]=ypos;
				fdg1.fDrawImageW(mImg_pad[7],xpos,ypos,img_width,img_height);
			}

		}
	}, 500 );

	// Web MIDI API
	if(document.input_device_select!=null && document.output_device_select!=null){
		setInputMenuID(document.input_device_select.ids);
		setOutputMenuID(document.output_device_select.ids);
		runTest();

		var timerId2=setInterval(function(){
			if(input!=null || no_midi_interface==1){ // MIDI interface の準備ができた、もしくはMIDI Interfaceが無い
				clearInterval(timerId2);
				if(input!=null) input.onmidimessage = handleMIDIMessageGroundpiano;

			}
		}, 500 );

	}

	/* 描画の準備 */
	fdg1 = new DrawGraph(0,1200,0,768);
	fdg1.fSetCanvas(document.getElementById('bkg'));
	fdg1.fResize();
	fdg1.fSetWindowXY(0,fdg1.cv.width,fdg1.cv.height/2+20,fdg1.cv.height);
	fdg1.fSetViewPort(0,1024,-1.0,1.0);

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

function handleMIDIMessageGroundpiano( event )
{
	var str=null;
	var status, data1, data2;

	if( event.data[0] ==0xFE ) return;
	if( event.data[0] ==0xF8 ) return;

	status = event.data[0]&0xF0;
	data1  = event.data[1];
	data2  = event.data[2];

	if(status==0x90 && data2==0) status=0x80;

	switch( status ){
		case 0x80:
			mNoteoff(data1);
			break;
		case 0x90:
			mNoteon(data1);
			break;
		case 0xA0:
			break;
		case 0xB0:
			break;
		case 0xC0:
			break;
		case 0xD0:
			break;
		case 0xE0:
			break;
		case 0xF0:
			break;
	}

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

	fdg1.fDrawImageWH(mImg_pad[dnum],mPosx[dnum],mPosy[dnum],img_width,img_height);
	fdg1.fClearWindowInside();

}

function mNoteon( ckey )
{
	var cnum=0;
	var dnum=0;
	var jnum=ckey- mKeylim[dm0 ][0];

	if( jnum >= mKeyTotal ) return; 

	for(var i=0; i<mSOUNDNUM; i++){
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

	fdg1.fDrawImageWH(mImg_pad[8],mPosx[dnum],mPosy[dnum],img_width,img_height);

	var computedPlaybackRate = Math.pow(2, (ckey-mKeylim[cnum][1])/12);

	audioSource[jnum] = audioContext.createBufferSource();	// creates a sound source
	audioSource[jnum].buffer = mAudioBuffer[cnum];			// tell the source which sound to play
	audioSource[jnum].connect(audioContext.destination);
	audioSource[jnum].playbackRate.value = computedPlaybackRate;
	audioSource[jnum].start(0);								// play the source now

//	fdg1.fDrawLine(mLocalAudioBuffer[cnum].buffer);
}


function process(data){

	var procsize = data.inputBuffer.length;

	/* L-ch を描画する */
	var inbufL = data.inputBuffer.getChannelData(0);
	var inbufR = data.inputBuffer.getChannelData(1);
	var outbufL = data.outputBuffer.getChannelData(0);
	var outbufR = data.outputBuffer.getChannelData(1);

	/* 描画領域のクリア */
    fdg1.clearRect(ixb,iyb,ixw,iyw);

	/* 波形の表示 */

}

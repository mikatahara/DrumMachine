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
	var mAudioContext = null;	//Use Audio Interface
	var audioContext = null;	//for localaudiobuffer

	var mReadFlag=0;
	var mAudioSource = null;

	var mKeylim = Array(mSOUNDNUM);
	var mKeyTotal = 0;

function testtesttest(){
	log.innerText += "TESTTESTTEST\n";
}

window.addEventListener('load', function (){

	log.innerText += "Drum API A:";

	// Web Audio API
//	mAudioContext = new AudioContext(); //Use Audio Interface
	mAudioContext = new (AudioContext || webkitAudioContext)();
	audioContext = mAudioContext;

	log.innerText += "Drum API B:";

	// Sound Buffer
	mReadFlag=0;
	mLocalAudioBuffer= Array(mSOUNDNUM);
	mAudioBuffer = Array(mSOUNDNUM);

	for(var i=0; i<mSOUNDNUM; i++){
		mLocalAudioBuffer[i]=new LocalAudioBuffer();
	}

	log.innerText += "Drum API C:";

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
	mAudioSource = Array(mKeyTotal);
	for(var i=0; i<mKeyTotal; i++){
		mAudioSource[i]=null;
	}

	log.innerText += "Drum API D\n";

	//Load Wave Files
	loadDogSound("https://mikatahara.github.io/DrumMachine/freedrum/wav/kickbeateron1.wav"	,dm0 );
	loadDogSound("https://mikatahara.github.io/DrumMachine/freedrum/wav/snare1.wav" 		,dm1 );
	loadDogSound("https://mikatahara.github.io/DrumMachine/freedrum/wav/floortom1.wav" 		,dm2 );
	loadDogSound("https://mikatahara.github.io/DrumMachine/freedrum/wav/tom1.wav" 			,dm3 );
	loadDogSound("https://mikatahara.github.io/DrumMachine/freedrum/wav/hihatclose1.wav"	,dm4 );
	loadDogSound("https://mikatahara.github.io/DrumMachine/freedrum/wav/hihatloose1.wav"	,dm5 );
	loadDogSound("https://mikatahara.github.io/DrumMachine/freedrum/wav/hihat1.wav" 		,dm6 );
	loadDogSound("https://mikatahara.github.io/DrumMachine/freedrum/wav/crash20inch1.wav"	,dm7 );

}, false);

function loadDogSound(url, n) {
	log.innerText += "loadDogSound";
	log.innerText += n;
	log.innerText += "\n";
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

// Decode asynchronously
	request.onload = function() {
		mAudioContext.decodeAudioData(request.response, function(buffer) {
		mAudioBuffer[n]= buffer; 
		mLocalAudioBuffer[n].fSetBuffer(mAudioBuffer[n]);
		mReadFlag++;
		log.innerText += mReadFlag;
		log.innerText += "\n";
		
		}, function(){
			alert('Error');
			log.innerText += "File Load Error";
		} );
	}
	request.send();
}

function mNoteoff( ckey )
{
}

function mNoteon( ckey )
{
	var cnum=0;
	var dnum=0;
	var jnum=ckey- mKeylim[dm0 ][0];

	if( jnum < 0 ) return; 
	else if( jnum >= mKeyTotal ) return; 

	for(var i=0; i<mSOUNDNUM; i++){
		if( ckey >= mKeylim[i][0] && ckey <= mKeylim[i][2] ) {
			cnum =i;
			break;
		}
	}

	var computedPlaybackRate = Math.pow(2, (ckey-mKeylim[cnum][1])/12);

	mAudioSource[jnum] = mAudioContext.createBufferSource();	// creates a sound source
	mAudioSource[jnum].buffer = mAudioBuffer[cnum];				// tell the source which sound to play
	mAudioSource[jnum].connect(mAudioContext.destination);
	mAudioSource[jnum].playbackRate.value = computedPlaybackRate;
	mAudioSource[jnum].start(0);								// play the source now
}


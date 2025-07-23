(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"animate30_atlas_1", frames: [[738,0,390,294],[738,296,381,279],[738,577,224,305],[0,0,736,1288],[0,1290,512,512],[514,1290,512,512]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_3 = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.firefly = function() {
	this.initialize(img.firefly);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,2000);


(lib.forest3 = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.volume1 = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.volume = function() {
	this.initialize(ss["animate30_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.UnmuteButton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.volume1();
	this.instance.setTransform(0,0,0.1078,0.1078);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,55.2,55.2);


(lib.Tween10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.forest3();
	this.instance.setTransform(-504.75,-848.3,1.3716,1.3172);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-504.7,-848.3,1009.5,1696.6);


(lib.Tween9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.forest3();
	this.instance.setTransform(-504.75,-848.3,1.3716,1.3172);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-504.7,-848.3,1009.5,1696.6);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.firefly();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,3000,2000), null);


(lib.StartButton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// StartButton
	this.text = new cjs.Text("Play animation", "20px 'Times New Roman'", "#FFFFFF");
	this.text.lineHeight = 24;
	this.text.lineWidth = 123;
	this.text.parent = this;
	this.text.setTransform(30.15,8.7);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#323232").ss(1,1,1).p("Arni7IXPAAQBEAAAvAwQAwAvAABEIAAAxQAABEgwAvQgvAwhEAAI3PAAQhEAAgvgwQgwgvAAhEIAAgxQAAhEAwgvQAvgwBEAAg");
	this.shape.setTransform(91.675,19.775);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#2269FD","#1F67FD","#2269FD","#8767FD","#23CDDA","#05D0E1","#F3F7FE","#FFFFFF","#996600","#FFFFFF","#FFFFFF","#F466FD","#F466FD","#0CFDF6","#23D115"],[0,0.004,0.165,0.553,0.882,1,1,1,1,1,1,1,1,1,1],-90.6,0,90.7,0).s().p("ArnC8QhEAAgvgwQgwgvAAhEIAAgxQAAhEAwgvQAvgwBEAAIXPAAQBEAAAvAwQAwAvAABEIAAAxQAABEgwAvQgvAwhEAAg");
	this.shape_1.setTransform(91.675,19.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(240));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,183.4,39.6);


(lib.RightWing = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(0,0,0.4718,0.4718);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,184,138.7);


(lib.Replay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Replay", "20px 'Times New Roman'", "#FFFFFF");
	this.text.lineHeight = 24;
	this.text.lineWidth = 58;
	this.text.parent = this;
	this.text.setTransform(81.95,9.75,1.3792,1.3792);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#323232").ss(1,1,1).p("AsAi1IYBAAQA5AAAoApQApAoAAA5IAABWQAAA5gpApQgoAog5AAI4BAAQg5AAgogoQgpgpAAg5IAAhWQAAg5ApgoQAogpA5AAg");
	this.shape.setTransform(121.6644,25.0231,1.3419,1.3792);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#D904F3","#4EF310","#FFFFFF","#996600","#FFFFFF","#FFFFFF","#F466FD","#F466FD","#0CFDF6","#23D115","#2269FD","#2269FD","#B4F627","#1F67FD"],[0.004,1,1,1,1,1,1,1,1,1,1,1,1,1],-90.6,0,90.7,0).s().p("AsAC2Qg5AAgogpQgpgoAAg6IAAhVQAAg6ApgoQAogpA5AAIYBAAQA5AAAoApQApAoAAA6IAABVQAAA6gpAoQgoApg5AAg");
	this.shape_1.setTransform(121.6644,25.0231,1.3419,1.3792);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,245.4,52.1);


(lib.Pauseanimation = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Pause animation", "20px 'Times New Roman'", "#FFFFFF");
	this.text.lineHeight = 24;
	this.text.lineWidth = 137;
	this.text.parent = this;
	this.text.setTransform(22.25,7.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#323232").ss(1,1,1).p("AsAi1IYBAAQA5AAAoApQApAoAAA5IAABWQAAA5gpApQgoAog5AAI4BAAQg5AAgogoQgpgpAAg5IAAhWQAAg5ApgoQAogpA5AAg");
	this.shape.setTransform(90.675,18.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#D9013B","#B6D90C","#FFFFFF","#996600","#FFFFFF","#FFFFFF","#F466FD","#F466FD","#0CFDF6","#23D115","#2269FD","#2269FD","#B4F627","#1F67FD"],[0.004,1,1,1,1,1,1,1,1,1,1,1,1,1],-90.6,0,90.7,0).s().p("AsAC2Qg5AAgogpQgpgoAAg6IAAhVQAAg6ApgoQAogpA5AAIYBAAQA5AAAoApQApAoAAA6IAABVQAAA6gpAoQgoApg5AAg");
	this.shape_1.setTransform(90.675,18.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,183.4,38.3);


(lib.MuteButton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.volume();
	this.instance.setTransform(0,0,0.1105,0.1105);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,56.6,56.6);


(lib.LeftWing = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,190.5,139.5);


(lib.LearnMoreButton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Learn more", "20px 'Times New Roman'", "#FFFFFF");
	this.text.lineHeight = 24;
	this.text.lineWidth = 94;
	this.text.parent = this;
	this.text.setTransform(55,9.25,1.4206,1.3862);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#323232").ss(1,1,1).p("Arni7IXPAAQBEAAAvAwQAwAvAABEIAAAxQAABEgwAvQgvAwhEAAI3PAAQhEAAgvgwQgwgvAAhEIAAgxQAAhEAwgvQAvgwBEAAg");
	this.shape.setTransform(121.7465,24.6095,1.3425,1.31);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0099FF").s().p("ArnC8QhEAAgvgwQgwgvAAhEIAAgxQAAhEAwgvQAvgwBEAAIXPAAQBEAAAvAwQAwAvAABEIAAAxQAABEgwAvQgvAwhEAAg");
	this.shape_1.setTransform(121.7465,24.6095,1.3425,1.31);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,245.5,51.2);


(lib.Body = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,112,152.5);


(lib.RightWing1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.RightWing("synched",0);
	this.instance.setTransform(97.5,73.55,1.0598,1.0598,0,0,0,92,69.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.RightWing1, new cjs.Rectangle(0,0,195,147), null);


(lib.LeftWing1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.LeftWing("synched",0);
	this.instance.setTransform(95.4,69.8,1,1,0,0,0,95.4,69.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.LeftWing1, new cjs.Rectangle(0,0,190.5,139.5), null);


(lib.Body1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Body("synched",0);
	this.instance.setTransform(55.9,76.2,1,1,0,0,0,55.9,76.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Body1, new cjs.Rectangle(0,0,112,152.5), null);


(lib.mariposa = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Body1
	this.instance = new lib.Body1();
	this.instance.setTransform(193.9,76.2,1,1,0,0,0,55.9,76.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(25));

	// RightWing1
	this.instance_1 = new lib.RightWing1();
	this.instance_1.setTransform(288.1,125.25,1,1,0,0,0,97.4,73.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:97.5,scaleX:0.9195,x:280.75},0).wait(1).to({scaleX:0.839,x:273.3},0).wait(1).to({scaleX:0.7585,x:265.85},0).wait(1).to({scaleX:0.678,x:258.45},0).wait(1).to({scaleX:0.5975,x:251},0).wait(1).to({scaleX:0.517,x:243.55},0).wait(1).to({scaleX:0.5909,x:250.45},0).wait(1).to({scaleX:0.6648,x:257.35},0).wait(1).to({scaleX:0.7388,x:264.3},0).wait(1).to({scaleX:0.8127,x:271.2},0).wait(1).to({scaleX:0.8866,x:278.1},0).wait(1).to({scaleX:0.719,x:262.6},0).wait(1).to({scaleX:0.5514,x:247.05},0).wait(1).to({scaleX:0.3838,x:231.55},0).wait(1).to({scaleX:0.5343,x:245.4},0).wait(1).to({scaleX:0.6848,x:259.25},0).wait(1).to({scaleX:0.8353,x:273.1},0).wait(1).to({scaleX:0.7137,x:261.95},0).wait(1).to({scaleX:0.5921,x:250.8},0).wait(1).to({scaleX:0.4705,x:239.6},0).wait(1).to({scaleX:0.6021,x:251.95},0).wait(1).to({scaleX:0.7338,x:264.3},0).wait(1).to({scaleX:0.8655,x:276.65},0).wait(1).to({regX:97.4,scaleX:1,x:288.1},0).wait(1));

	// LeftWing1
	this.instance_2 = new lib.LeftWing1();
	this.instance_2.setTransform(95.4,124.55,1,1,0,0,0,95.4,69.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:95.2,scaleX:0.9222,x:102.2},0).wait(1).to({scaleX:0.8444,x:109.2},0).wait(1).to({scaleX:0.7666,x:116.25},0).wait(1).to({scaleX:0.6888,x:123.2},0).wait(1).to({scaleX:0.611,x:130.2},0).wait(1).to({scaleX:0.5332,x:137.25},0).wait(1).to({scaleX:0.6003,x:131.15},0).wait(1).to({scaleX:0.6674,x:125.05},0).wait(1).to({scaleX:0.7344,x:118.9},0).wait(1).to({scaleX:0.8015,x:112.8},0).wait(1).to({scaleX:0.8686,x:106.7},0).wait(1).to({scaleX:0.7096,x:121.2},0).wait(1).to({scaleX:0.5506,x:135.75},0).wait(1).to({scaleX:0.3916,x:150.3},0).wait(1).to({scaleX:0.5438,x:136.85},0).wait(1).to({scaleX:0.6961,x:123.5},0).wait(1).to({scaleX:0.8484,x:110.15},0).wait(1).to({scaleX:0.7207,x:121.15},0).wait(1).to({scaleX:0.593,x:132.2},0).wait(1).to({scaleX:0.4653,x:143.2},0).wait(1).to({scaleX:0.5895,x:132},0).wait(1).to({scaleX:0.7136,x:120.85},0).wait(1).to({scaleX:0.8377,x:109.65},0).wait(1).to({regX:95.4,scaleX:1,x:95.4},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,385.7,198.8);


// stage content:
(lib.animate30 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,719];
	this.streamSoundSymbolsList[1] = [{id:"beautifulblackbirdsinging_2302659",startFrame:1,endFrame:720,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
		this.button_2.visible = false;
		this.button_6.visible = false;
		
		
		
		/* Mouse Click Event
		Clicking on the specified symbol instance executes a function in which you can add your own custom code.
		
		Instructions:
		1. Add your custom code on a new line after the line that says "// Start your custom code" below.
		The code will execute when the symbol instance is clicked.
		*/
		
		this.button_1.addEventListener("click", fl_MouseClickHandler_3.bind(this));
		
		function fl_MouseClickHandler_3()
		{
			// Start your custom code
			// This example code displays the words "Mouse clicked" in the Output panel.
			this.play();
			this.button_1.visible = false;
			this.button_2.visible = true;
			// End your custom code
		}
		
		/* Mouse Click Event
		Clicking on the specified symbol instance executes a function in which you can add your own custom code.
		
		Instructions:
		1. Add your custom code on a new line after the line that says "// Start your custom code" below.
		The code will execute when the symbol instance is clicked.
		*/
		
		this.button_2.addEventListener("click", fl_MouseClickHandler_4.bind(this));
		
		function fl_MouseClickHandler_4()
		{
			// Start your custom code
			// This example code displays the words "Mouse clicked" in the Output panel.
			this.stop();
			createjs.Sound.stop();
			this.button_1.visible = true;
			this.button_2.visible = false;
			// End your custom code
		}
		
		
		/* Mouse Click Event
		Clicking on the specified symbol instance executes a function in which you can add your own custom code.
		
		Instructions:
		1. Add your custom code on a new line after the line that says "// Start your custom code" below.
		The code will execute when the symbol instance is clicked.
		*/
		
		this.button_5.addEventListener("click", fl_MouseClickHandler_6.bind(this));
		
		function fl_MouseClickHandler_6()
		{
			// Start your custom code
			// This example code displays the words "Mouse clicked" in the Output panel.
			this.button_5.visible = false;
			this.button_6.visible = true;
			createjs.Sound.muted = true;
			// End your custom code
		}
		
		/* Mouse Click Event
		Clicking on the specified symbol instance executes a function in which you can add your own custom code.
		
		Instructions:
		1. Add your custom code on a new line after the line that says "// Start your custom code" below.
		The code will execute when the symbol instance is clicked.
		*/
		
		this.button_6.addEventListener("click", fl_MouseClickHandler_7.bind(this));
		
		function fl_MouseClickHandler_7()
		{
			// Start your custom code
			// This example code displays the words "Mouse clicked" in the Output panel.
			this.button_5.visible = true;
			this.button_6.visible = false;
			createjs.Sound.muted = false;
			// End your custom code
		}
	}
	this.frame_1 = function() {
		var soundInstance = playSound("beautifulblackbirdsinging_2302659",0);
		this.InsertIntoSoundStreamData(soundInstance,1,720,1);
	}
	this.frame_719 = function() {
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.button_3.addEventListener("click", fl_ClickToGoToAndStopAtFrame.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame()
		{
			this.gotoAndStop(1);
			this.button_1.visible = true;
		}
		
		
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.button_4.addEventListener("click", fl_ClickToGoToWebPage);
		
		function fl_ClickToGoToWebPage() {
			window.open("https://australianbutterflies.com/the-cairns-birdwing-butterfly/", "_blank");
		}
		this.stop();
		this.button_1.visible = false
		this.button_2.visible = false
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(718).call(this.frame_719).wait(1));

	// UnmuteButton
	this.button_6 = new lib.UnmuteButton();
	this.button_6.name = "button_6";
	this.button_6.setTransform(52.75,598.25,1.0253,1.0253,0,0,0,27.2,25.6);
	new cjs.ButtonHelper(this.button_6, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_6).wait(720));

	// MuteButton
	this.button_5 = new lib.MuteButton();
	this.button_5.name = "button_5";
	this.button_5.setTransform(53.3,600.3,1,1,0,0,0,28.3,28.3);
	new cjs.ButtonHelper(this.button_5, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_5).wait(720));

	// VisitLinkButton
	this.button_4 = new lib.LearnMoreButton();
	this.button_4.name = "button_4";
	this.button_4.setTransform(481.55,536.2,1,1,0,0,0,121.8,24.6);
	this.button_4._off = true;
	new cjs.ButtonHelper(this.button_4, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_4).wait(719).to({_off:false},0).wait(1));

	// ReplayButton
	this.button_3 = new lib.Replay();
	this.button_3.name = "button_3";
	this.button_3.setTransform(481.45,596.4,1,1,0,0,0,121.7,25);
	this.button_3._off = true;
	new cjs.ButtonHelper(this.button_3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_3).wait(719).to({_off:false},0).wait(1));

	// Butterfly
	this.instance = new lib.mariposa();
	this.instance.setTransform(132.55,167.05,1,1,41.9812,0,0,192.8,99.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({guide:{path:[132.7,167.1,165.6,140.8,204,120.9,267.9,87.7,337.8,77.1,364.7,73.1,398.7,71.7,419,70.9,459.7,70.6,499.3,70.4,519.3,72.2,552.2,75.3,576.6,85.5,600.9,95.5,626.2,116.5,642.2,129.9,669,157.5,673.1,161.8,677.1,166,715.1,205.9,733.8,233.6,764.6,279.4,768.8,323.4,770.8,345,766,364.2,760.7,385.4,747.8,400.1,729.8,420.7,696.7,429.3,673.8,435.2,635.1,436.5,612.1,437.3,594.6,437.3,585.3,437.3,577.5,437.1,567.2,436.8,557.6,436.2,537.6,434.9,520.3,432,497.4,428.4,470.2,420.4,457.9,416.8,445,412.3,429.9,407.2,408.2,399.1,383.8,389.8,371.6,385.3,327.7,368.9,296.9,361.2,255.4,350.8,219.8,350.9,178.6,351,143.1,365.7,104.4,381.7,81.6,411.5,66.5,431.3,64.8,450,63.6,462.3,68.2,476.9,71.3,487,78.9,502.6,89.9,525.1,99.4,538.4,112.5,556.8,128.2,566.6,153.6,582.4,195.4,581.8,263.1,580.4,331,542.2,389.9,508.9,443.4,451.3,455.7,437.9,470.2,420.4,488.3,398.4,509.6,370.1,520.8,355.2,532.8,338.6,570.2,287.1,575.2,280.4,599.6,247.5,619.5,223.6,638.5,200.8,654,185.9,665.6,174.8,677.1,166,685.5,159.6,694,154.4,716.8,140.2,741,134.3,767.3,128,791.5,132.5,831.3,139.9,860.6,174.9,888.1,207.7,895.5,251,901.9,289.2,893.1,333.8,885.9,370,867.8,414.1,857.9,438.3,848.6,453.9,836.3,474.5,821.1,487.4,806.5,499.8,786.1,507.8,768.8,514.6,746.6,518.4,703.9,525.6,670.5,517.5,618.8,505,571.6,452.7,566.2,446.8,561,440.4,559.3,438.4,557.6,436.2,543.6,418.7,520.5,385.5,514.8,377.3,509.6,370.1,491.4,344.5,480.1,330.8,452.1,297,417.5,269.6,382.8,242.1,343.4,222.5,308.6,205.2,275,196.8,237.6,187.5,202.8,189.4,165.1,191.3,132,206.8,97.2,223,75.1,250.9,61.5,267.9,51.9,290.7,43.7,310.1,37.9,334.8,25.2,388.8,32.2,437.5,40.1,492.5,71.9,528.8,100,560.8,145.7,576.6,186.5,590.7,234.8,590,312.5,588.9,398.4,552.2,463.6,524.3,547.7,468.6,551.2,466.3,571.6,452.7,579.8,447.2,590.8,439.8,592.7,438.5,594.6,437.3,618.2,421.5,634.1,411.5,677.5,384,713.5,366.9], orient:'fixed'}},719).wait(1));

	// PauseButton
	this.button_2 = new lib.Pauseanimation();
	this.button_2.name = "button_2";
	this.button_2.setTransform(480,595.75,1.3266,1.3266,0,0,0,90.7,18.2);
	new cjs.ButtonHelper(this.button_2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_2).wait(720));

	// StartButton
	this.button_1 = new lib.StartButton();
	this.button_1.name = "button_1";
	this.button_1.setTransform(480.05,596.55,1.3266,1.3266,0,0,0,91.7,19.8);
	new cjs.ButtonHelper(this.button_1, 0, 1, 2, false, new lib.StartButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_1).wait(720));

	// Fireflies
	this.instance_1 = new lib.Symbol1();
	this.instance_1.setTransform(1500,1000,1,1,0,0,0,1500,1000);

	
	var _tweenStr_0 = cjs.Tween.get(this.instance_1).wait(1).to({x:1498.6,y:997.05},0).wait(1).to({x:1497.15,y:994.05},0).wait(1).to({x:1495.7,y:991.1},0).wait(1).to({x:1494.25,y:988.1},0).wait(1).to({x:1492.8,y:985.15},0).wait(1).to({x:1491.35,y:982.15},0).wait(1).to({x:1489.9,y:979.2},0).wait(1).to({x:1488.45,y:976.2},0).wait(1).to({x:1487,y:973.25},0).wait(1).to({x:1485.55,y:970.25},0).wait(1).to({x:1484.1,y:967.3},0).wait(1).to({x:1482.65,y:964.3},0).wait(1).to({x:1481.2,y:961.35},0).wait(1).to({x:1479.75,y:958.35},0).wait(1).to({x:1478.3,y:955.4},0).wait(1).to({x:1476.85,y:952.4},0).wait(1).to({x:1475.4,y:949.45},0).wait(1).to({x:1473.95,y:946.45},0).wait(1).to({x:1472.5,y:943.5},0).wait(1).to({x:1471.05,y:940.5},0).wait(1).to({x:1469.6,y:937.55},0).wait(1).to({x:1468.15,y:934.55},0).wait(1).to({x:1466.7,y:931.6},0).wait(1).to({x:1465.25,y:928.6},0).wait(1).to({x:1463.8,y:925.65},0).wait(1).to({x:1462.35,y:922.65},0).wait(1).to({x:1460.9,y:919.7},0).wait(1).to({x:1459.45,y:916.7},0).wait(1).to({x:1458,y:913.75},0).wait(1).to({x:1456.55,y:910.75},0).wait(1).to({x:1455.1,y:907.8},0).wait(1).to({x:1453.65,y:904.8},0).wait(1).to({x:1452.2,y:901.85},0).wait(1).to({x:1450.75,y:898.85},0).wait(1).to({x:1449.3,y:895.9},0).wait(1).to({x:1447.9,y:892.9},0).wait(1).to({x:1446.45,y:889.95},0).wait(1).to({x:1445,y:886.95},0).wait(1).to({x:1443.55,y:884},0).wait(1).to({x:1442.1,y:881},0).wait(1).to({x:1440.65,y:878.05},0).wait(1).to({x:1439.2,y:875.05},0).wait(1).to({x:1437.75,y:872.1},0).wait(1).to({x:1436.3,y:869.1},0).wait(1).to({x:1434.85,y:866.15},0).wait(1).to({x:1433.4,y:863.15},0).wait(1).to({x:1431.95,y:860.2},0).wait(1).to({x:1430.5,y:857.2},0).wait(1).to({x:1429.05,y:854.25},0).wait(1).to({x:1427.6,y:851.25},0).wait(1).to({x:1426.15,y:848.3},0).wait(1).to({x:1424.7,y:845.3},0).wait(1).to({x:1423.25,y:842.35},0).wait(1).to({x:1421.8,y:839.35},0).wait(1).to({x:1420.35,y:836.4},0).wait(1).to({x:1418.9,y:833.4},0).wait(1).to({x:1417.45,y:830.45},0).wait(1).to({x:1416,y:827.45},0).wait(1).to({x:1414.55,y:824.5},0).wait(1).to({x:1413.1,y:821.5},0).wait(1).to({x:1411.65,y:818.55},0).wait(1).to({x:1410.2,y:815.55},0).wait(1).to({x:1408.75,y:812.6},0).wait(1).to({x:1407.3,y:809.6},0).wait(1).to({x:1405.85,y:806.65},0).wait(1).to({x:1404.4,y:803.65},0).wait(1).to({x:1402.95,y:800.7},0).wait(1).to({x:1401.5,y:797.7},0).wait(1).to({x:1400.05,y:794.75},0).wait(1).to({x:1398.6,y:791.75},0).wait(1).to({x:1397.15,y:788.8},0).wait(1).to({x:1395.75,y:785.8},0).wait(1).to({x:1394.3,y:782.85},0).wait(1).to({x:1392.85,y:779.85},0).wait(1).to({x:1391.4,y:776.9},0).wait(1).to({x:1389.95,y:773.9},0).wait(1).to({x:1388.5,y:770.95},0).wait(1).to({x:1387.05,y:767.95},0).wait(1).to({x:1385.6,y:765},0).wait(1).to({x:1384.15,y:762},0).wait(1).to({x:1382.7,y:759.05},0).wait(1).to({x:1381.25,y:756.05},0).wait(1).to({x:1379.8,y:753.1},0).wait(1).to({x:1378.35,y:750.1},0).wait(1).to({x:1376.9,y:747.15},0).wait(1).to({x:1375.45,y:744.15},0).wait(1).to({x:1374,y:741.2},0).wait(1).to({x:1372.55,y:738.2},0).wait(1).to({x:1371.1,y:735.25},0).wait(1).to({x:1369.65,y:732.25},0).wait(1).to({x:1368.2,y:729.3},0).wait(1).to({x:1366.75,y:726.3},0).wait(1).to({x:1365.3,y:723.35},0).wait(1).to({x:1363.85,y:720.35},0).wait(1).to({x:1362.4,y:717.4},0).wait(1).to({x:1360.95,y:714.4},0).wait(1).to({x:1359.5,y:711.45},0).wait(1).to({x:1358.05,y:708.45},0).wait(1).to({x:1356.6,y:705.5},0).wait(1).to({x:1355.15,y:702.5},0).wait(1).to({x:1353.7,y:699.55},0).wait(1).to({x:1352.25,y:696.55},0).wait(1).to({x:1350.8,y:693.6},0).wait(1).to({x:1349.35,y:690.6},0).wait(1).to({x:1347.9,y:687.65},0).wait(1).to({x:1346.45,y:684.65},0).wait(1).to({x:1345,y:681.7},0).wait(1).to({x:1343.6,y:678.7},0).wait(1).to({x:1342.15,y:675.75},0).wait(1).to({x:1340.7,y:672.75},0).wait(1).to({x:1339.25,y:669.8},0).wait(1).to({x:1337.8,y:666.8},0).wait(1).to({x:1336.35,y:663.85},0).wait(1).to({x:1334.9,y:660.85},0).wait(1).to({x:1333.45,y:657.9},0).wait(1).to({x:1332,y:654.9},0).wait(1).to({x:1330.55,y:651.95},0).wait(1).to({x:1329.1,y:648.95},0).wait(1).to({x:1327.65,y:646},0).wait(1).to({x:1326.2,y:643},0).wait(1).to({x:1324.75,y:640.05},0).wait(1).to({x:1323.3,y:637.05},0).wait(1).to({x:1321.85,y:634.1},0).wait(1).to({x:1320.4,y:631.1},0).wait(1).to({x:1318.95,y:628.15},0).wait(1).to({x:1317.5,y:625.15},0).wait(1).to({x:1316.05,y:622.2},0).wait(1).to({x:1314.6,y:619.2},0).wait(1).to({x:1313.15,y:616.25},0).wait(1).to({x:1311.7,y:613.25},0).wait(1).to({x:1310.25,y:610.3},0).wait(1).to({x:1308.8,y:607.3},0).wait(1).to({x:1307.35,y:604.35},0).wait(1).to({x:1305.9,y:601.35},0).wait(1).to({x:1304.45,y:598.4},0).wait(1).to({x:1303,y:595.4},0).wait(1).to({x:1301.55,y:592.45},0).wait(1).to({x:1300.1,y:589.45},0).wait(1).to({x:1298.65,y:586.5},0).wait(1).to({x:1297.2,y:583.5},0).wait(1).to({x:1295.75,y:580.55},0).wait(1).to({x:1294.3,y:577.55},0).wait(1).to({x:1292.85,y:574.6},0).wait(1).to({x:1291.45,y:571.6},0).wait(1).to({x:1290,y:568.6},0).wait(1).to({x:1288.55,y:565.65},0).wait(1).to({x:1287.1,y:562.65},0).wait(1).to({x:1285.65,y:559.7},0).wait(1).to({x:1284.2,y:556.7},0).wait(1).to({x:1282.75,y:553.75},0).wait(1).to({x:1281.3,y:550.75},0).wait(1).to({x:1279.85,y:547.8},0).wait(1).to({x:1278.4,y:544.8},0).wait(1).to({x:1276.95,y:541.85},0).wait(1).to({x:1275.5,y:538.85},0).wait(1).to({x:1274.05,y:535.9},0).wait(1).to({x:1272.6,y:532.9},0).wait(1).to({x:1271.15,y:529.95},0).wait(1).to({x:1269.7,y:526.95},0).wait(1).to({x:1268.25,y:524},0).wait(1).to({x:1266.8,y:521},0).wait(1).to({x:1265.35,y:518.05},0).wait(1).to({x:1263.9,y:515.05},0).wait(1).to({x:1262.45,y:512.1},0).wait(1).to({x:1261,y:509.1},0).wait(1).to({x:1259.55,y:506.15},0).wait(1).to({x:1258.1,y:503.15},0).wait(1).to({x:1256.65,y:500.2},0).wait(1).to({x:1255.2,y:497.2},0).wait(1).to({x:1253.75,y:494.25},0).wait(1).to({x:1252.3,y:491.25},0).wait(1).to({x:1250.85,y:488.3},0).wait(1).to({x:1249.4,y:485.3},0).wait(1).to({x:1247.95,y:482.35},0).wait(1).to({x:1246.5,y:479.35},0).wait(1).to({x:1245.05,y:476.4},0).wait(1).to({x:1243.6,y:473.4},0).wait(1).to({x:1242.15,y:470.45},0).wait(1).to({x:1240.7,y:467.45},0).wait(1).to({x:1239.3,y:464.5},0).wait(1).to({x:1237.85,y:461.5},0).wait(1).to({x:1236.4,y:458.55},0).wait(1).to({x:1234.95,y:455.55},0).wait(1).to({x:1233.5,y:452.6},0).wait(1).to({x:1232.05,y:449.6},0).wait(1).to({x:1230.6,y:446.65},0).wait(1).to({x:1229.15,y:443.65},0).wait(1).to({x:1227.7,y:440.7},0).wait(1).to({x:1226.25,y:437.7},0).wait(1).to({x:1224.8,y:434.75},0).wait(1).to({x:1223.35,y:431.75},0).wait(1).to({x:1221.9,y:428.8},0).wait(1).to({x:1220.45,y:425.8},0).wait(1).to({x:1219,y:422.85},0).wait(1).to({x:1217.55,y:419.85},0).wait(1).to({x:1216.1,y:416.9},0).wait(1).to({x:1214.65,y:413.9},0).wait(1).to({x:1213.2,y:410.95},0).wait(1).to({x:1211.75,y:407.95},0).wait(1).to({x:1210.3,y:405},0).wait(1).to({x:1208.85,y:402},0).wait(1).to({x:1207.4,y:399.05},0).wait(1).to({x:1205.95,y:396.05},0).wait(1).to({x:1204.5,y:393.1},0).wait(1).to({x:1203.05,y:390.1},0).wait(1).to({x:1201.6,y:387.15},0).wait(1).to({x:1200.15,y:384.15},0).wait(1).to({x:1198.7,y:381.2},0).wait(1).to({x:1197.25,y:378.2},0).wait(1).to({x:1195.8,y:375.25},0).wait(1).to({x:1194.35,y:372.25},0).wait(1).to({x:1192.9,y:369.3},0).wait(1).to({x:1191.45,y:366.3},0).wait(1).to({x:1190,y:363.35},0).wait(1).to({x:1188.55,y:360.35},0).wait(1).to({x:1187.15,y:357.4},0).wait(1).to({x:1185.7,y:354.4},0).wait(1).to({x:1184.25,y:351.45},0).wait(1).to({x:1182.8,y:348.45},0).wait(1).to({x:1181.35,y:345.5},0).wait(1).to({x:1179.9,y:342.5},0).wait(1).to({x:1178.45,y:339.55},0).wait(1).to({x:1177,y:336.55},0).wait(1).to({x:1175.55,y:333.6},0).wait(1).to({x:1174.1,y:330.6},0).wait(1).to({x:1172.65,y:327.65},0).wait(1).to({x:1171.2,y:324.65},0).wait(1).to({x:1169.75,y:321.7},0).wait(1).to({x:1168.3,y:318.7},0).wait(1).to({x:1166.85,y:315.75},0).wait(1).to({x:1165.4,y:312.75},0).wait(1).to({x:1163.95,y:309.8},0).wait(1).to({x:1162.5,y:306.8},0).wait(1).to({x:1161.05,y:303.85},0).wait(1).to({x:1159.6,y:300.85},0).wait(1).to({x:1158.15,y:297.9},0).wait(1).to({x:1156.7,y:294.9},0).wait(1).to({x:1155.25,y:291.95},0).wait(1).to({x:1153.8,y:288.95},0).wait(1).to({x:1152.35,y:286},0).wait(1).to({x:1150.9,y:283},0).wait(1).to({x:1149.45,y:280.05},0).wait(1).to({x:1148,y:277.05},0).wait(1).to({x:1146.55,y:274.1},0).wait(1).to({x:1145.1,y:271.1},0).wait(1).to({x:1143.65,y:268.15},0).wait(1).to({x:1142.2,y:265.15},0).wait(1).to({x:1140.75,y:262.2},0).wait(1).to({x:1139.3,y:259.2},0).wait(1).to({x:1137.85,y:256.25},0).wait(1).to({x:1136.4,y:253.25},0).wait(1).to({x:1135,y:250.3},0).wait(1).to({x:1133.55,y:247.3},0).wait(1).to({x:1132.1,y:244.35},0).wait(1).to({x:1130.65,y:241.35},0).wait(1).to({x:1129.2,y:238.4},0).wait(1).to({x:1127.75,y:235.4},0).wait(1).to({x:1126.3,y:232.45},0).wait(1).to({x:1124.85,y:229.45},0).wait(1).to({x:1123.4,y:226.5},0).wait(1).to({x:1121.95,y:223.5},0).wait(1).to({x:1120.5,y:220.55},0).wait(1).to({x:1119.05,y:217.55},0).wait(1).to({x:1117.6,y:214.6},0).wait(1).to({x:1116.15,y:211.6},0).wait(1).to({x:1114.7,y:208.65},0).wait(1).to({x:1113.25,y:205.65},0).wait(1).to({x:1111.8,y:202.7},0).wait(1).to({x:1110.35,y:199.7},0).wait(1).to({x:1108.9,y:196.75},0).wait(1).to({x:1107.45,y:193.75},0).wait(1).to({x:1106,y:190.8},0).wait(1).to({x:1104.55,y:187.8},0).wait(1).to({x:1103.1,y:184.85},0).wait(1).to({x:1101.65,y:181.85},0).wait(1).to({x:1100.2,y:178.9},0).wait(1).to({x:1098.75,y:175.9},0).wait(1).to({x:1097.3,y:172.95},0).wait(1).to({x:1095.85,y:169.95},0).wait(1).to({x:1094.4,y:167},0).wait(1).to({x:1092.95,y:164},0).wait(1).to({x:1091.5,y:161.05},0).wait(1).to({x:1090.05,y:158.05},0).wait(1).to({x:1088.6,y:155.1},0).wait(1).to({x:1087.15,y:152.1},0).wait(1).to({x:1085.7,y:149.15},0).wait(1).to({x:1084.25,y:146.15},0).wait(1).to({x:1082.85,y:143.15},0).wait(1).to({x:1081.4,y:140.2},0).wait(1).to({x:1079.95,y:137.2},0).wait(1).to({x:1078.5,y:134.25},0).wait(1).to({x:1077.05,y:131.25},0).wait(1).to({x:1075.6,y:128.3},0).wait(1).to({x:1074.15,y:125.3},0).wait(1).to({x:1072.7,y:122.35},0).wait(1).to({x:1071.25,y:119.35},0).wait(1).to({x:1069.8,y:116.4},0).wait(1).to({x:1068.35,y:113.4},0).wait(1).to({x:1066.9,y:110.45},0).wait(1).to({x:1065.45,y:107.45},0).wait(1).to({x:1064,y:104.5},0).wait(1).to({x:1062.55,y:101.5},0).wait(1).to({x:1061.1,y:98.55},0).wait(1).to({x:1059.65,y:95.55},0).wait(1).to({x:1058.2,y:92.6},0).wait(1).to({x:1056.75,y:89.6},0).wait(1).to({x:1055.3,y:86.65},0).wait(1).to({x:1053.85,y:83.65},0).wait(1).to({x:1052.4,y:80.7},0).wait(1).to({x:1050.95,y:77.7},0).wait(1).to({x:1049.5,y:74.75},0).wait(1).to({x:1048.05,y:71.75},0).wait(1).to({x:1046.6,y:68.8},0).wait(1).to({x:1045.15,y:65.8},0).wait(1).to({x:1043.7,y:62.85},0).wait(1).to({x:1042.25,y:59.85},0).wait(1).to({x:1040.8,y:56.9},0).wait(1).to({x:1039.35,y:53.9},0).wait(1).to({x:1037.9,y:50.95},0).wait(1).to({x:1036.45,y:47.95},0).wait(1).to({x:1035,y:45},0).wait(1).to({x:1033.55,y:42},0).wait(1).to({x:1032.1,y:39.05},0).wait(1).to({x:1030.7,y:36.05},0).wait(1).to({x:1029.25,y:33.1},0).wait(1).to({x:1027.8,y:30.1},0).wait(1).to({x:1026.35,y:27.15},0).wait(1).to({x:1024.9,y:24.15},0).wait(1).to({x:1023.45,y:21.2},0).wait(1).to({x:1022,y:18.2},0).wait(1).to({x:1020.55,y:15.25},0).wait(1).to({x:1019.1,y:12.25},0).wait(1).to({x:1017.65,y:9.3},0).wait(1).to({x:1016.2,y:6.3},0).wait(1).to({x:1014.75,y:3.35},0).wait(1).to({x:1013.3,y:0.35},0).wait(1).to({x:1011.85,y:-2.6},0).wait(1).to({x:1010.4,y:-5.6},0).wait(1).to({x:1008.95,y:-8.55},0).wait(1).to({x:1007.5,y:-11.55},0).wait(1).to({x:1006.05,y:-14.5},0).wait(1).to({x:1004.6,y:-17.5},0).wait(1).to({x:1003.15,y:-20.45},0).wait(1).to({x:1001.7,y:-23.45},0).wait(1).to({x:1000.25,y:-26.4},0).wait(1).to({x:998.8,y:-29.4},0).wait(1).to({x:997.35,y:-32.35},0).wait(1).to({x:995.9,y:-35.35},0).wait(1).to({x:994.45,y:-38.3},0).wait(1).to({x:993,y:-41.3},0).wait(1).to({x:991.55,y:-44.25},0).wait(1).to({x:990.1,y:-47.25},0).wait(1).to({x:988.65,y:-50.2},0).wait(1).to({x:987.2,y:-53.2},0).wait(1).to({x:985.75,y:-56.15},0).wait(1).to({x:984.3,y:-59.15},0).wait(1).to({x:982.85,y:-62.1},0).wait(1).to({x:981.4,y:-65.1},0).wait(1).to({x:979.95,y:-68.05},0).wait(1).to({x:978.55,y:-71.05},0).wait(1).to({x:977.1,y:-74},0).wait(1).to({x:975.65,y:-77},0).wait(1).to({x:974.2,y:-79.95},0).wait(1).to({x:972.75,y:-82.95},0).wait(1).to({x:971.3,y:-85.9},0).wait(1).to({x:969.85,y:-88.9},0).wait(1).to({x:968.4,y:-91.85},0).wait(1).to({x:966.95,y:-94.85},0).wait(1).to({x:965.5,y:-97.8},0).wait(1).to({x:964.05,y:-100.8},0).wait(1).to({x:962.6,y:-103.75},0).wait(1).to({x:961.15,y:-106.75},0).wait(1).to({x:959.7,y:-109.7},0).wait(1).to({x:958.25,y:-112.7},0).wait(1).to({x:956.8,y:-115.65},0).wait(1).to({x:955.35,y:-118.65},0).wait(1).to({x:953.9,y:-121.6},0).wait(1).to({x:952.45,y:-124.6},0).wait(1).to({x:951,y:-127.55},0).wait(1).to({x:949.55,y:-130.55},0).wait(1).to({x:948.1,y:-133.5},0).wait(1).to({x:946.65,y:-136.5},0).wait(1).to({x:945.2,y:-139.45},0).wait(1).to({x:943.75,y:-142.45},0).wait(1).to({x:942.3,y:-145.4},0).wait(1).to({x:940.85,y:-148.4},0).wait(1).to({x:939.4,y:-151.35},0).wait(1).to({x:937.95,y:-154.35},0).wait(1).to({x:936.5,y:-157.3},0).wait(1).to({x:935.05,y:-160.3},0).wait(1).to({x:933.6,y:-163.25},0).wait(1).to({x:932.15,y:-166.25},0).wait(1).to({x:930.7,y:-169.2},0).wait(1).to({x:929.25,y:-172.2},0).wait(1).to({x:927.8,y:-175.15},0).wait(1).to({x:926.4,y:-178.15},0).wait(1).to({x:924.95,y:-181.1},0).wait(1).to({x:923.5,y:-184.1},0).wait(1);
	this.timeline.addTween(_tweenStr_0.to({x:922.05,y:-187.05},0).wait(1).to({x:920.6,y:-190.05},0).wait(1).to({x:919.15,y:-193},0).wait(1).to({x:917.7,y:-196},0).wait(1).to({x:916.25,y:-198.95},0).wait(1).to({x:914.8,y:-201.95},0).wait(1).to({x:913.35,y:-204.9},0).wait(1).to({x:911.9,y:-207.9},0).wait(1).to({x:910.45,y:-210.85},0).wait(1).to({x:909,y:-213.85},0).wait(1).to({x:907.55,y:-216.8},0).wait(1).to({x:906.1,y:-219.8},0).wait(1).to({x:904.65,y:-222.75},0).wait(1).to({x:903.2,y:-225.75},0).wait(1).to({x:901.75,y:-228.7},0).wait(1).to({x:900.3,y:-231.7},0).wait(1).to({x:898.85,y:-234.65},0).wait(1).to({x:897.4,y:-237.65},0).wait(1).to({x:895.95,y:-240.6},0).wait(1).to({x:894.5,y:-243.6},0).wait(1).to({x:893.05,y:-246.55},0).wait(1).to({x:891.6,y:-249.55},0).wait(1).to({x:890.15,y:-252.5},0).wait(1).to({x:888.7,y:-255.5},0).wait(1).to({x:887.25,y:-258.45},0).wait(1).to({x:885.8,y:-261.45},0).wait(1).to({x:884.35,y:-264.4},0).wait(1).to({x:882.9,y:-267.4},0).wait(1).to({x:881.45,y:-270.35},0).wait(1).to({x:880,y:-273.35},0).wait(1).to({x:878.55,y:-276.3},0).wait(1).to({x:877.1,y:-279.3},0).wait(1).to({x:875.65,y:-282.25},0).wait(1).to({x:874.25,y:-285.25},0).wait(1).to({x:872.8,y:-288.25},0).wait(1).to({x:871.35,y:-291.2},0).wait(1).to({x:869.9,y:-294.2},0).wait(1).to({x:868.45,y:-297.15},0).wait(1).to({x:867,y:-300.15},0).wait(1).to({x:865.55,y:-303.1},0).wait(1).to({x:864.1,y:-306.1},0).wait(1).to({x:862.65,y:-309.05},0).wait(1).to({x:861.2,y:-312.05},0).wait(1).to({x:859.75,y:-315},0).wait(1).to({x:858.3,y:-318},0).wait(1).to({x:856.85,y:-320.95},0).wait(1).to({x:855.4,y:-323.95},0).wait(1).to({x:853.95,y:-326.9},0).wait(1).to({x:852.5,y:-329.9},0).wait(1).to({x:851.05,y:-332.85},0).wait(1).to({x:849.6,y:-335.85},0).wait(1).to({x:848.15,y:-338.8},0).wait(1).to({x:846.7,y:-341.8},0).wait(1).to({x:845.25,y:-344.75},0).wait(1).to({x:843.8,y:-347.75},0).wait(1).to({x:842.35,y:-350.7},0).wait(1).to({x:840.9,y:-353.7},0).wait(1).to({x:839.45,y:-356.65},0).wait(1).to({x:838,y:-359.65},0).wait(1).to({x:836.55,y:-362.6},0).wait(1).to({x:835.1,y:-365.6},0).wait(1).to({x:833.65,y:-368.55},0).wait(1).to({x:832.2,y:-371.55},0).wait(1).to({x:830.75,y:-374.5},0).wait(1).to({x:829.3,y:-377.5},0).wait(1).to({x:827.85,y:-380.45},0).wait(1).to({x:826.4,y:-383.45},0).wait(1).to({x:824.95,y:-386.4},0).wait(1).to({x:823.5,y:-389.4},0).wait(1).to({x:822.1,y:-392.35},0).wait(1).to({x:820.65,y:-395.35},0).wait(1).to({x:819.2,y:-398.3},0).wait(1).to({x:817.75,y:-401.3},0).wait(1).to({x:816.3,y:-404.25},0).wait(1).to({x:814.85,y:-407.25},0).wait(1).to({x:813.4,y:-410.2},0).wait(1).to({x:811.95,y:-413.2},0).wait(1).to({x:810.5,y:-416.15},0).wait(1).to({x:809.05,y:-419.15},0).wait(1).to({x:807.6,y:-422.1},0).wait(1).to({x:806.15,y:-425.1},0).wait(1).to({x:804.7,y:-428.05},0).wait(1).to({x:803.25,y:-431.05},0).wait(1).to({x:801.8,y:-434},0).wait(1).to({x:800.35,y:-437},0).wait(1).to({x:798.9,y:-439.95},0).wait(1).to({x:797.45,y:-442.95},0).wait(1).to({x:796,y:-445.9},0).wait(1).to({x:794.55,y:-448.9},0).wait(1).to({x:793.1,y:-451.85},0).wait(1).to({x:791.65,y:-454.85},0).wait(1).to({x:790.2,y:-457.8},0).wait(1).to({x:788.75,y:-460.8},0).wait(1).to({x:787.3,y:-463.75},0).wait(1).to({x:785.85,y:-466.75},0).wait(1).to({x:784.4,y:-469.7},0).wait(1).to({x:782.95,y:-472.7},0).wait(1).to({x:781.5,y:-475.65},0).wait(1).to({x:780.05,y:-478.65},0).wait(1).to({x:778.6,y:-481.6},0).wait(1).to({x:777.15,y:-484.6},0).wait(1).to({x:775.7,y:-487.55},0).wait(1).to({x:774.25,y:-490.55},0).wait(1).to({x:772.8,y:-493.5},0).wait(1).to({x:771.35,y:-496.5},0).wait(1).to({x:769.95,y:-499.45},0).wait(1).to({x:768.5,y:-502.45},0).wait(1).to({x:767.05,y:-505.4},0).wait(1).to({x:765.6,y:-508.4},0).wait(1).to({x:764.15,y:-511.35},0).wait(1).to({x:762.7,y:-514.35},0).wait(1).to({x:761.25,y:-517.3},0).wait(1).to({x:759.8,y:-520.3},0).wait(1).to({x:758.35,y:-523.25},0).wait(1).to({x:756.9,y:-526.25},0).wait(1).to({x:755.45,y:-529.2},0).wait(1).to({x:754,y:-532.2},0).wait(1).to({x:752.55,y:-535.15},0).wait(1).to({x:751.1,y:-538.15},0).wait(1).to({x:749.65,y:-541.1},0).wait(1).to({x:748.2,y:-544.1},0).wait(1).to({x:746.75,y:-547.05},0).wait(1).to({x:745.3,y:-550.05},0).wait(1).to({x:743.85,y:-553},0).wait(1).to({x:742.4,y:-556},0).wait(1).to({x:740.95,y:-558.95},0).wait(1).to({x:739.5,y:-561.95},0).wait(1).to({x:738.05,y:-564.9},0).wait(1).to({x:736.6,y:-567.9},0).wait(1).to({x:735.15,y:-570.85},0).wait(1).to({x:733.7,y:-573.85},0).wait(1).to({x:732.25,y:-576.8},0).wait(1).to({x:730.8,y:-579.8},0).wait(1).to({x:729.35,y:-582.75},0).wait(1).to({x:727.9,y:-585.75},0).wait(1).to({x:726.45,y:-588.7},0).wait(1).to({x:725,y:-591.7},0).wait(1).to({x:723.55,y:-594.65},0).wait(1).to({x:722.1,y:-597.65},0).wait(1).to({x:720.65,y:-600.6},0).wait(1).to({x:719.2,y:-603.6},0).wait(1).to({x:717.8,y:-606.55},0).wait(1).to({x:716.35,y:-609.55},0).wait(1).to({x:714.9,y:-612.5},0).wait(1).to({x:713.45,y:-615.5},0).wait(1).to({x:712,y:-618.45},0).wait(1).to({x:710.55,y:-621.45},0).wait(1).to({x:709.1,y:-624.4},0).wait(1).to({x:707.65,y:-627.4},0).wait(1).to({x:706.2,y:-630.35},0).wait(1).to({x:704.75,y:-633.35},0).wait(1).to({x:703.3,y:-636.3},0).wait(1).to({x:701.85,y:-639.3},0).wait(1).to({x:700.4,y:-642.25},0).wait(1).to({x:698.95,y:-645.25},0).wait(1).to({x:697.5,y:-648.2},0).wait(1).to({x:696.05,y:-651.2},0).wait(1).to({x:694.6,y:-654.15},0).wait(1).to({x:693.15,y:-657.15},0).wait(1).to({x:691.7,y:-660.1},0).wait(1).to({x:690.25,y:-663.1},0).wait(1).to({x:688.8,y:-666.05},0).wait(1).to({x:687.35,y:-669.05},0).wait(1).to({x:685.9,y:-672},0).wait(1).to({x:684.45,y:-675},0).wait(1).to({x:683,y:-677.95},0).wait(1).to({x:681.55,y:-680.95},0).wait(1).to({x:680.1,y:-683.9},0).wait(1).to({x:678.65,y:-686.9},0).wait(1).to({x:677.2,y:-689.85},0).wait(1).to({x:675.75,y:-692.85},0).wait(1).to({x:674.3,y:-695.8},0).wait(1).to({x:672.85,y:-698.8},0).wait(1).to({x:671.4,y:-701.75},0).wait(1).to({x:669.95,y:-704.75},0).wait(1).to({x:668.5,y:-707.7},0).wait(1).to({x:667.05,y:-710.7},0).wait(1).to({x:665.65,y:-713.7},0).wait(1).to({x:664.2,y:-716.65},0).wait(1).to({x:662.75,y:-719.65},0).wait(1).to({x:661.3,y:-722.6},0).wait(1).to({x:659.85,y:-725.6},0).wait(1).to({x:658.4,y:-728.55},0).wait(1).to({x:656.95,y:-731.55},0).wait(1).to({x:655.5,y:-734.5},0).wait(1).to({x:654.05,y:-737.5},0).wait(1).to({x:652.6,y:-740.45},0).wait(1).to({x:651.15,y:-743.45},0).wait(1).to({x:649.7,y:-746.4},0).wait(1).to({x:648.25,y:-749.4},0).wait(1).to({x:646.8,y:-752.35},0).wait(1).to({x:645.35,y:-755.35},0).wait(1).to({x:643.9,y:-758.3},0).wait(1).to({x:642.45,y:-761.3},0).wait(1).to({x:641,y:-764.25},0).wait(1).to({x:639.55,y:-767.25},0).wait(1).to({x:638.1,y:-770.2},0).wait(1).to({x:636.65,y:-773.2},0).wait(1).to({x:635.2,y:-776.15},0).wait(1).to({x:633.75,y:-779.15},0).wait(1).to({x:632.3,y:-782.1},0).wait(1).to({x:630.85,y:-785.1},0).wait(1).to({x:629.4,y:-788.05},0).wait(1).to({x:627.95,y:-791.05},0).wait(1).to({x:626.5,y:-794},0).wait(1).to({x:625.05,y:-797},0).wait(1).to({x:623.6,y:-799.95},0).wait(1).to({x:622.15,y:-802.95},0).wait(1).to({x:620.7,y:-805.9},0).wait(1).to({x:619.25,y:-808.9},0).wait(1).to({x:617.8,y:-811.85},0).wait(1).to({x:616.35,y:-814.85},0).wait(1).to({x:614.9,y:-817.8},0).wait(1).to({x:613.5,y:-820.8},0).wait(1).to({x:612.05,y:-823.75},0).wait(1).to({x:610.6,y:-826.75},0).wait(1).to({x:609.15,y:-829.7},0).wait(1).to({x:607.7,y:-832.7},0).wait(1).to({x:606.25,y:-835.65},0).wait(1).to({x:604.8,y:-838.65},0).wait(1).to({x:603.35,y:-841.6},0).wait(1).to({x:601.9,y:-844.6},0).wait(1).to({x:600.45,y:-847.55},0).wait(1).to({x:599,y:-850.55},0).wait(1).to({x:597.55,y:-853.5},0).wait(1).to({x:596.1,y:-856.5},0).wait(1).to({x:594.65,y:-859.45},0).wait(1).to({x:593.2,y:-862.45},0).wait(1).to({x:591.75,y:-865.4},0).wait(1).to({x:590.3,y:-868.4},0).wait(1).to({x:588.85,y:-871.35},0).wait(1).to({x:587.4,y:-874.35},0).wait(1).to({x:585.95,y:-877.3},0).wait(1).to({x:584.5,y:-880.3},0).wait(1).to({x:583.05,y:-883.25},0).wait(1).to({x:581.6,y:-886.25},0).wait(1).to({x:580.15,y:-889.2},0).wait(1).to({x:578.7,y:-892.2},0).wait(1).to({x:577.25,y:-895.15},0).wait(1).to({x:575.8,y:-898.15},0).wait(1).to({x:574.35,y:-901.1},0).wait(1).to({x:572.9,y:-904.1},0).wait(1).to({x:571.45,y:-907.05},0).wait(1).to({x:570,y:-910.05},0).wait(1).to({x:568.55,y:-913},0).wait(1).to({x:567.1,y:-916},0).wait(1).to({x:565.65,y:-918.95},0).wait(1).to({x:564.2,y:-921.95},0).wait(1).to({x:562.75,y:-924.9},0).wait(1).to({x:561.35,y:-927.9},0).wait(1).to({x:559.9,y:-930.85},0).wait(1).to({x:558.45,y:-933.85},0).wait(1).to({x:557,y:-936.8},0).wait(1).to({x:555.55,y:-939.8},0).wait(1).to({x:554.1,y:-942.75},0).wait(1).to({x:552.65,y:-945.75},0).wait(1).to({x:551.2,y:-948.7},0).wait(1).to({x:549.75,y:-951.7},0).wait(1).to({x:548.3,y:-954.65},0).wait(1).to({x:546.85,y:-957.65},0).wait(1).to({x:545.4,y:-960.6},0).wait(1).to({x:543.95,y:-963.6},0).wait(1).to({x:542.5,y:-966.55},0).wait(1).to({x:541.05,y:-969.55},0).wait(1).to({x:539.6,y:-972.5},0).wait(1).to({x:538.15,y:-975.5},0).wait(1).to({x:536.7,y:-978.45},0).wait(1).to({x:535.25,y:-981.45},0).wait(1).to({x:533.8,y:-984.4},0).wait(1).to({x:532.35,y:-987.4},0).wait(1).to({x:530.9,y:-990.35},0).wait(1).to({x:529.45,y:-993.35},0).wait(1).to({x:528,y:-996.3},0).wait(1).to({x:526.55,y:-999.3},0).wait(1).to({x:525.1,y:-1002.25},0).wait(1).to({x:523.65,y:-1005.25},0).wait(1).to({x:522.2,y:-1008.2},0).wait(1).to({x:520.75,y:-1011.2},0).wait(1).to({x:519.3,y:-1014.15},0).wait(1).to({x:517.85,y:-1017.15},0).wait(1).to({x:516.4,y:-1020.1},0).wait(1).to({x:514.95,y:-1023.1},0).wait(1).to({x:513.5,y:-1026.05},0).wait(1).to({x:512.05,y:-1029.05},0).wait(1).to({x:510.6,y:-1032},0).wait(1).to({x:509.2,y:-1035},0).wait(1).to({x:507.75,y:-1037.95},0).wait(1).to({x:506.3,y:-1040.95},0).wait(1).to({x:504.85,y:-1043.9},0).wait(1).to({x:503.4,y:-1046.9},0).wait(1).to({x:501.95,y:-1049.85},0).wait(1).to({x:500.5,y:-1052.85},0).wait(1).to({x:499.05,y:-1055.8},0).wait(1).to({x:497.6,y:-1058.8},0).wait(1).to({x:496.15,y:-1061.75},0).wait(1).to({x:494.7,y:-1064.75},0).wait(1).to({x:493.25,y:-1067.7},0).wait(1).to({x:491.8,y:-1070.7},0).wait(1).to({x:490.35,y:-1073.65},0).wait(1).to({x:488.9,y:-1076.65},0).wait(1).to({x:487.45,y:-1079.6},0).wait(1).to({x:486,y:-1082.6},0).wait(1).to({x:484.55,y:-1085.55},0).wait(1).to({x:483.1,y:-1088.55},0).wait(1).to({x:481.65,y:-1091.5},0).wait(1).to({x:480.2,y:-1094.5},0).wait(1).to({x:478.75,y:-1097.45},0).wait(1).to({x:477.3,y:-1100.45},0).wait(1).to({x:475.85,y:-1103.4},0).wait(1).to({x:474.4,y:-1106.4},0).wait(1).to({x:472.95,y:-1109.35},0).wait(1).to({x:471.5,y:-1112.35},0).wait(1).to({x:470.05,y:-1115.3},0).wait(1).to({x:468.6,y:-1118.3},0).wait(1).to({x:467.15,y:-1121.25},0).wait(1).to({x:465.7,y:-1124.25},0).wait(1).to({x:464.25,y:-1127.2},0).wait(1).to({x:462.8,y:-1130.2},0).wait(1).to({x:461.35,y:-1133.15},0).wait(1).to({x:459.9,y:-1136.15},0).wait(1).to({x:458.45,y:-1139.15},0).wait(1));

	// Text3
	this.text = new cjs.Text("you", "100px 'Goudy Stout'", "#FFFFFF");
	this.text.lineHeight = 139;
	this.text.lineWidth = 430;
	this.text.parent = this;
	this.text.setTransform(295.5,272.7,0.7431,1.6298);
	this.text._off = true;

	this.timeline.addTween(cjs.Tween.get(this.text).wait(671).to({_off:false},0).wait(49));

	// Text2
	this.text_1 = new cjs.Text("NEeD", "100px 'Goudy Stout'", "#FFFFFF");
	this.text_1.lineHeight = 139;
	this.text_1.lineWidth = 508;
	this.text_1.parent = this;
	this.text_1.setTransform(185.1,134.5,0.7302,1.6251);
	this.text_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.text_1).wait(623).to({_off:false},0).wait(97));

	// Text1
	this.text_2 = new cjs.Text("BUTTERFLIES", "100px 'Goudy Stout'", "#FFFFFF");
	this.text_2.lineHeight = 139;
	this.text_2.lineWidth = 1414;
	this.text_2.parent = this;
	this.text_2.setTransform(29.35,-9.1601,0.6813,1.6479);
	this.text_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.text_2).wait(575).to({_off:false},0).wait(145));

	// Background
	this.instance_2 = new lib.Tween9("synched",0);
	this.instance_2.setTransform(484.75,760.3);

	this.instance_3 = new lib.Tween10("synched",0);
	this.instance_3.setTransform(484.75,-188.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},719).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true,y:-188.7},719).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-561.5,-1819.1,3561.5,3819.1);
// library properties:
lib.properties = {
	id: 'E191522D9A13554183AC8CA48C935F68',
	width: 960,
	height: 640,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/firefly.png", id:"firefly"},
		{src:"images/animate30_atlas_1.png", id:"animate30_atlas_1"},
		{src:"sounds/beautifulblackbirdsinging_2302659.mp3", id:"beautifulblackbirdsinging_2302659"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['E191522D9A13554183AC8CA48C935F68'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
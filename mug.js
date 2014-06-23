    var svgNS = "http://www.w3.org/2000/svg";
	
    function initAnim(evt) {
		svgTag = document.getElementById("mug");
		svgDocument = svgTag.contentDocument;
		svgRoot = svgDocument.documentElement;
		addRotateTransform('mug', 3, 1);
		
		if (typeof svgRoot != "undefined") {
			svgRoot.pauseAnimations();
		}
    }
    
    function addRotateTransform(target_id, speed, direction) {
		var element_to_rotate = svgDocument.getElementById(target_id);
		var my_transform = svgDocument.createElementNS(svgNS, "animateTransform");
		
		var bb = element_to_rotate.getBBox();
		var cx = bb.x + bb.width/2;
		var cy = bb.y + bb.height/2;
		
		my_transform.setAttributeNS(null, "attributeName", "transform");
		my_transform.setAttributeNS(null, "attributeType", "XML");
		my_transform.setAttributeNS(null, "type", "rotate");
		my_transform.setAttributeNS(null, "dur", speed + "s");
		my_transform.setAttributeNS(null, "repeatCount", "indefinite");
		my_transform.setAttributeNS(null, "from", "0 "+cx+" "+cy);
		my_transform.setAttributeNS(null, "to", 360*direction+" "+cx+" "+cy);
		
		element_to_rotate.appendChild(my_transform);
		my_transform.beginElement();
    }
	
	function PlayPause() {
		if (typeof audioInstance == "undefined") {
			audioInstance = createjs.Sound.play("background-4", {loop:-1});
			document.getElementById("status").innerHTML = "Click the mug to tune out";
			
			if (typeof svgRoot != "undefined") {
        		svgRoot.unpauseAnimations();
			}
		} else if (audioInstance.paused) {
			console.log("Resuming");
			audioInstance.resume();
			document.getElementById("status").innerHTML = "Click the mug to tune out";
			
			if (typeof svgRoot != "undefined") {
        		svgRoot.unpauseAnimations();
			}
		} else if (!audioInstance.pause()) {
			console.log("Playing");
        	audioInstance.play({loop:-1});
			document.getElementById("status").innerHTML = "Click the mug to tune out";
			
			if (typeof svgRoot != "undefined") {
        		svgRoot.unpauseAnimations();
			}
		} else {
			console.log("Pausing");
			document.getElementById("status").innerHTML = "Click the mug to listen";
			
			if (typeof svgRoot != "undefined") {
        		svgRoot.pauseAnimations();
			}
		}
	}
 	
    function initSound() {
		createjs.FlashPlugin.swfPath = "../js/soundjs/";
		createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
  
        var manifest = [
//			{id:"background-1", src:"background-1.ogg"},
//			{id:"background-2", src:"background-2.ogg"},
//			{id:"background-3", src:"background-3.ogg"},
			{id:"background-4", src:"background-4.ogg"}
        ];
 
        createjs.Sound.registerManifest(manifest);
 		createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.addEventListener("fileload", handleLoad);
        createjs.Sound.registerManifest(manifest);
		
		initAnim();
    } 
 
    function handleLoad(event) {
		if (typeof svgRoot != "undefined") {
        	svgRoot.getElementById("mug").addEventListener("click", PlayPause, false);
			document.getElementById("status").innerHTML = "Click the mug to listen";
		} else {
			document.getElementById("status").innerHTML = "Close the tab to tune out";
			audioInstance = createjs.Sound.play("background-4", {loop:-1});
		}
    }
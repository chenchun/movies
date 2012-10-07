var SFX = function(loaded) {

  var buffer, _this = this;

  try {

    var context = new (window.AudioContext || window.webkitAudioContext)();

    var request = new XMLHttpRequest();
    request.open('GET', 'chrome500/pop.mp3', true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      context.decodeAudioData(request.response, function(b) {
        buffer = b;
        loaded();
      }, onError);
    };

    request.send();


    this.pop = function(t) {
      var source = context.createBufferSource(); // creates a sound source
      source.playbackRate.value = Math.pow(Math.random(), 2)*0.9 + 0.25;
      source.gain.value = 0.4;
      source.buffer = buffer;                    // tell the source which sound to play
      source.connect(context.destination);       // connect the source to the context's destination (the speakers)
      source.noteOn(t || 0);                          // play the source now
    };


  } catch(e) {

    onError();

  }

  function onError() {

    loaded();
    
    _this.pop = function() {

    };

  }
  
};

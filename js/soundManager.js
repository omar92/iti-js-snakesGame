var SoundManager = {};
SoundManager.initialiased = false;
SoundManager.SOUNDS = {
  COLLISION: "collesion"
};
SoundManager.soundsInistants = [];
SoundManager.init = function(onInit) {
  SoundManager.soundsInistants[SoundManager.SOUNDS.COLLISION] = game.add.audio(
    SoundManager.SOUNDS.COLLISION
  );
  game.sound.setDecodedCallback(
    SoundManager.soundsInistants,
    function(params) {
      SoundManager.initialiased = true;
      onInit();
    },
    this
  );
};

SoundManager.playSound = function(sound) {
  if (SoundManager.initialiased)
    if (SoundManager.soundsInistants[sound])
      SoundManager.soundsInistants[sound].play();
};

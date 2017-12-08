var SoundManager = {};
SoundManager.initialiased = false;
SoundManager.SOUNDS = {
  COLLISION: "collesion",
  BG: "bgSound"

};
SoundManager.soundsInistants = [];
SoundManager.init = function(onInit) {

  for (const key in SoundManager.SOUNDS) {
    if (SoundManager.SOUNDS.hasOwnProperty(key)) {
      const id = SoundManager.SOUNDS[key];
      SoundManager.soundsInistants[id] = game.add.audio(id);
    }
  }
  game.sound.setDecodedCallback(
    SoundManager.soundsInistants,
    function(params) {
      SoundManager.initialiased = true;
      onInit();
    },
    this
  );
};

SoundManager.playSound = function(sound, isRepeat) {
  isRepeat = isRepeat || false;
  if (SoundManager.initialiased)
    if (SoundManager.soundsInistants[sound]) {
      SoundManager.soundsInistants[sound].play();
      if (isRepeat) {
        SoundManager.soundsInistants[sound].loopFull();
      }
    }

};

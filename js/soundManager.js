var SoundManager = {};
SoundManager.initialiased = false;
SoundManager.SOUNDS = {
    COLLISION: "collesion",
    BG: "bgSound"

};
SoundManager.soundsInistants = [];
SoundManager.init = function(onInit) {
    for (let index = 0; index < SoundManager.SOUNDS.length; index++) {
        SoundManager.soundsInistants[SoundManager.SOUNDS[index]] = game.add.audio(
            SoundManager.SOUNDS[index]
        );
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
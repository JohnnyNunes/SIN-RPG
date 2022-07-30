Scene_Map.prototype.stopAudioOnBattleStart = function() {
    if (!AudioManager.isCurrentBgm($gameSystem.battleBgm())) {
        AudioManager.stopBgm();
    }
    AudioManager.stopMe();
    AudioManager.stopSe();
};

BattleManager.playBattleBgm = function() {
    AudioManager.playBgm($gameSystem.battleBgm());
};
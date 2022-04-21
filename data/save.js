class Save {
    constructor() {
        this.saveFile = null;
        this.saveObj = null;
        this.oldSaveObj = null;
        this.currentCharacter = null;
        this.previousCharacter = null;
        this.unknownPerks = [];
        this.CharacterChanged = new EventHandler();
        this.SaveLoaded = new EventHandler();

        Object.defineProperty(this, 'character', {
            get() { return this.currentCharacter },
            set(value) {
                let oldChar = this.currentCharacter?.key;

                this.currentCharacter = value;

                if (!oldChar) {
                    oldChar = this.currentCharacter.key;
                }
                else {
                    this.previousCharacter = this.saveObj.characters[oldChar];
                }

                this.CharacterChanged.invoke('charchanged', { oldChar: oldChar });
            }
        });
    }
}
class Save {
    constructor() {
        this.saveFile = null;
        this.saveObj = {};
        this._char = null;
        this.charChanged = new EventEmitter();


        Object.defineProperty(this, 'character', {
            get() { return this._char },
            set(value) {
                this._char = value;
                this.charChanged.dispatch('charchanged');
            }
        });


        //this.character = {
        //    obj: null,
        //    emmitter: new EventEmitter(),
        //    get character() { return this },
        //    set character(value) {
        //        this.obj = value;
        //        this.emmitter.dispatch('charchanged');
        //    }
        //};
    }
}

const charChanged = new Event('charchanged');
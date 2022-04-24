// ko is cool, but it feels old and is finicky,
// still, a lot better than whatever the hell i was doing before and opens up more potential stuff

var ViewModel = function (data) {
    var self = this;

    ko.mapping.fromJS(data, {}, self);

    self.selectedCharacter = ko.observable();

    self.chars = ko.computed(function () {
        return Object.keys(self.characters).map(key => ({
            name: key,
            obj: self.characters[key]
        }))
    }, self);

    self.isPC = ko.computed(function () {
        return self.selectedCharacter() && self.selectedCharacter().name == 'PC';
    }, self);
    
    self.getGlobal = function (path) {
        var obj = globalKeys;
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            obj = obj[path[i]];
        };
        return obj;
    };

    self.isEnabled = ko.observable(false);

    self.nameChanged = function (data, event) {
        const char = self.selectedCharacter().obj;
        const name = event.target.value;

        if (char.uniqueName() !== null && char.uniqueName() !== undefined) {
            char.uniqueName(name);
        }
        if (self.isPC()) {
            self.gameInstanceInfo.name(name);
            const mailObj = self.mailState.mails;
            for (const [key] of Object.entries(mailObj)) {
                const mail = mailObj[key];
                if (mail.hasOwnProperty('ToCache')) {
                    mail['ToCache'] = name + ' Steele';
                }
            }
        }
    }

    self.emailChanged = function (data, event) {
        const email = event.target.value;
        const mailObj = self.mailState.mails;

        for (const [key] of Object.entries(mailObj)) {
            const mail = mailObj[key];
            if (mail.hasOwnProperty('ToAddressCache')) {
                mail['ToAddressCache'] = email + '@SteeleTech.corp';
            }
        }
    }
}

class StorageClass {
    constructor() {
        this.classInstance = "StorageClass";
        this.combatOnly = false;
        this.hidden = true;
        this.iconName = "";
        this.iconShade = "var(--textColor)";
        this.minutesLeft = 0;
        this.neverSerialize = false;
        this.storageName = "";
        this.toolTip = "";
        this.value1 = 0;
        this.value2 = 0;
        this.value3 = 0;
        this.value4 = 0;
        this.version = 1;
    }
}
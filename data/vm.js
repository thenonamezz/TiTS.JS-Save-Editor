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

    //self.getPerks = ko.computed(function () {
    self.getPerks = function () {
        if (self.selectedCharacter()) {
            // even though the objects look the same, due to reference the char perks dont get counted as "owned" by the character,
            // this fixes that AND adds any perks that are not present/stored internally in the editor data

            let perks = null;
            //let perksInternal = self.perksInternal;
            let perksInternal = ko.mapping.fromJS(Perks); // reference eats perks
            let perksChar = self.selectedCharacter().obj.perks;

            for (var i = 0; i < perksChar().length; i++) {
                perksInternal.remove(function (perk) {
                    return perk.storageName() === perksChar()[i].storageName();
                });
            }

            perks = ko.observableArray(perksChar().concat(perksInternal())).sorted(function (l, r) {
                return l.storageName() === r.storageName() ? 0
                    : l.storageName() < r.storageName() ? -1
                    : 1;
            });

            //self.unknownPerks(perksChar().filter(p => !perksInternal().includes(p)));

            return perks;
        }
    }

    self.hasPerk = function (data) {
        return self.selectedCharacter().obj.perks().includes(data);
    }

    //self.unknownPerks = ko.observableArray();

    //self.perksInternal = ko.mapping.fromJS(Perks);

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

    self.validateNumberInput = function (data, event) {
        const input = event.target;
        const type = !!input.pattern ? 'int' : 'float';
        const val = type === 'int' ? parseInt(event.target.value) : parseFloat(event.target.value);
        input.value = !isNaN(val) ? val : '';

        if (input.value !== '' && !isNaN(input.value)) {
            const min = parseFloat(input.min);
            const max = parseFloat(input.max);

            if (!isNaN(min) && input.value < min) {
                input.value = min;
                alert('Value must be greater than or equal to ' + min);
            }
            if (!isNaN(max) && input.value > max) {
                input.value = max;
                alert('Value must be less than or equal to ' + max);
            }
        }
        else {
            input.value = !isNaN(parseFloat(input.min)) ? +input.min : 0;
            alert(type === 'int' ? 'Value must be an integer (whole number)' : 'Value must be a number');
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

    self.getPenisName = function (index) {
        const i = self.selectedCharacter().obj.cocks()[index()];
        const color = i.cockColor();
        const len = +i.cLengthRaw() + +i.cLengthMod();
        const type = globalKeys.BodyType.find(t => t.value == i.cType()).name.toLowerCase();
        return 'a ' + color + ' ' + len + '" ' + type + ' penis';
    }

    self.getVaginaName = function (index) {
        const i = self.selectedCharacter().obj.vaginas()[index()];
        const color = i.vaginaColor();
        const type = globalKeys.BodyType.find(t => t.value == i.type()).name.toLowerCase();
        return 'a ' + color + ' ' + type + ' vagina';
    }

    self.getBreastName = function (index) {
        return 'A';
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
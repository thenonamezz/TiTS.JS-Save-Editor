class Binding {
    constructor(key, obj = null, valueType = null, pcOnly = false) {
        this.obj = obj;
        this.key = key;
        this.valueType = valueType;
        this.bindingType = BindingType.Global;
        this.pcOnly = pcOnly;
    }
}

class CharacterBinding extends Binding {
    constructor(key, valueType = null, obj = null) {
        super(key, obj);
        this.valueType = valueType;
        this.bindingType = BindingType.Character;
    }
}

function resolveBinding(binding, input, onChanged) {
    switch (binding.bindingType) {
        case BindingType.Global:
            resolveGlobalBinding(binding.obj, binding.key, input, binding.valueType, binding.pcOnly);
            break;

        case BindingType.Character:
            resolveCharacterBinding(binding.key, input, binding.valueType, binding.obj);
            break;

        default:
            resolveFlagBinding(binding.key, input, binding.obj);
            break;
    }

    input.addEventListener('change', (e) => {
        if (onChanged) {
            onChanged(e.target.value);
        }

        if (!window.onbeforeunload) {
            window.onbeforeunload = () => false;
        }
    });
}

function resolveCharacterBinding(key, input, valueType, obj) {
    if (save) {
        save.CharacterChanged.listen('charchanged', (e) => {
            if (save.previousCharacter) {
                // If the property exists, reset it to a normal value with no get/set, if it's undefined it means it's looking
                // at something that's only available to PC (like xpraw). If a property that doesn't originally exist in
                // a character is defined with this method everything blows up when switching active character.

                const object = obj == null ? save.saveObj.characters[e.oldChar] : save.saveObj.characters[e.oldChar][obj];

                if (object[key] != undefined) {
                    Object.defineProperty(object, key, {
                        value: convertValue(input, valueType)
                    });
                }
            }

            const object = obj == null ? save.character.obj : save.character.obj[obj];

            const initialValue = object[key];

            if (initialValue != undefined) {
                Object.defineProperty(object, key, {
                    get() { return convertValue(input, valueType); },
                    set(value) { setInput(input, value) }
                });

                object[key] = initialValue;

                if (input.getAttribute('disabled')) {
                    input.removeAttribute('disabled');
                    input.title = '';
                }
            }
            else {
                input.value = '';
                input.setAttribute('disabled', true);
                input.title = 'Not available for this character.';
            }
        });
    }
    else {
        throw new Error('Save object not initialized');
    }
}

function resolveGlobalBinding(obj, key, input, valueType, pcOnly = false) {
    if (save) {
        save.SaveLoaded.listen('saveloaded', () => {
            const object = obj === '.' ? save.saveObj : save.saveObj[obj];

            const initialValue = object[key];

            Object.defineProperty(object, key, {
                get() { return convertValue(input, valueType); },
                set(value) { setInput(input, value) }
            });

            object[key] = initialValue;

            if (input.getAttribute('disabled')) {
                input.removeAttribute('disabled');
                input.title = '';
            }

            save.CharacterChanged.listen('charchanged', () => {
                if (pcOnly && save.character.key != 'PC') {
                    input.setAttribute('disabled', true);
                    input.title = 'Not available for this character.';
                }
            })
        });
    }
    else {
        throw new Error('Save object not initialized');
    }
}

function resolveFlagBinding(key, container, obj) {
    if (save) {
        save.CharacterChanged.listen('charchanged', (e) => {
            if (save.previousCharacter) {
                // If the property exists, reset it to a normal value with no get/set, if it's undefined it means it's looking
                // at something that's only available to PC (like xpraw). If a property that doesn't originally exist in
                // a character is defined with this method everything blows up when switching active character.

                const object = obj == null ? save.saveObj.characters[e.oldChar] : save.saveObj.characters[e.oldChar][obj];

                if (object[key] != undefined) {
                    Object.defineProperty(object, key, {
                        value: getSelectedFlags(container)
                    });
                }
            }

            const object = obj == null ? save.character.obj : save.character.obj[obj];

            const initialValue = object[key];

            Object.defineProperty(object, key, {
                get() { return getSelectedFlags(container); },
                set(values) { setSelectedFlags(container, values); }
            });

            object[key] = initialValue;

            const inputs = $(container).find('.form-check-input');
            inputs.each(function () {
                if ($(this).attr('disabled')) {
                    $(this).removeAttr('disabled');
                }
            });
        });
    }
    else {
        throw new Error('Save object not initialized');
    }
}

//all chars have their own independent perks
function resolvePerkBinding(container) {
    if (save) {
        save.CharacterChanged.listen('charchanged', (e) => {
            if (save.previousCharacter) {
                Object.defineProperty(save.saveObj.characters[e.oldChar], 'perks', {
                    value: getSelectedPerks(container)
                });
            }

            const initialValue = save.character.obj.perks;

            Object.defineProperty(save.character.obj, 'perks', {
                get() { return getSelectedPerks(container); },
                set(perks) { setSelectedPerks(container, perks); }
            });

            save.character.obj.perks = initialValue;

            const inputs = $(container).find('.form-check-input');
            inputs.each(function () {
                let input = $(this);
                if (input.attr('disabled')) {
                    input.removeAttr('disabled');
                }

                input.parent().siblings('.perk-values-container').children().each(function () {
                    if ($(this).attr('disabled')) {
                        $(this).removeAttr('disabled');
                    }
                });
            });
        });
    }
    else {
        throw new Error('Save object not initialized');
    }
}

function getSelectedPerks(container) {
    let perks = [];
    $(container).find('.form-check-input').filter(':checked').each(function () {
        let perk = Perks.find(p => p.storageName === $(this).val());
        if (perk) {
            $(this).parent().siblings('.perk-values-container').children().each(function (index) {
                perk['value' + (index + 1)] = +$(this).val();
            });
            perks.push(perk);
        }
    })

    // for now until all perks are stabilized
    return perks.concat(save.unknownPerks);
}

function setSelectedPerks(container, charPerks) {
    const inputs = $(container).find('.form-check-input');
    let boundPerks = [];

    inputs.each(function () {
        let input = $(this);
        let perk = charPerks.find(p => p.storageName === input.val());

        if (perk) {
            input.prop('checked', true);
            input.parent().siblings('.perk-values-container').children().each(function (index) {
                $(this).val(+perk['value' + (index + 1)]);
            });
            boundPerks.push(perk);
        }
    });

    // for now until all perks are stabilized
    save.unknownPerks = charPerks.filter((c) => !boundPerks.includes(c));
}


function getSelectedFlags(container) {
    let flags = [];
    $(container).find('.form-check-input').filter(':checked').each(function () { flags.push(+$(this).val()) });
    return flags;
}

function setSelectedFlags(container, values) {
    const inputs = $(container).find('.form-check-input');
    inputs.each(function () { $(this).prop('checked', values.includes(+$(this).val())) });
}

//the game should be able to parse strings as numbers just fine but just in case
function convertValue(input, type) {
    let value;
    switch (type) {
        case ValueType.Integer:
        case ValueType.Float:
            value = +input.value;
            break;

        case ValueType.Boolean:
            value = input.checked;
            break;

        default:
            value = input.value;
            break;
    }
    return value
}

function setInput(input, value) {
    switch (input.type) {
        case 'checkbox':
            input.checked = value;
            break;

        default:
            input.value = value;
            break;
    }
}

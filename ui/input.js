class Field {
    constructor() {
        this.content = document.createElement('div');
        this.content.className = 'text-light my-3';

        this.label = document.createElement('label');
        this.label.className = 'label-sm';

        this.inputWrapper = document.createElement('div');
        this.inputWrapper.className = 'input-group input-group-sm';
        this.input = document.createElement('input');
        this.input.className = 'form-control form-control-sm';
        this.input.setAttribute('disabled', true);
        this.inputWrapper.appendChild(this.input);

        this.content.appendChild(this.label);
        this.content.appendChild(this.inputWrapper);
    }

    resolveLabel(key, label) {
        //this.input.id = 'editField-' + key;
        this.select && (this.select.id = 'editField-' + key);
        this.label.innerText = label;
        //this.label.htmlFor = this.input.id;
    }

    resolveSuffix(text) {
        const suffix = document.createElement('span');
        suffix.className = 'input-group-text';
        suffix.textContent = text;
        this.input.className += ' form-control-suffix';
        this.inputWrapper.appendChild(suffix);
    }
}

class TextField extends Field {
    constructor(obj, key, label, suffixText = null, onChanged = null, pcOnly = false) {
        super();
        this.content.className += ' editor-text';

        this.input.type = 'text';
        this.input.dataset.bind = 'textInput: ' + obj + (obj ? '.' : '') + key + ', enable: $root.isEnabled';
        if (pcOnly) {
            this.input.dataset.bind += ' && $root.isPC';
        }
        if (onChanged) {
            this.input.dataset.bind += ', event: { change: ' + onChanged + ' }'
        }

        this.label.innerText = label;
        this.resolveLabel(key, label);

        if (suffixText) {
            this.resolveSuffix(suffixText);
        }

        return this.content;
    }
}

class IntegerField extends Field {
    constructor(obj, key, label, suffixText = null, min = null, max = null, onChanged = null, pcOnly = false) {
        super();
        this.content.className += ' editor-integer';

        this.input.type = 'number';
        this.input.step = 1;
        this.input.pattern = '\d*';
        if (!isNaN(parseFloat(min))) {
            this.input.min = min;
        }
        if (!isNaN(parseFloat(max))) {
            this.input.max = max;
        }

        this.input.dataset.bind = 'numberInput: ' + obj + (obj ? '.' : '') + key + ', enable: $root.isEnabled';
        if (pcOnly) {
            this.input.dataset.bind += ' && $root.isPC';
        }

        this.input.dataset.bind += ', event: { change: $root.' + (onChanged ? onChanged : 'validateNumberInput') + ' }';

        this.label.innerText = label;
        this.resolveLabel(key, label);

        if (suffixText) {
            this.resolveSuffix(suffixText);
        }

        return this.content;
    }
}

class FloatField extends Field {
    constructor(obj, key, label, suffixText = null, min = null, max = null, onChanged = null, pcOnly = false) {
        super();
        this.content.className += ' editor-float';

        this.input.type = 'number';
        this.input.step = 'any';
        if (!isNaN(parseFloat(min))) {
            this.input.min = min;
        }
        if (!isNaN(parseFloat(max))) {
            this.input.max = max;
        }

        this.input.dataset.bind = 'numberInput: ' + obj + (obj ? '.' : '') + key + ', enable: $root.isEnabled';
        if (pcOnly) {
            this.input.dataset.bind += ' && $root.isPC';
        }

        this.input.dataset.bind += ', event: { change: $root.' + (onChanged ? onChanged : 'validateNumberInput') + ' }';

        this.label.innerText = label;
        this.resolveLabel(key, label);

        if (suffixText) {
            this.resolveSuffix(suffixText);
        }

        return this.content;
    }
}

class SelectField extends Field {
    constructor(path, obj, key, label, onChanged = null, pcOnly = false) {
        super();
        this.content.className += ' editor-select';

        this.label.innerText = label;
        this.resolveLabel(key, label);

        this.select = document.createElement('select');
        this.select.className = 'form-select form-select-sm';
        this.select.dataset.bind = `options: $root.getGlobal("` + path + `"),
                                    optionsText: 'name',
                                    optionsValue: 'value',
                                    value: ` + obj + (obj ? '.' : '') + key + `,
                                    enable: $root.isEnabled`;
        if (pcOnly) {
            this.input.dataset.bind += ' && $root.isPC';
        }
        if (onChanged) {
            this.input.dataset.bind += ', event: { change: ' + onChanged + ' }'
        }

        this.select.setAttribute('disabled', true);
        this.select.value = '-999';
        this.inputWrapper.replaceChild(this.select, this.input);

        return this.content;
    }
}

class SwitchField extends Field {
    constructor(obj, key, label, onChanged = null, pcOnly = false) {
        super();
        this.content.className += ' editor-switch';

        this.inputWrapper.className = 'form-check form-switch';

        this.input.type = 'checkbox';
        this.input.role = 'switch';
        this.input.className = 'form-check-input';

        this.input.dataset.bind = 'checked: ' + obj + (obj ? '.' : '') + key + ', enable: $root.isEnabled';
        if (pcOnly) {
            this.input.dataset.bind += ' && $root.isPC';
        }
        if (onChanged) {
            this.input.dataset.bind += ', event: { change: ' + onChanged + ' }'
        }

        this.label.innerText = label;
        this.label.className += ' form-check-label';
        this.inputWrapper.appendChild(this.label);

        return this.content;
    }
}

class FlagField {
    constructor(path, obj, key, label, onChanged = null, pcOnly = false) {
        const expanded = true;

        this.content = document.createElement('div');
        this.content.className = 'accordion text-light my-3 w-100 pt-2 editor-flag';
        this.content.id = 'editFlag-' + key;

        this.item = document.createElement('div');
        this.item.className = 'accordion-item';
        this.header = document.createElement('h6');
        this.header.className = 'accordion-header';
        this.header.id = this.content.id + '-header';

        this.button = document.createElement('button');
        this.button.className = 'accordion-button' + (expanded ? '' : ' collapsed');
        this.button.type = 'button';
        this.button.setAttribute('data-bs-toggle', 'collapse');
        this.button.setAttribute('aria-expanded', expanded);
        this.button.textContent = label;

        this.bodyContainer = document.createElement('div');
        this.bodyContainer.className = 'accordion-collapse collapse' + (expanded ? ' show' : '');
        this.bodyContainer.setAttribute('aria-labelledby', '#' + this.header.id);
        this.bodyContainer.setAttribute('data-bs-parent', '#' + this.header.id);
        this.bodyContainer.id = this.content.id + '-body';

        this.button.setAttribute('aria-controls', this.bodyContainer.id);
        this.button.setAttribute('data-bs-target', '#' + this.bodyContainer.id);

        this.body = document.createElement('div');
        this.body.className = 'accordion-body d-flex flex-wrap';
        this.body.dataset.bind = 'foreach: $root.getGlobal("' + path + '")';

        const container = document.createElement('div');
        container.className = 'form-check form-switch flag-switch-row';

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.role = 'switch';
        checkBox.className = 'form-check-input';
        checkBox.setAttribute('disabled', true);
        checkBox.dataset.bind = `checked: $parent.` + obj + (obj ? '.' : '') + key + `,
                                 checkedValue: $data.value,
                                 enable: $root.isEnabled`;
        if (pcOnly) {
            checkBox.dataset.bind += ' && $root.isPC';
        }
        if (onChanged) {
            checkBox.dataset.bind += ', event: { change: ' + onChanged + ' }'
        }

        const chkLabel = document.createElement('label');
        chkLabel.className = 'form-check-label label-sm';
        chkLabel.dataset.bind = 'text: name';

        container.appendChild(checkBox);
        container.appendChild(chkLabel);

        this.body.appendChild(container);

        this.header.appendChild(this.button);
        this.bodyContainer.appendChild(this.body);

        this.item.appendChild(this.header);
        this.item.appendChild(this.bodyContainer);

        this.content.appendChild(this.item);

        return this.content;
    }
}

class ArrayField {
    constructor(obj, key, nameFunc, deleteFunc, fields) {
        const keyDisplayText = key.replace('(', '').replace(')', '');

        this.content = document.createElement('div');
        this.content.id = keyDisplayText + '-accordion'
        this.content.dataset.bind = 'foreach: ' + obj + (obj ? '.' : '') + key;
        this.content.className = 'text-light my-3 w-100 editor-array';

        this.item = document.createElement('div');
        this.item.className = 'accordion-item';
        this.header = document.createElement('h6');
        this.header.className = 'accordion-header';

        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.setAttribute('data-bs-toggle', 'collapse');
        this.button.setAttribute('aria-expanded', false);
        this.button.dataset.bind = `text: $root.` + nameFunc + `($index),
                                    class: 'accordion-button' + ($index() === 0 ? '' : ' collapsed'),
                                    attr: { 'data-bs-target': '#accordion-body-` + keyDisplayText + `-' + $index() }`;

        this.bodyContainer = document.createElement('div');
        this.bodyContainer.setAttribute('data-bs-parent', '#' + keyDisplayText + '-accordion');
        this.bodyContainer.dataset.bind = `attr: { id: 'accordion-body-` + keyDisplayText + `-' + $index() },
                                           class: 'accordion-collapse collapse' + ($index() === 0 ? ' show' : '')`;

        this.body = document.createElement('div');
        this.body.className = 'accordion-body';
        const rbContainer = document.createElement('div');
        rbContainer.className = 'd-flex justify-content-end';
        const removeButton = document.createElement('button');
        removeButton.innerHTML = 'Remove <i class="fa-solid fa-trash"></i>';
        removeButton.type = 'button';
        removeButton.disabled = true;
        removeButton.className = 'btn btn-danger btn-sm';
        removeButton.dataset.bind = 'click: $root.' + deleteFunc + ', enable: $root.isEnabled';
        rbContainer.appendChild(removeButton);
        this.body.appendChild(rbContainer);

        fields[0].className += ' mt-0';

        fields.forEach(f => {
            this.body.appendChild(f);
        });

        this.header.appendChild(this.button);
        this.bodyContainer.appendChild(this.body);

        this.item.appendChild(this.header);
        this.item.appendChild(this.bodyContainer);

        this.content.appendChild(this.item);

        return this.content;
    }
}

class PerkField {
    constructor(obj, key) {
        this.content = document.createElement('div');
        this.content.className = 'text-light my-3 w-100 editor-perk';
        this.content.dataset.bind = 'foreach: $root.internal_perks()';

        const container = document.createElement('div');
        container.className = 'form-check form-switch mt-5';

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.role = 'switch';
        checkBox.className = 'form-check-input perk-switch';
        checkBox.setAttribute('disabled', true);
        checkBox.dataset.bind = `checked: $root.` + obj + (obj ? '.' : '') + key + `,
                                 checkedValue: $data,
                                 enable: $root.isEnabled`;
        //if (onChanged) {
        //    checkBox.dataset.bind += ', event: { change: ' + onChanged + ' }'
        //}

        const chkLabel = document.createElement('label');
        chkLabel.className = 'form-check-label';
        chkLabel.dataset.bind = 'text: storageName';

        const perkDescription = document.createElement('p');
        perkDescription.dataset.bind = "text: $data.toolTip, class: $root.hasPerk($data) ? '' : 'text-muted' ";

        const valueContainer = document.createElement('div');
        valueContainer.dataset.bind = 'visible: $root.hasPerk($data)';
        for (var i = 1; i < 5; i++) {
            var div = document.createElement('div');

            var label = document.createElement('label');
            label.className = 'label-sm';
            label.textContent = 'Value ' + i;

            var inputWrapper = document.createElement('div');
            inputWrapper.className = 'input-group input-group-sm';
            var input = document.createElement('input');
            input.className = 'form-control form-control-sm';
            input.setAttribute('disabled', true);
            input.dataset.bind = 'value: $data.value' + i + ' , enable: $root.isEnabled';
            inputWrapper.appendChild(input);

            div.appendChild(label);
            div.appendChild(inputWrapper);

            valueContainer.appendChild(div);
        }

        container.appendChild(checkBox);
        container.appendChild(chkLabel);

        this.content.appendChild(container);
        this.content.appendChild(perkDescription);
        this.content.appendChild(valueContainer);

        return this.content;
    }
}

class FlagContainer {
    constructor() {
        this.root = document.createElement('div');

        this.body = document.createElement('div');
        //this.body = document.createElement('table');
        this.body.dataset.bind = 'keyvalue: $root.getFlags()';

        //this.flagItem = document.createElement('tr');
        this.flagItem = document.createElement('div');
        this.flagItem.className = 'row g-0';

        this.row = document.createElement('tr');

        //this.flagNameContainer = document.createElement('td');
        this.flagNameContainer = document.createElement('div');
        this.flagNameContainer.className = 'col-6';
        this.flagNameContainer.dataset.bind = 'text: key';
        //this.flagName = document.createElement('p');
        //this.flagName.dataset.bind = 'text: key';
        //this.flagNameContainer.appendChild(this.flagName);

        //this.flagValueContainer = document.createElement('td');
        this.flagValueContainer = document.createElement('div');
        this.flagValueContainer.className = 'col-6';
        this.flagValue = document.createElement('input');
        this.flagValue.type = 'text';
        this.flagValue.className = 'form-control form-control-sm';
        //this.flagValue.disabled = true;
        //this.flagValue.dataset.bind = 'value: value, enable: $root.isEnabled';
        this.flagValue.dataset.bind = 'value: value';
        this.flagValueContainer.appendChild(this.flagValue);

        this.flagItem.appendChild(this.flagNameContainer);
        this.flagItem.appendChild(this.flagValueContainer);

        //this.flagItem.appendChild(this.row);
        //this.flagItem.appendChild(this.flagNameContainer);
        //this.flagItem.appendChild(this.flagValueContainer);

        this.body.appendChild(this.flagItem);
        this.root.appendChild(this.body);

        return this.root;

        //this.root = document.createElement('div');

        //this.body = document.createElement('div');
        //this.body.dataset.bind = 'foreach: $root.getFlags()';

        //this.flagName = document.createElement('p');
        //this.flagName.dataset.bind = 'text: $data';

        //this.body.appendChild(this.flagName);
        //this.root.appendChild(this.body);

        //return this.root;
    }
}
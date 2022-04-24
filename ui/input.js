class Field {
    constructor() {
        this.content = document.createElement('div');
        this.content.className = 'text-light my-3 w-100';

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
        this.input.id = 'editField-' + key;
        this.select && (this.select.id = 'editField-' + key);
        this.label.innerText = label;
        this.label.htmlFor = this.input.id;
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
        this.input.dataset.bind = 'value: ' + obj + (obj ? '.' : '') + key + ', enable: $root.isEnabled';
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

        this.input.dataset.bind = 'value: ' + obj + (obj ? '.' : '') + key + ', enable: $root.isEnabled';
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

        this.input.addEventListener('change', () => {
            const value = this.input.value;
            if (value.includes('.')) {
                this.input.value = -1;
                return;
            }

            if (value.startsWith('0') && value.length > 1) {
                this.input.value = +value;
            }
        });

        if (min !== null) {
            this.input.min = min;
            attachMinRequirement(this)
        }

        if (max !== null) {
            this.input.max = max;
            attachMaxRequirement(this)
        }

        return this.content;
    }
}

class FloatField extends Field {
    constructor(obj, key, label, suffixText = null, min = null, max = null, onChanged = null, pcOnly = false) {
        super();
        this.content.className += ' editor-float';

        this.input.type = 'number';

        this.input.dataset.bind = 'value: ' + obj + (obj ? '.' : '') + key + ', enable: $root.isEnabled';
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

        this.input.addEventListener('change', () => {
            const value = this.input.value;
            if (value.startsWith('.')) {
                this.input.value = 0 + value;
            }

            if (value.startsWith('0') && value.length > 1) {
                this.input.value = +value;
            }
        });

        if (min !== null) {
            this.input.min = min;
            attachMinRequirement(this)
        }

        if (max !== null) {
            this.input.max = max;
            attachMaxRequirement(this)
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
    constructor(obj, key, fields) {
        this.content = document.createElement('div');
        this.content.dataset.bind = 'foreach: ' + obj + (obj ? '.' : '') + key;
        this.content.className = 'text-light my-3 w-100 editor-array';

        fields.forEach(f => {
            this.content.appendChild(f);
        });

        return this.content;
    }
}

class PerkField {
    constructor(perks) {
        this.root = document.createElement('div');
        this.root.className = 'px-3 py-2';

        perks.forEach(p => {
            const container = document.createElement('div');
            container.className = 'py-3';

            const inputContainer = document.createElement('div');
            inputContainer.className = 'form-check form-switch';

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.role = 'switch';
            input.className = 'form-check-input';
            input.id = 'editField-perk-' + p.storageName;
            input.value = p.storageName;
            input.disabled = true;

            const perkName = document.createElement('label');
            perkName.innerText = p.storageName;
            perkName.className = 'form-check-label h5';
            perkName.htmlFor = input.id;

            const valuesContainer = document.createElement('div');
            valuesContainer.className = 'py-1 perk-values-container';

            for (var i = 1; i < 5; i++) {
                const valueContainer = document.createElement('div');
                valueContainer.className = 'row';

                const valueLabel = document.createElement('label');
                valueLabel.className = 'col-auto col-form-label label-sm';
                valueLabel.innerText = 'Value ' + i;

                const valueInputContainer = document.createElement('div');
                valueInputContainer.className = 'col-auto';
                const valueInput = document.createElement('input');
                valueInput.className = 'form-control form-control-sm';
                valueInput.type = 'number';
                valueInput.min = 0;
                valueInput.id = input.id + '-value' + i;
                valueLabel.htmlFor = valueInput.id;
                valueInput.disabled = true;
                //attachMinRequirement(valueInput);
                valueInputContainer.appendChild(valueInput);

                valueContainer.appendChild(valueLabel);
                valueContainer.appendChild(valueInputContainer);

                valuesContainer.appendChild(valueContainer)
            }

            inputContainer.appendChild(input);
            inputContainer.appendChild(perkName);


            const descriptionContainer = document.createElement('div');
            const perkDescription = document.createElement('p');
            perkDescription.textContent = p.toolTip;
            descriptionContainer.appendChild(perkDescription);


            container.appendChild(inputContainer);
            container.appendChild(descriptionContainer);
            container.appendChild(valuesContainer);
            //container.appendChild(perkDescription);

            $(valuesContainer).hide();
            input.addEventListener('change', (e) => {
                e.target.checked ? $(valuesContainer).show() : $(valuesContainer).hide();
            })

            resolvePerkBinding(this.root);

            this.root.appendChild(container);
        });

        return this.root;
    }
}

// #region Min Max req
function attachMinRequirement(field) {
    field.input.addEventListener('change', (e) => {
        const min = Number(field.input.min);
        var newValue = +e.target.value;
        if (isNaN(newValue)) { newValue = min - 1; }
        if (newValue < min) {
            alert('Value cannot be less than ' + min);
            field.input.invalid = true;
            field.input.value = min;
        }
    });
}

function attachMaxRequirement(field) {
    field.input.addEventListener('change', (e) => {
        const max = Number(field.input.max);
        var newValue = +e.target.value;
        if (isNaN(newValue)) { newValue = max + 1; }
        if (newValue > max) {
            alert('Value cannot be more than ' + max);
            field.input.invalid = true;
            field.input.value = max;
        }
    });
}
// #endregion
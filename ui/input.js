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
    constructor(binding, label, suffixText = null, onChanged = null) {
        super();

        this.input.type = 'text';

        this.label.innerText = label;
        this.resolveLabel(binding.key, label);

        if (suffixText) {
            this.resolveSuffix(suffixText);
        }

        binding.valueType = ValueType.String;
        resolveBinding(binding, this.input, onChanged);

        return this.content;
    }
}

class IntegerField extends Field {
    constructor(binding, label, suffixText = null, min = null, max = null, onChanged = null) {
        super();
        this.input.type = 'number';
        this.input.step = 1;
        this.input.pattern = '\d*';

        this.label.innerText = label;
        this.resolveLabel(binding.key, label);

        if (suffixText) {
            this.resolveSuffix(suffixText);
        }

        binding.valueType = ValueType.Integer;
        resolveBinding(binding, this.input, onChanged);

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

        if (!isNaN(min)) {
            this.input.min = min;
            attachMinRequirement(this)
        }

        if (!isNaN(max)) {
            this.input.max = max;
            attachMaxRequirement(this)
        }

        return this.content;
    }
}

class FloatField extends Field {
    constructor(binding, label, suffixText = null, min = null, max = null, onChanged = null) {
        super();
        this.input.type = 'number';

        this.label.innerText = label;
        this.resolveLabel(binding.key, label);

        if (suffixText) {
            this.resolveSuffix(suffixText);
        }

        binding.valueType = ValueType.Float;
        resolveBinding(binding, this.input, onChanged);

        this.input.addEventListener('change', () => {
            const value = this.input.value;
            if (value.startsWith('.')) {
                this.input.value = 0 + value;
            }

            if (value.startsWith('0') && value.length > 1) {
                this.input.value = +value;
            }
        });

        if (!isNaN(min)) {
            this.input.min = min;
            attachMinRequirement(this)
        }

        if (!isNaN(max)) {
            this.input.max = max;
            attachMaxRequirement(this)
        }

        return this.content;
    }
}

class SelectField extends Field {
    constructor(items, binding, label, onChanged = null) {
        super();
        this.label.innerText = label;
        this.resolveLabel(binding.key, label);

        this.select = document.createElement('select');
        this.select.className = 'form-select form-select-sm';
        items.forEach(i => {
            const option = document.createElement('option');
            option.value = i.value;
            option.text = i.name;
            option.selected = false;
            this.select.appendChild(option);
        });

        this.select.setAttribute('disabled', true);
        this.select.value = '-999';
        this.inputWrapper.replaceChild(this.select, this.input);

        resolveBinding(binding, this.select, onChanged);

        return this.content;
    }
}

class SwitchField extends Field {
    constructor(binding, label, onChanged = null) {
        super();
        this.inputWrapper.className = 'form-check form-switch';

        this.input.type = 'checkbox';
        this.input.role = 'switch';
        this.input.className = 'form-check-input';

        this.label.innerText = label;
        this.label.className += ' form-check-label';
        this.inputWrapper.appendChild(this.label);

        binding.valueType = ValueType.Boolean;
        resolveBinding(binding, this.input, onChanged);

        return this.content;
    }
}

class FlagField {
    constructor(items, binding, label, onChanged = null) {
        const expanded = true;

        this.content = document.createElement('div');
        this.content.className = 'accordion text-light my-3 w-100 pt-2';
        this.content.id = 'flagEdit-' + binding.key;

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

        if (items.length) {
            items.forEach(i => {
                const container = document.createElement('div');
                container.className = 'form-check form-switch flag-switch-row';
                
                const checkBox = document.createElement('input');
                checkBox.type = 'checkbox';
                checkBox.role = 'switch';
                checkBox.value = +i.value;
                checkBox.className = 'form-check-input';
                checkBox.setAttribute('disabled', true);
                checkBox.id = this.content.id + '-flag-' + i.value;

                const label = document.createElement('label');
                label.className = 'form-check-label label-sm';
                label.htmlFor = checkBox.id;
                label.textContent = i.name;

                container.appendChild(checkBox);
                container.appendChild(label);

                this.body.appendChild(container);
            })
        }

        this.header.appendChild(this.button);
        this.bodyContainer.appendChild(this.body);

        this.item.appendChild(this.header);
        this.item.appendChild(this.bodyContainer);

        this.content.appendChild(this.item);

        binding.bindingType = BindingType.Flag;
        resolveBinding(binding, this.body, onChanged);

        return this.content;
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
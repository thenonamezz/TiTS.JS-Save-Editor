//coming from .net and not having INotifyPropertyChanged was rough, but this does the job
function bind(object, key, input, type = null, onChanged = null) {
    const initValue = object[key];
    Object.defineProperty(object, key, {
        get() {
            let value;

            //the game should be able to parse strings as numbers (within reason) just fine but just in case
            switch (type) {
                case ValueType.Integer:
                case ValueType.Float:
                    value = input.valueAsNumber;
                    break;
                default:
                    value = input.value;
                    break;
            }

            return value
        },
        set(value) { input.value = value }
    });
    object[key] = initValue;

    input.addEventListener('input', (e) => {
        object[key] = e.target.value;

        if (onChanged) {
            onChanged(value);
        }

        if (!window.onbeforeunload) {
            window.onbeforeunload = () => false;
        }
    });
}

class Field { //base
    constructor() {
        this.content = document.createElement('div');
        //this.content.className = 'd-flex align-items-center text-light py-2';
        this.content.className = 'text-light my-3 w-100';
        //this.labelWrapper = document.createElement('div');
        //this.labelWrapper.className = 'flex-grow-1';
        this.label = document.createElement('label');
        this.label.className = 'label-sm';
        //this.labelWrapper.appendChild(this.label);
        this.inputWrapper = document.createElement('div');
        //this.inputWrapper.className = 'ms-2 input-group input-group-sm col-sm-10';
        this.inputWrapper.className = 'input-group input-group-sm';
        this.input = document.createElement('input');
        this.input.className = 'form-control form-control-sm';
        this.inputWrapper.appendChild(this.input);
        //this.content.appendChild(this.labelWrapper);
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

    enable() {
        this.input.disabled = false;
    }

    disable() {
        this.input.disabled = true;
    }
}

class SelectField extends Field {
    constructor(items, obj, key, label, onChanged = null) {
        super();
        this.select = document.createElement('select');
        this.select.className = 'form-select form-select-sm';
        this.label.innerText = label;
        this.resolveLabel(key, label);
        items.forEach(i => {
            const option = document.createElement('option');
            option.value = i.value;
            option.text = i.name;
            option.selected = false;
            this.select.appendChild(option);
        });
        this.inputWrapper.replaceChild(this.select, this.input);

        bind(obj, key, this.select, ValueType.Integer, onChanged);

        return this.content;
    }
}

class TextField extends Field {
    constructor(obj, key, label, suffixText = null, onChanged = null) {
        super();
        this.input.type = 'text';
        this.label.innerText = label;
        this.resolveLabel(key, label);
        suffixText && this.resolveSuffix(suffixText);

        bind(obj, key, this.input, ValueType.String, onChanged);

        return this.content;
    }
}

class IntegerField extends Field {
    constructor(obj, key, label, suffixText = null, min = null, max = null, onChanged = null) {
        super();
        this.input.type = 'number';
        this.input.step = 1;
        this.input.pattern = '\d*';
        this.label.innerText = label;
        this.resolveLabel(key, label);
        suffixText && this.resolveSuffix(suffixText);

        bind(obj, key, this.input, ValueType.Integer, onChanged);

        this.input.addEventListener('change', () => {
            const value = this.input.value;
            if (value.includes('.')) {
                this.input.value = -1;
                return;
            }

            if (value.startsWith('0') && value.length > 1) {
                this.input.value = parseInt(value);
                updateSuffixPosition(this.input, this.suffix);
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
    constructor(obj, key, label, suffixText = null, min = null, max = null, onChanged = null) {
        super();
        this.input.type = 'number';
        this.label.innerText = label;
        this.resolveLabel(key, label);
        suffixText && this.resolveSuffix(suffixText);

        bind(obj, key, this.input, ValueType.Float, onChanged);

        this.input.addEventListener('change', () => {
            const value = this.input.value;
            if (value.startsWith('.')) {
                this.input.value = 0 + value;
            }

            if (value.startsWith('0') && value.length > 1) {
                this.input.value = parseFloat(value);
                updateSuffixPosition(this.input, this.suffix);
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
// #endregion

// #region Min Max req
function attachMinRequirement(field) {
    field.input.addEventListener('change', (e) => {
        const min = Number(field.input.min);
        var newValue = e.target.valueAsNumber;
        if (isNaN(newValue)) { newValue = min - 1; }
        if (newValue < min) {
            alert('Value cannot be less than ' + min);
            field.input.invalid = true;
            field.input.value = min;

            if (field.suffix) {
                updateSuffixPosition(field.input, field.suffix);
            }
        }
    });
}

function attachMaxRequirement(field) {
    field.input.addEventListener('change', (e) => {
        const max = Number(field.input.max);
        var newValue = e.target.valueAsNumber;
        if (isNaN(newValue)) { newValue = max + 1; }
        if (newValue > max) {
            alert('Value cannot be more than ' + max);
            field.input.invalid = true;
            field.input.value = max;

            if (field.suffix) {
                updateSuffixPosition(field.input, field.suffix);
            }
        }
    });
}
// #endregion

const ValueType = {
    String: 0,
    Integer: 1,
    Float: 2
}
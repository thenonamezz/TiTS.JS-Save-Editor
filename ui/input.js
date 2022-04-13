//coming from .net and not having INotifyPropertyChanged was rough, but this does the job
function bind(object, key, input, onChanged) {
    const initValue = object[key];
    Object.defineProperty(object, key, {
        get() { return input.value },
        set(value) { input.value = value }
    });
    object[key] = initValue;

    input.addEventListener('input', (e) => {
        object[key] = e.target.value;

        if (onChanged) {
            onChanged(e.target.value);
        }

        if (!window.onbeforeunload) {
            window.onbeforeunload = () => false;
        }
    });
}

class Field { //base
    constructor() {
        this.content = document.createElement('div');
        this.content.className = 'd-flex align-items-center text-light p-1';
        this.label = document.createElement('label');
        this.label.className = 'label-sm';
        this.input = document.createElement('input');
        this.input.className = 'form-control form-control-sm';
        this.content.appendChild(this.label);
        this.content.appendChild(this.input);
    }

    resolveLabel(key, label) {
        this.input.id = 'editField-' + key;
        this.label.innerText = label;
        this.label.htmlFor = this.input.id;
    }

    enable() {
        this.input.disabled = false;
    }

    disable() {
        this.input.disabled = true;
    }
}



class TextField extends Field {
    constructor(obj, key, label, suffixText = null, onChanged = null) {
        super();
        this.input.type = 'text';
        this.label.innerText = label;
        this.resolveLabel(key, label);
        bind(obj, key, this.input, onChanged);

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
        bind(obj, key, this.input, onChanged);

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

        if (suffixText) {
            this.suffix = attachSuffix(this, suffixText);
        }

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

// #region Suffix
function getTextWidth(text, font) {
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

function updateSuffixPosition(input, suffix) {
    let width = getTextWidth(input.value, '0.875rem Poppins');
    suffix.style.left = (width + 10) + 'px';
}

function attachSuffix(field, suffixText) {
    let wrapper = document.createElement('div');
    wrapper.className = 'suffix-wrapper';

    let suffix = document.createElement('span');
    suffix.innerText = suffixText;
    suffix.className = 'suffix';
    suffix.style.fontSize = '0.875em';

    updateSuffixPosition(field.input, suffix);
    field.input.addEventListener('input', () => {
        updateSuffixPosition(field.input, suffix);
    });

    wrapper.appendChild(field.input);
    wrapper.appendChild(suffix);
    field.content.appendChild(wrapper);

    return suffix;
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
class StorageContainer {
    constructor(source, obj, key, hasFunc, dataFields) {
        this.root = document.createElement('div');
        this.root.className = 'text-light my-3 w-100';
        this.root.dataset.bind = 'foreach: ' + source;

        const header = document.createElement('div');
        header.className = 'form-check form-switch mt-4';

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.role = 'switch';
        checkBox.className = 'form-check-input storage-switch';
        checkBox.setAttribute('disabled', true);
        checkBox.dataset.bind = `checked: $root.` + obj + (obj ? '.' : '') + key + `, 
                                 checkedValue: $data,
                                 enable: $root.saveLoaded`;

        const storageName = document.createElement('label');
        storageName.className = 'form-check-label';
        storageName.dataset.bind = 'text: storageName';

        const tooltip = document.createElement('p');
        tooltip.className = 'p-sm text-muted';
        // tooltip.dataset.bind = "text: $data.tooltip, class: $root." + hasFunc + "($data) ? '' : 'text-muted' ";
        tooltip.dataset.bind = "text: $data.tooltip";

        const dataContainer = document.createElement('div');
        dataContainer.className = 'ps-2';
        dataContainer.style.marginTop = '-8px';
        dataContainer.dataset.bind = 'visible: $root.' + hasFunc + '($data)';
        const dataToggle = document.createElement('button');
        dataToggle.className = 'btn btn-sm btn-xs btn-outline-light'
        dataToggle.textContent = 'Toggle Data';
        dataToggle.type = 'button';
        dataToggle.dataset.bind = 'click: $root.expandStorage';
        dataToggle.dataset.toggle = 'collapse';
        dataContainer.appendChild(dataToggle);

        const dataCollapse = document.createElement('div');
        dataCollapse.className = 'mt-2 collapse';
        const dataBody = document.createElement('div');
        dataBody.className = 'd-flex flex-wrap';

        for (var i = 1; i < 5; i++) {
            dataBody.appendChild(createStorageField('Value ' + i, 'value' + i, 'numberInput'));
        }

        dataFields.forEach(f => dataBody.appendChild(f));

        dataCollapse.appendChild(dataBody);
        dataContainer.appendChild(dataCollapse);

        header.appendChild(checkBox);
        header.appendChild(storageName);

        this.root.appendChild(header);
        this.root.appendChild(tooltip);
        this.root.appendChild(dataContainer);

        return this.root;
    }
}

class PerkContainer extends StorageContainer {
    constructor(obj, key) {
        const dataFields = [];
        super('allPerks', obj, key, 'hasPerk', dataFields);
    }
}

class StatusEffectContainer extends StorageContainer {
    constructor(obj, key) {
        const dataFields = [];
        dataFields.push(createStorageField('Minutes Left', 'minutesLeft', 'numberInput'));
        dataFields.push(createStorageField('Icon Name', 'iconName', 'textInput'));
        dataFields.push(createStorageField('Icon Shade', 'iconShade', 'textInput'));
        super('allStatusEffects', obj, key, 'hasStatusEffect', dataFields);
    }
}

class FlagContainer {
    constructor() {
        this.root = document.createElement('div');

        this.body = document.createElement('div');
        this.body.dataset.bind = 'foreach: $root.save.flags.items';

        this.flagItem = document.createElement('div');
        this.flagItem.className = 'row g-0';

        this.row = document.createElement('tr');

        this.flagNameContainer = document.createElement('div');
        this.flagNameContainer.className = 'col-6';
        this.flagNameContainer.dataset.bind = 'text: key';

        this.flagValueContainer = document.createElement('div');
        this.flagValueContainer.className = 'col-6';
        this.flagValue = document.createElement('input');
        this.flagValue.type = 'text';
        this.flagValue.className = 'form-control form-control-sm';
        this.flagValue.dataset.bind = 'value: value';
        this.flagValueContainer.appendChild(this.flagValue);

        this.flagItem.appendChild(this.flagNameContainer);
        this.flagItem.appendChild(this.flagValueContainer);

        this.body.appendChild(this.flagItem);
        this.root.appendChild(this.body);

        return this.root;
    }
}

class KeyitemContainer extends StorageContainer {
    constructor(obj, key) {
        const dataFields = [];
        super('allKeyItems', obj, key, 'hasKeyitem', dataFields);
    }
}

function createStorageField(labelText, key, bindingType) {
    const div = document.createElement('div');
    div.className = 'w-50 px-1';

    const label = document.createElement('label');
    label.className = 'label-sm';
    label.textContent = labelText;

    const input = document.createElement('input');
    input.className = 'form-control form-control-sm';
    input.disabled = true;
    if (bindingType === 'numberInput') {
        input.type = 'number';
    }

    input.dataset.bind = bindingType + ': $data.' + key + ' , enable: $root.saveLoaded';

    div.appendChild(label);
    div.appendChild(input);

    return div;
}
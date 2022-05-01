class FlagContainer {
    constructor() {
        this.root = document.createElement('div');

        this.body = document.createElement('div');
        //this.body = document.createElement('table');
        this.body.dataset.bind = 'foreach: $root.save.flags.items';

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

class StatusEffectContainer {
    constructor(obj, key) {
        this.content = document.createElement('div');
        this.content.className = 'text-light my-3 w-100 editor-perk';
        this.content.dataset.bind = 'foreach: $root.getStatusEffects()';

        const container = document.createElement('div');
        container.className = 'form-check form-switch mt-5';

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.role = 'switch';
        checkBox.className = 'form-check-input perk-switch';
        checkBox.setAttribute('disabled', true);
        checkBox.dataset.bind = `checked: $root.` + obj + (obj ? '.' : '') + key + `,
                                 checkedValue: $data,
                                 enable: $root.saveLoaded`;

        const chkLabel = document.createElement('label');
        chkLabel.className = 'form-check-label';
        chkLabel.dataset.bind = 'text: storageName';

        const seDesc = document.createElement('p');
        //seDesc.dataset.bind = "text: $data.toolTip, class: $root.hasPerk($data) ? '' : 'text-muted' ";
        seDesc.dataset.bind = "text: $data.toolTip";

        //const valueContainer = document.createElement('div');
        //valueContainer.dataset.bind = 'visible: $root.hasPerk($data)';
        //for (var i = 1; i < 5; i++) {
        //    var div = document.createElement('div');

        //    var label = document.createElement('label');
        //    label.className = 'label-sm';
        //    label.textContent = 'Value ' + i;

        //    var inputWrapper = document.createElement('div');
        //    inputWrapper.className = 'input-group input-group-sm';
        //    var input = document.createElement('input');
        //    input.className = 'form-control form-control-sm';
        //    input.setAttribute('disabled', true);
        //    input.dataset.bind = 'value: $data.value' + i + ' , enable: $root.isEnabled';
        //    inputWrapper.appendChild(input);

        //    div.appendChild(label);
        //    div.appendChild(inputWrapper);

        //    valueContainer.appendChild(div);
        //}

        container.appendChild(checkBox);
        container.appendChild(chkLabel);

        this.content.appendChild(container);
        this.content.appendChild(seDesc);
        //this.content.appendChild(valueContainer);

        return this.content;
    }
}

class PerkContainer {
    constructor(obj, key) {
        this.content = document.createElement('div');
        this.content.className = 'text-light my-3 w-100 editor-perk';
        this.content.dataset.bind = 'foreach: $root.getPerks()';

        const container = document.createElement('div');
        container.className = 'form-check form-switch mt-5';

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.role = 'switch';
        checkBox.className = 'form-check-input perk-switch';
        checkBox.setAttribute('disabled', true);
        checkBox.dataset.bind = `checked: $root.` + obj + (obj ? '.' : '') + key + `,
                                 checkedValue: $data,
                                 enable: $root.saveLoaded`;
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
            input.dataset.bind = 'numberInput: $data.value' + i + ' , enable: $root.saveLoaded';
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
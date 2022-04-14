class Tab {
    constructor(rows) {
        this.root = document.createElement('div');
        rows.forEach(r => this.root.appendChild(r));
        return this.root;
    }
}

class Row {
    constructor(groups) {
        this.root = document.createElement('div');
        this.root.className = 'd-flex py-3 mb-2';
        groups.forEach(g => this.root.appendChild(g));
        return this.root;
    }
}

class Group {
    constructor(titleText, fields) {
        this.root = document.createElement('div');
        this.root.className = 'flex-fill px-5';

        if (titleText) {
            const titleElement = document.createElement('h3');
            titleElement.textContent = titleText;
            const hr = document.createElement('hr');
            this.root.appendChild(titleElement);
            this.root.appendChild(hr);
        }

        fields.forEach(f => this.root.appendChild(f));
        return this.root;
    }
}
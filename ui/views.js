class Tab {
    constructor(rows) {
        this.root = document.createElement('div');

        if (rows.length) {
            rows.forEach(r => this.root.appendChild(r));
        }
        
        return this.root;
    }
}

class Row {
    constructor(groups) {
        this.root = document.createElement('div');
        this.root.className = 'row py-3 mb-2 g-0';

        if (groups.length) {
            groups.forEach(g => {
                g.className = 'col-sm-' + 12 / groups.length + ' px-3';
                this.root.appendChild(g)
            });
        }
        
        return this.root;
    }
}

class Group {
    constructor(titleText, fields) {
        this.root = document.createElement('div');
        if (titleText) {
            const titleElement = document.createElement('h3');
            titleElement.textContent = titleText;
            const hr = document.createElement('hr');
            this.root.appendChild(titleElement);
            this.root.appendChild(hr);
        }

        if (fields.length) {
            fields.forEach(f => this.root.appendChild(f));
        }
        
        return this.root;
    }
}
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
                g.className += ' col-sm-' + 12 / groups.length + ' px-3';
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

        //const isNested = fields.every(f => f.className.includes('nested-group'));
        //if (isNested) {
        //    if (fields.length) {
        //        const nestedContainer = document.createElement('div');
        //        nestedContainer.className = 'row g-0';
        //        fields.forEach(f => {
        //            f.className += ' col-sm-' + 12 / fields.length + ' px-1';
        //            nestedContainer.appendChild(f);
        //        });
        //        this.root.appendChild(nestedContainer);
        //    }
        //}
        //else {
        //    if (fields.length) {
        //        fields.forEach(f => this.root.appendChild(f));
        //    }
        //}

        if (fields.length) {
            fields.forEach(f => {
                if (f.className.includes('nested-group')) {
                    const nestedGroups = fields.filter(f => f.className.includes('nested-group'));

                    const nestedContainer = document.createElement('div');
                    nestedContainer.className = 'row g-0';

                    nestedGroups.forEach(ng => {
                        ng.className += ' col-' + 12 / nestedGroups.length + ' px-1';
                        nestedContainer.appendChild(ng);
                    })

                    this.root.appendChild(nestedContainer);
                }
                else {
                    this.root.appendChild(f);
                }
            });
        }

        return this.root;
    }
}

class NestedGroup {
    constructor(titleText, fields) {
        this.root = document.createElement('div');
        this.root.className = 'nested-group';
        if (titleText) {
            const titleElement = document.createElement('h5');
            titleElement.textContent = titleText;
            const hr = document.createElement('hr');
            this.root.appendChild(titleElement);
            this.root.appendChild(hr);
        }

        if (fields.length) {
            fields.forEach(f => this.root.appendChild(f));
        }

        if (!titleText) {
            this.root.children[0].className += ' mt-0';
        }

        return this.root;
    }
}
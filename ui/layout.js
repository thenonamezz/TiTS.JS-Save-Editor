class Tab {
    constructor(rows, context = null) {
        this.root = document.createElement('div');
        if (context) {
            //this.root.dataset.bind = 'with: ' + context;
        }

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
    constructor(titleText, fields, context = null) {
        this.root = document.createElement('div');
        if (context) {
            //this.root.dataset.bind = 'with: ' + context;
        }

        if (titleText) {
            this.titleElement = document.createElement('h3');
            this.titleElement.textContent = titleText;
            const hr = document.createElement('hr');
            this.root.appendChild(this.titleElement);
            this.root.appendChild(hr);
        }

        if (fields.length) {
            fields.forEach(f => {
                if (f.className.includes('nested-group')) {
                    //if (fields.indexOf(f) == fields.length - 1 || !fields[fields.indexOf(f) + 1].className.includes('nested-group')) {
                    //    for (var i = 0; i < f.children.length; i++) {
                    //        f.children[i].className += ' mb-0';
                    //    }
                    //}
                }
                this.root.appendChild(f);
            });
        }

        return this.root;
    }
}

class ArrayGroup {
    constructor(titleText, func, fields) {
        this.root = document.createElement('div');

        this.titleElement = document.createElement('h3');
        this.titleElement.textContent = titleText;
        const hr = document.createElement('hr');
        this.root.appendChild(this.titleElement);
        this.root.appendChild(hr);

        this.addButton = document.createElement('button');
        this.addButton.innerHTML = 'Add <i class="fa-solid fa-plus"></i>';
        this.addButton.type = 'button';
        this.addButton.disabled = true;
        this.addButton.className = 'btn btn-success btn-sm float-end text-white';
        this.addButton.dataset.bind = 'click: $root.' + func + ', enable: $root.isEnabled';
        this.titleElement.appendChild(this.addButton);

        if (fields.length) {
            fields.forEach(f => {
                this.root.appendChild(f);
            });
        }

        return this.root;
    }
}

class NestedGroup {
    constructor(titleText, fields, context = null) {
        this.root = document.createElement('div');
        this.root.className = 'row g-0 nested-group my-n3';

        if (context) {
            //this.root.dataset.bind = 'with: ' + context;
        }

        if (titleText) {
            const titleElement = document.createElement('h5');
            titleElement.textContent = titleText;
            const hr = document.createElement('hr');
            this.root.appendChild(titleElement);
            this.root.appendChild(hr);
        }

        if (fields.length) {
            fields.forEach(f => {
                f.className += ' col-6 px-1';
                this.root.appendChild(f);
            });
        }

        //if (!titleText && fields.length) {
        //    this.root.children[0].className += ' mt-0';
        //}

        return this.root;
    }
}
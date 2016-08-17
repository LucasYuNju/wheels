(() => {
    const w = window, d = document;
    const sakuraPrototype = {
        forEach: [].forEach,
        length: 0,
        selector: '',
        splice: [].splice,
        addClass: function(value) {
            var reg = new RegExp('(\\s|^)' + value + '(\\s|$)');
            this.forEach(dom => {
                if (dom.className.match(reg)) {
                    dom.className == ' ' + value;
                }
            });
            return this;
        },
        css: function(attribute, value) {
            this.forEach(dom => {
                if (arguments.length === 1) {
                    return getComputedStyle(dom, null)[attr];
                }
                dom.style[attribute] = value;
            });
            return this;
        },
        next: function() {
            let current = this;
            while ((current = current.nextSibling) && current.nodeType !== 1) {}
            return current;
        },
        prev: function() {
            let current = this;
            while ((current = current.previousSibling) && current.nodeType !== 1) {}
            return current;
        },
        text: function(value) {
            this.forEach(dom => {
                if (arguments.length === 0)
                {
                    return dom.innerText;
                }
                dom.innerText = value;
            });
        },
    };
    const sakura = function(selector) {
        const doms = d.querySelectorAll(selector);
        const result = Object.create(sakuraPrototype);
        [].push.apply(result, doms);
        return result;
    }
    window.$ = sakura;
})();

(() => {
    const w = window, d = document;
    const sakuraPrototype = {
        each: [].forEach,
        length: 0,
        selector: '',
        splice: [].splice,
        addClass: function(value) {
            var reg = new RegExp('(\\s|^)' + value + '(\\s|$)');
            this.each(dom => {
                if (dom.className.match(reg)) {
                    dom.className == ' ' + value;
                }
            });
            return this;
        },
        css: function(attribute, value) {
            this.each(dom => {
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
        // no filter
        parent: function() {
            const result = sakura();
            this.each(dom => {
                if (dom.parentNode !== null && dom.parentNode.nodeType !== 11) {
                    [].push.call(result, dom.parentNode);
                }
            });
            return result;
        },
        parents: function() {
            const reslt = sakura();
            this.each(dom => {
                while ((dom = dom.parentNode) !== null && dom.parentNode.nodeType !== 11) {
                    [].push.call(result, dom);
                }
            });
            return result;
        }
        prev: function() {
            let current = this;
            while ((current = current.previousSibling) && current.nodeType !== 1) {}
            return current;
        },
        text: function(value) {
            this.each(dom => {
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

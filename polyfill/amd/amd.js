// 写这段代码是为了加深对AMD的理解，参考了司徒正美的博客
(function(global) {
    const document = global.document;
    const modules = {};
    const loadings = [];    //依赖还没有加载的模块，用于判断循环依赖
    let baseUrl = "";
    
    // 仅仅告诉AMD，将来要使用id当前模块的话，先把依赖加载进来，不会立即加载当前模块的依赖
    //  参数id，deps可选
    function define(id, deps, factory) {
        if(id instanceof Function) {
            factory = id;
            deps = [];
        }
        else if(Array.isArray(id)) {
            factory = deps;
            deps = id;
        }
        const url = currentScriptSrc();
        if(!modules[url]) {
            const resolvedDeps = deps.map(resolvePath);
            const module = {
                url,
                deps: resolvedDeps,
                callback: factory,
                state: 1,    //2表示加载完成
            };
            modules[url] = module;
        }
    };
    
    // 加载依赖，并且执行callback
    function require(deps, factory) {
        const url = currentScriptSrc();
        if(!modules[url]) {
            const resolvedDeps = deps.map(resolvePath);
            const module = {
                deps: resolvedDeps,
                callback: factory,
                state: 1,    //2表示加载完成
            };
            modules[url] = module;
            loadings.unshift(url);
        }
        if(checkCircle(deps, url)) {
            throw new Error("Cyclic dependency");
        }
        loadDepsOfModule(url);
    };
    
    function loadDepsOfModule(id) {
        const module = modules[id];
        module.deps.forEach(depId => {
            if(!modules[depId]) {
                loadJs(depId, () => {
                    loadings.unshift(depId);
                    loadDepsOfModule(depId);
                    checkDeps();
                });
            }
        });
    };
    
    function checkDeps() {
        for(let i = loadings.length - 1; i >= 0; i--) {
            const module = modules[loadings[i]];
            let depLoaded = true;
            for(let dep of module.deps) {
                if(!modules[dep] || modules[dep].state !== 2) {
                    depLoaded = false;
                }
            }
            if(depLoaded) {
                fireCallback(loadings[i]);
                loadings.splice(i, 1);
                checkDeps();
            }
        }
    }
    
    function checkCircle(deps, id) {
        for(let dep of deps) {
            const module = modules[dep];
            if(module) {
                if(dep === id || checkCircle(module.deps, id)) {
                    return true;
                }
            }
        }
    }
    
    function fireCallback(id) {
        const module = modules[id];
        const args = module.deps.map(dep => modules[dep].exports);
        module.exports = module.callback.apply(global, args);
        module.state = 2;
    }
    
    // 初始化baseUrl并加载入口script
    function init() {
        const url = currentScriptSrc();
        baseUrl = url.replace(/[^\/]+\.js$/, "");
        const nodes = document.getElementsByTagName("script");
        const currentNode = nodes[nodes.length - 1];
        const mainEntry = currentNode.getAttribute('data-main');
        loadJs(mainEntry);
    }
    
    // 核心方法，利用script标签，加载js
    function loadJs(url, callback) {
        const node = document.createElement("script");
        node.charset = "utf-8";
        node.onload = function() {
            document.head.removeChild(node);
            if(callback) {
                callback();                    
            }
        }
        node.src = url;
        document.head.appendChild(node);
    }
    
    function currentScriptSrc() {
        return document.currentScript.src;
    };
    
    function resolvePath(id) {
        if(!id.endsWith(".js")) {
            id += ".js";
        }
        return baseUrl + id;
    }
    
    function Module(url, deps, factory) {
        this.url = url;
        this.deps = deps;
    };
        
    init();
    global.define = define;
    global.require = require;
})(window);

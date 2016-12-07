const fs = require('fs');
const path = require('path');
const runInNewContext = require('vm').runInNewContext;

function Module(id, parent) {
  this.id = id;
  this.parent = parent;
  this.exports = {};
}

Module._cache = {};

Module._resolve = function (name) {
    if (!path.extname(name)) {
      name += '.js';
    }
    if (path.isAbsolute(name)) {      // /Users/foo/node_modules/bar/index.js
      return name;
    }
    else if (name.startsWith('.')) {  // ./foo.js
      return path.resolve(name);
    }
    else {                            // 'foo/index.js'
      // find package in node_modules of ancestor folders
      let parentFolder = __dirname;
      while (parentFolder !== '/') {
        let packagePath = path.join(parentFolder, 'node_modules', name);
        if (fs.existsSync(packagePath)) {
          return packagePath;
        }
        parentFolder = path.join(parentFolder, '../');
      }
    }
    return null;
  }

Module.prototype = {
  _evalExec: function(code) {
    const define = eval('let define = null; define = function(require, exports, module) {' + code + '}');
    define(this._require, this.exports, this);
  },
  _sandboxExec: function(code) {
    const sandbox = {};
    for (let key in global) {
      sandbox[key] = global[key];
    }
    sandbox.global = sandbox;
    sandbox.module = this;
    sandbox.exports = this.exports;
    sandbox.require = this._require;
    return runInNewContext(code, sandbox);
  },
  _load(name, parent): {
    const filePath = Module._resolve(name);
    if (!filePath) {
      throw new Error('Package ' + name + ' does not exist');
    }
    if (Module._cache[filePath]) {
      return Module._cache[filePath];
    }
    const code = fs.readFileSync(filePath, 'utf8');
    this._sandboxExec(code);
    return this.exports;
  },
  _require: function(name) {
    this.load(name, this)
  },
}

module.exports = Module;

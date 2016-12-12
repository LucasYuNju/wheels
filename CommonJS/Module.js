const fs = require('fs');
const path = require('path');
const runInNewContext = require('vm').runInNewContext;

const cache = {};

class Module {
  constructor(id, parent) {
    this.id = id;
    this.parent = parent;
    this.exports = {};
  }
  require(fileName) {
    return load(fileName, this)
  }
  compile(code) {
    const sandbox = {};
    for (let key in global) {
      sandbox[key] = global[key];
    }
    sandbox.global = sandbox;
    sandbox.module = this;
    sandbox.exports = this.exports;
    sandbox.require = this.require;
    return runInNewContext(code, sandbox);
  },
}

function resolve(name) {
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

function load(fileName, parent) => {
  const filePath = resolve(fileName);
  if (!filePath) {
    throw new Error('Package ' + fileName + ' does not exist');
  }
  // fileName相同的情况下，filePath有可能不同
  if (!cache[filePath]) {
    const code = fs.readFileSync(filePath, 'utf8');
    const module = new Module(parent);
    module.compile(code);
    cache[fileNmae] = module;
  }
  return cache[filePath];
}

function runMain(entry) {
  load(entry, null);
}

module.exports = Module;

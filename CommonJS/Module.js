const fs = require('fs');
const path = require('path');
const runInThisContext = require('vm').runInThisContext;

const cache = {};

class Module {
  constructor(id, parent) {
    this.id = id;
    this.parent = parent;
    this.exports = {};
  }
  require(fileName) {
    return Module.load(fileName, this).exports;
  }
  // nodeJS的require有个特性：在一个模块中定义全局变量，其他模块也能访问到
  // runInThisContext和eval的区别是，eval可以修改局部变量
  compile(code) {
    const wrapper = `(function (exports, require, module) {${code}})`;
    const compiledWrapper = runInThisContext(wrapper, {});

    const args = [this.exports, this.require, this];
    return compiledWrapper.apply(this.exports, args);
  }

  static resolve(name) {
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

  static load(fileName, parent) {
    const filePath = Module.resolve(fileName);
    if (!filePath) {
      throw new Error('Package ' + fileName + ' does not exist');
    }
    // fileName相同的情况下，filePath有可能不同
    if (!cache[filePath]) {
      const code = fs.readFileSync(filePath, 'utf8');
      const module = new Module(parent);
      // 先cache，目的是为了处理循环引用
      cache[filePath] = module;
      module.compile(code);
    }
    return cache[filePath];
  }

  static runMain(entry) {
    Module.load(entry, null);
  }
}

module.exports = Module;

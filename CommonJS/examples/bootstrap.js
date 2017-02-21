const Module = require("../Module");

Module.runMain("./a");

// 输出
// {}
// { b: bar }

// 不管是否setTimeout，结果都是一样的，在b require a的时候，会发现a模块已经存在，但是exports还没有值，所以是{}

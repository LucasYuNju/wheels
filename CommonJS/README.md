# 深入浅出CommonJS

模块系统是JS开发中最常用，也是最容易忽略的部分。多数人都能够做到熟练使用一种模块系统，不过仅仅了解到这个程度是不够的，在日常的开发中，有时候会遇到诸如循环依赖、单例等问题，要正确使用模块系统，需要我们去了解模块系统背后的实现。有阮一峰的[require() 源码解读](http://www.ruanyifeng.com/blog/2015/05/require.html)珠玉在前，本文会实现一个最简化版本的node.js的require，帮助你理解node.js模块系统的核心原理。

## 模块系统对比

需要澄清的是，CommonJS和AMD都只是模块系统的规范。node的模块系统是CommonJS的一种实现；requireJS是AMD的一种实现，适用于浏览器环境。此外，ES6在语言层面实现了自身的模块功能，它有可能成为浏览器和服务器通用的模块解决方案。

## CommonJS是如何实现的

#### 1. resolve path

三种模块，核心模块、相对路径或绝对路径的模块，自定义模块

#### 2. exec

两种执行方式，eval、runInNewContext
```
// most naive way

```

#### 3. cache exports & cyclic dependency
module对象，

### 为什么nodeJs使用的是同步的方式进行require

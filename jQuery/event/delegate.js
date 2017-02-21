function delegate(element, selector, type, callback) {
  element.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      // event和jquery的event对象不一样
      callback.call(e.target, e);
    }
  });
}

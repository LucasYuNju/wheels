console.log("b loaded");
define(["a"], function() {
    return {
        sum: (m, n) => m + n
    }
});

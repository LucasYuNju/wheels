console.log("a loaded");
require(["b"], (b) => {
    const sum = b.sum(1, 1);
    console.log("sum of 1 + 1 is " + sum);
});

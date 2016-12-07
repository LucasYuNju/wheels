const Promize = require("./Promise");

// test setTimeout.
// According to Promise/A+, expected output is a, b, c
function delay() {
	return new Promize((resolve, reject) => {
		console.log("a");
		// setTimeout(() => {
			resolve();
		// }, 1000);
	});
}

delay().then(() => {
	console.log("c");
});

console.log("b");

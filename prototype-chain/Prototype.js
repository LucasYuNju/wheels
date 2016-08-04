// const a = {
//     name: "Tom"
// }
const b = function(){}
const a = function()
{
    this.name = "wjx";
}

b.prototype = Object.create(a.prototype);
// const bb = Object.create(a);
const bb = new b();

const aa = new a();

const aaa = new a();

// aa.name = "Foo";
console.log(aa.name);
console.log(bb.name);

bb.name = "bar";
console.log(aa.name);
console.log(bb.name);

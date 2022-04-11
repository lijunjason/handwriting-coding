console.log(a);
var a = 100;
function test () {
    console.log(a);
    var a = 200;
    console.log(a)
}
test();
console.log(a)


var a;
console.log(a);
a = 100;
function test () {
    var a;
    console.log(a);
    a = 200;
    console.log(a)
}
test();
console.log(a)
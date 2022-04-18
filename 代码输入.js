/**
 * @method 
 * @description 考察 this的指向、原型、原型链、类的继承、数据类型
 */

function Parent() {
    this.a = 1;
    this.b = [1, 2, this.a];
    this.c = { demo: 5 };
    this.show = function () {
        console.log(this.a , this.b , this.c.demo );
    }
}

function Child() {
    this.a = 2;
    this.change = function () {
        this.b.push(this.a);
        this.a = this.b.length;
        this.c.demo = this.a++;
    }
}

Child.prototype = new Parent();
var parent = new Parent();
var child1 = new Child();
var child2 = new Child();

// parent = {a: 1, b: [1,2,1], c: {demo: 5}, show: fn} 父对象


// Child.prototype = {a: 1, b: [1,2,1], c: {demo: 5}, show: fn} 新对象

// child1 = {__proto: Child.prototype, a: 2, change: fn}
// child2 = {__proto: Child.prototype, a: 2, change: fn}
child1.a = 11; 
child2.a = 12;

// child1 = {__proto: parent, a: 11, change: fn}
// child2 = {__proto: parent, a: 12, change: fn}

parent.show();// 1, [1,2,1],5
child1.show();// 11, [1,2,1],5
child2.show();// 12, [1,2,1],5

child1.change();
// Child.prototype = {b: [1,2,1,11], c: {demo: 4}, show: fn}
// child1 = {__proto: parent, a: 5, change: fn}

child2.change();
// Child.prototype = {b: [1,2,1,11,12], c: {demo: 5}, show: fn}
// child2 = {__proto: parent, a: 6, change: fn}

parent.show(); // 1, [1,2,1], 5

child1.show(); // 5, [1,2,1,11,12], 5
child2.show(); // 6, [1,2,1,11,12], 5

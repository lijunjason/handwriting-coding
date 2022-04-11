/**
 * @description JS基础
 */
/**
 * @method Object.create
 * @description 
 */
function create(proto) {
    function F() {};
    F.prototype = proto;
    return new F();
}
/**
 * @method myInstanceof
 * @description myInstanceof比较引用数据类型，typeof比较number, string, boolean, function, undefined, symbol,object（NULL,数组,对象）
 */
function myInstanceof(left, right) {
    let leftVal = left.__proto__,
        rightVal = right.prototype;
    while (true) {
        if (!leftVal) return false;
        if (leftVal === rightVal) return true;
        leftVal = leftVal.__proto__;
    }
}
// console.log(myInstanceof({}, Object));
/**
 * @method myNew
 * @description new操作符
 */
function myNew(fn, ...args) {
    if (typeof fn !== 'function') return;
    // 1. 创建空对象
    let obj = {};
    // 2. 函数的prototype赋值给对象的原型
    obj.__proto__ = fn.prototype;
    // 3. 将this指针指向新对象并执行函数
    let result = fn.apply(obj, args);
    // 4. 判断执行结果是否为对象返回结果，否则返回对象
    return result instanceof Object ? result : obj;
}
// function test(name, age) {
//     this.name = name;
//     this.age = age;
//     return {};
// }
// console.log(myNew(test, 'jason', '25'));
/**
 * @method myCall
 * @description call函数实现
 */
Function.prototype.myCall = function(obj, ...args) {
    obj = obj || globalThis;
    obj.temp = this;
    let result = obj.temp(...args);
    delete obj.temp;
    return result;
}
// function test(name, age) {
//     this.name = name;
//     this.age = age;
// }
// let obj = {
//     a: '1'
// }
// test.myCall(obj, 'jason', '25')
// console.log(obj);
/**
 * @method myApply
 * @description apply
 */
Function.prototype.myApply = function(obj, args){
    obj = obj || globalThis;
    obj.temp = this;
    let result = obj.temp(...args);
    delete obj.temp;
    return result;
}
function test1(name, age) {
    this.name = name;
    this.age = age;
}
let obj1 = {
    a: '1'
}
// test1.myApply(obj1,['j','24'])
// console.log(obj1);

/**
 * @method myBind
 * @description bind
 */
// bind 函数实现
Function.prototype.myBind = function(context) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
      throw new TypeError("Error");
    }
    // 获取参数
    var args = [...arguments].slice(1),
        fn = this;
    return function Fn() {
      // 根据调用方式，传入不同绑定值
      return fn.apply(
        this instanceof Fn ? this : context,
        args.concat(...arguments)
      );
    };
  };
  
function test2(name, age, height) {
    this.name = name;
    this.age = age;
    this.height = height
}
let obj2 = {
    a: '1'
}
// test2.myBind(obj2, '2', '3')('180');
// console.log(obj2);

/**
 * @method throttle
 * @description 节流函数
 */
const throttle = (fn, delay) => {
    let timer = null;
    return function() {
        const context = this,
            args = arguments;
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(context, args);
            timer = null;
        }, delay)
    }
}
function test() {
    console.log(1)
}
throttle(test, 1000);
/**
 * @method debounce
 * @description 防抖函数
 */
const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        const context = this,
            args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(context, args);
            timer = null;
        }, delay);
    }
}
debounce(()=> {}, 100);

/**
 * @method deepClone
 * @description 深拷贝
 */
const deepClone = (obj) => {
    if(!obj || typeof obj !== 'object') return obj;
    let result = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        }
    }
    return result;
}
let obj = {
    a: '1',
    obj: {
        b: '2'
    }
}
let objj = deepClone(obj);
objj.a = '2'
console.log(obj);


/**
 * @method 
 * @description 函数柯里化的实现
 */
 function curry(fn, ...args) {
    return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
  }
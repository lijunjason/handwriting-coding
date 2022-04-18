/**
 * @method
 * @description 工厂模式
 */
/*------------------------方法1简单-----------------------------*/
const createPerson = function (name) {
	let obj = {}

	obj.name = name
	obj.getName = function () {
		return this.name
	}

	return obj
}

let p1 = createPerson('jun')
let p2 = createPerson('yu')
/*-------------------------方法2----------------------------*/
function create(type, param) {
	if (this instanceof create) {
		return new this[type](param)
	} else {
		return new create(type, param)
	}
}
create.prototype = {
	person: Person,
	car: Car
}
/**
 * @method
 * @description 建造者模式
 */
function creator(param) {
	let _superFn = new SuperFn(param)

	_superFn.job = new CreateJob(param.job)
	_superFn.name = new CreateName(param.name)

	return _superFn
}
function SuperFn(params) {}
function CreateJob(params) {}
function CreateName(params) {}
/**
 * @method
 * @description 单例模式
 */

const singleInstance = (function () {
	let _unique = null
	const createObj = () => {
		return {
			a: 1,
			b: 2
		}
	}

	return function () {
		if (!_unique) {
			_unique = createObj()
		}
		return _unique
	}
})()

let s1 = singleInstance()
let s2 = singleInstance()

console.log(s1 === s2)

/**
 * @method
 * @description 装饰器模式
 */

function Car() {
	this.price = 10
}

function carWithHeatSeat(carClass) {
	carClass.hasHeatSeat = true
	carClass.price += 2
}

function carWithAutoMirror(carClass) {
	carClass.hasAutoMirror = true
	carClass.price += 0.8
}
// Car.prototype = {}
// {__proto: Car.prototype, price: 10}
let car1 = new Car();
carWithAutoMirror(car1);
carWithHeatSeat(car1);

console.log(car1.price);

/**
 * @method 
 * @description 组合模式 （多个组件组合） 
 */

/**
 * @method 
 * @description 发布订阅模式 
 */

/**
 * @method 
 * @description 策略模式 
 */

/**
 * @method 
 * @description 链模式 
 */

/**
 * @method 
 * @description 委托模式
 */

/**
 * @method 
 * @description 数据访问对象
 */

/**
 * @method 
 * @description 等待者模式
 */

/**
 * @method 
 * @description mvc模式
 */

/**
 * @method 
 * @description mvvm模式
 */
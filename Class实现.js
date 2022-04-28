//检测实例是不是new出来的
function _classCallCheck(instance, constructor) {
	if (!(instance instanceof constructor)) {
		throw new Error('Class constructor Child cannot be invoked without new')
	}
}
//constructor构造函数
//prprotoPropertys构造函数原型
//staticPropertys静态方法的描述
function definePropertys(target, arr) {
	for (let i = 0; i < arr.length; i++) {
		Object.defineProperty(target, arr[i].key, {
			...arr[i],
			configurable: true,
			enumerable: true,
			writable: true
		})
	}
}
function _createClass(constructor, protoPropertys, staticPropertys) {
	if (protoPropertys.length > 0) {
		definePropertys(constructor.prototype, protoPropertys)
	}
	if (staticPropertys.length > 0) {
		definePropertys(constructor, staticPropertys)
	}
}
let Parent = (function () {
	//写逻辑
	function P() {
		_classCallCheck(this, P)
		this.name = 'parent'
		//return {}
	}
	_createClass(
		P, //属性描述器
		[
			{
				key: 'eat',
				value: function () {
					console.log('吃')
				}
			}
		],
		[
			{
				key: 'b',
				value: function () {
					return 2
				}
			}
		]
	)
	return P
})()
let p = new Parent()
console.log(p.eat())

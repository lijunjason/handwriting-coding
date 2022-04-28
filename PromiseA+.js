/**
 * @method MyPromise
 * @description 实现Promise A+规范源码
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
	constructor(executor) {
		const resolve = value => {
			this.value = value;
			this.status = FULFILLED;
		}
		const reject = reason => {
			this.reason = reason;
			this.status = REJECTED;
		}

		try {
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}

	then(onResolved, onRejected) {
		onResolved = isFn(onResolved) ? onResolved : value => value;
		onRejected = isFn(onRejected) ? onRejected : err => { throw Error(err) };
		if (this.status === FULFILLED) {
			onResolved(this.value);
		}

		if (this.status === REJECTED) {
			onRejected(this.reason)
		}

		if (this.status === PENDING) {

		}
		
	}
}


function isFn(fn) {
	return typeof fn === 'function';
}

const p1 = new MyPromise((resolve, reject) => {

	setTimeout(() => {

		resolve('1111')
	})
})
p1.then(res => {
	console.log(res)
}, err => {
	console.log(err)
})

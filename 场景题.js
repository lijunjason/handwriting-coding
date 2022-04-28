/**
 * @method getBigNumSum
 * @description 实现非负大整数相加(字符串从尾部相加，大于10进一)
 */
function getBigNumSum(a, b) {
    let temp = 0, // 判断是否进位
        result = '';
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || temp) {
        temp += ~~a.pop() + ~~b.pop();
        result = temp % 10 + result;
        temp = temp > 9;
    }
    return result;
}
/**
 * @method 
 * @description 
 * 实现一个批量请求函数 multiRequest(urls, maxNum)，要求如下：
• 要求最大并发数 maxNum
• 每当有一个请求返回，就留下一个空位，可以增加新的请求
• 所有请求完成后，结果按照 urls 里面的顺序依次打出
 */
function multiRequest(urls, maxNum) {
    const len = urls.length;
    // 当前任务队列
    let result = new Array(len).fill(false);
    // 当前执行数量
    let count = 0;
    return new Promise((resolve, reject) => {
        // 并发执行maxNum个请求
        while (count < maxNum) {
            next();
        }
        const next = () => {
            let current = count++;
            // 处理边界条件
            if (current >= len) {
                // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
                !result.includes(false) && resolve(result);
                return;
            }
            const url = urls[current];
            fetch(url)
                .then((res) => {
                    result[current] = res;
                    // 请求没有全部完成, 就递归增加新请求
                    if (current < len) {
                        next();
                    }
                })
                .catch((err) => {
                    result[current] = err;
                    // 请求没有全部完成, 就递归增加新请求
                    if (current < len) {
                        next();
                    }
                })
        }
    })
}
/**
 * @method isPalindrome
 * @description 判断是否是回文数 'aaabbaaa' 栈方法
 */
function isPalindrome(str) {
    let stack = str.split('');
    let res = '';
    while (stack.length) {
        res += stack.pop();
    }
    return res == str;
}
/**
 * @method 
 * @description 最长回文子串(以每个元素为中心扩散，找最长回文子串。bab,baab) 'aabbccdef'
 */
function getLongestPalindrome(str) {
    let res = '';
    const len = str.length;
    const getPalindrome = (s, l, r) => {
        while (l >=0 && r < len && s[l] == s[r]) {
            l--;
            r++;        
        }
        // l+1, r-1-l-1+1
        if (r-l-1 > res.length) {
            res = s.slice(l+1, r);
        }
    }
    for (let i = 0; i < len; i++) {
        // 奇数
        getPalindrome(str, i, i);
        // 偶数
        getPalindrome(str, i, i + 1);
    }
    return res;
}
/**
 * @method 
 * @description 字符串出现的不重复最长长度和子串'abcacd'
 */
function getMaxLongestStr(str) {
    let res = '';
    let startIndex = 0;
    let map = new Map();
    const len = str.length;
    for (let i = 0; i < len; i++) {
        if (map.has(str[i])) {
            startIndex = Math.max(startIndex, map.get(str[i]) + 1);
        }
        if (i - startIndex + 1 > res.length) {
            res = str.slice(startIndex, i + 1);
        }
        map.set(str[i], i);
    }
    return res;
}
/**
 * @method 
 * @description 全排列 [1,2,3] 深度递归
 * []
 * [1]
 * [1,2],[1,3]
 * [1,2,3],[1,3,2]
 */
function fullPaiLie(arr) {
    let res = [];
    const helpFun = (path) => {
        if (path.length === arr.length) {
            res.push(path);
            return;
        }
        arr.forEach(item => {
            if(path.includes(item)) return;
            helpFun(path.concat(item));
        });
    }
    helpFun([]);
    return res;
}

/**
 * @method 
 * @description 原型链继承
 */
function superFun(name) {
    this.name = name;
}
function subFun(age) {
    this.age = age;
}
subFun.prototype = new superFun('jason');

/**
 * @method 
 * @description 构造函数继承
 */
 function superFun(name) {
    this.name = name;
}
function subFun(name, age) {
    superFun.call(this, name)
    this.age = age;
}

/**
 * @method 
 * @description 组合是继承
 */
 function superFun(name) {
    this.name = name;
}
function subFun(name, age) {
    superFun.call(this, name);
    this.age = age;
}
subFun.prototype = new superFun('jason');
/**
 * @method 
 * @description 原型方式
 */
 var person = {
    name : 'arzh',
    body : ['foot','hand']
}
function createObj(o) {
    function F() {};
    F.prototype = o;
    return new F();
}
let p1 = createObj(person);
let p1 = createObj(person);
/**
 * @method 
 * @description 寄生方式
 */
function createEnhanceObj(o) {
    let clone = Object.create(o);
    clone.getName = function (name) {

    }
    return clone;
}
/**
 * @method 
 * @description 寄生组合方式
 */
function superFun(name) {
    this.name = name;
}
function subFun(name, age) {
    superFun.call(this, name);
    this.age = age;
}
subFun.prototype = Object.create(superFun.prototype);
subFun.prototype.constructor = subFun;

/**
 * @method 
 * @description ES6 extends 继承
 */
/**
 * @method myJSONStringify
 * @description 手写JSONStringify进行深度递归
 */
function myJSONStringify(obj) {
    let type = typeof obj;
    if (type !== 'object') return obj;
    if (obj === null) {
        return `'${data}'`
    } else if (Array.isArray(obj)) {
        return `[${obj.map(item => myJSONStringify(item))}]`
    } else {
        let kvArr = Object.entries(obj);
        console.log(kvArr);
        let kvMap = kvArr.map(([k, v]) => {
            return `'${k}': ${myJSONStringify(v)}`;
        })
        return `{${kvMap.join(',')}}`
    }
}
let obj = {
    x: {n: 1, m: 2}, 
    y: [
        {
            a:1, 
            b: { d: 3} 
        },
        2,
        3
    ],
    z: { w: 1, c: 1}
}
// obj : number, object, array, null
// console.log(myJSONStringify(obj))
// console.log(JSON.stringify(obj))

/**
 * @method toTree()
 * @description 
 * // 转换前：
source = [{
            id: 1,
            pid: 0,
            name: 'body'
          }, 
          {
            id: 2,
            pid: 1,
            name: 'title'
          }, 
          {
            id: 3,
            pid: 2,
            name: 'div'
          }]
// 转换为: 
tree = [{
          id: 1,
          pid: 0,
          name: 'body',
          children: [{
            id: 2,
            pid: 1,
            name: 'title',
            children: [{
              id: 3,
              pid: 1,
              name: 'div'
            }]
          }
        }]
 */
function toTree(arr) {
    if (!Array.isArray(arr)) return arr;
    let result = [];
    let map = {};
    arr.forEach(item => {
        map[item.id] = item;
    })
    arr.forEach(item => {
        let parent = map[item.pid]
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    })
    return result;
}
source = [
    {
        id: 1,
        pid: 0,
        name: 'body'
    }, 
    {
        id: 2,
        pid: 1,
        name: 'title'
    }, 
    {
        id: 3,
        pid: 2,
        name: 'div'
    }
]
function flatten(arr) {
    return arr.reduce((pre, cur) => {
        let {id, pid, name, children = []} = cur;
        return pre.concat([{id, pid, name}], flatten(children));
    }, [])
}
// toTree(source)
// console.log(toTree(source));

/**
 * @method 
 * @description 合并两个升序数组 双指针
 */
function mergeUpArr(arr1, arr2) {
    let result = [];
    let i = 0, j = 0;
    while (i < arr1.length || j < arr2.length) {
        if ((arr1[i] && arr2[j] && arr1[i] < arr2[j]) || (arr1[i] && !arr2[j])) {
            result.push(arr1[i]);
            i++;
        }
        if ((arr2[j] && arr1[i] && arr2[j] <= arr1[i]) || (arr2[j] && !arr1[i])) {
            result.push(arr2[j]);
            j++; 
        }
    }
    return result;
}
console.log(mergeUpArr([1,5,6,7],[4,5,5]))

/**
 * @method 
 * @description 数字千元化处理
 */
 function toT(num) {
    let arr = num.toString().split('.');
    let intList = arr[0]?.split('') || [];
    let floatList = arr[1]?.split('') || [];
    const reg = /^,|,$/g;
    const intResult = (intList) => {
        return intList.reduceRight((pre, cur, i) => {
            if (i % 3 === 0) {
                cur = `,${cur}`
            }
            return `${cur}${pre}`;
        }, '').replace(reg, '');
    }
    const floatResult = (floatList) => {
        return floatList.reduce((pre, cur, i) => {
            if (i % 3 === 0) {
                cur = `,${cur}`
            }
            return `${pre}${cur}`;
        }, '').replace(reg, '');
    }
    return floatList.length ? `${intResult(intList)}.${floatResult(floatList)}` : intResult(intList);
}
/**
 * @method getLastNum
 * @description 1-10的数 随机取9次 输入剩余数
 * 思路:
 * 随机数1-10 ~~(Math.random() * 10 + 1)
 * 存储去除的9个数，数组[];
 * 将原数组取出的置为0
 * [1,2,3,4,5,6,7,8,9,10]
 * [0,0,3,0,0,0,0,0,0,0]
 * 
 */
function getLastNum() {
    let arr = Array(10).fill(0).map((item, i) => i + 1);
    let saveArr = [];
    while (saveArr.length !== 9) {
        let rNum = ~~(Math.random() * 10 + 1);
        if (saveArr.indexOf(rNum) === -1) {
            saveArr.push(rNum);
            arr.splice(rNum-1, 1, 0);
        }
    }
    return arr.filter(item => item)[0];
}
getLastNum();

/**
 * @method 
 * @description 手写Promise Promise.all Promise.race Promise.resolve Promise.reject
 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected'
class MyPromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = null;
        this.reason = null;

        this.resolvedCallbacks = [];
        this.rejectedCallbacks = [];

        const resolve = (v) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = v;
                this.resolvedCallbacks.forEach(cb => cb());
            }
        }
        const reject = (e) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = e;
                this.rejectedCallbacks.forEach(cb => cb());
            }
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error?.message || error);
        }
    }

    then(onResolved, onRejected) {
        onResolved = this.isFunction(onResolved) ? onResolved : v => v;
        onRejected = this.isFunction(onRejected) ? onRejected : e => { throw e };

        const promise2 = new MyPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = onResolved(this.value);
                        resolvePromise(promise2, x, resolve, reject);               
                    } catch (error) {
                        reject(error?.message || error);
                    }
                }) 
            }
            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error?.message || error);
                    }

                })
            }
            const pendingMicrotask = () => {
                this.resolvedCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = onResolved(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error?.message || error);
                        }
                    })

                })
                this.rejectedCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error?.message || error);
                        }
                    })
                })
            }
            switch (this.status) {
                case PENDING:
                    pendingMicrotask();
                    break;
                case FULFILLED:
                    fulfilledMicrotask();
                    break;
                case REJECTED:
                    rejectedMicrotask()
                    break;
            }
        })
        return promise2;
    }

    catch(fn) {
        return this.then(null, fn);
    }

    isFunction(fn) {
        return typeof fn === 'function';
    }

    static resolve(v) {
        if (v instanceof MyPromise) {
            return v;
        }
        return new MyPromise((resolve, reject) => {
            resolve(v);
        })
    }

    static reject(e) {
        return new MyPromise((resolve, reject) => {
            reject(e);
        })
    }

    /**
     * @method 
     * @description 返回最先执行完成的，改变状态
     */
    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(resolve, reject);
            }
        })
    }
    /**
     * @method 
     * @description 按顺序返回所有的值
     */
    static all(promises) {
        let result = [];
        let count = 0;
        const len = promises.length;
        return new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                promises[i].then(res => {
                    result[count] = res;
                    count++;
                    if (count === len) {
                        resolve(result);
                    }
                }, reject);
            }
        })     
    }

}

function resolvePromise(p, x, resolve, reject) {
    if (x === p) {
        return reject(new TypeError('Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>'));
    }
    if (x instanceof MyPromise) {
        x.then(resolve, reject);
    } else {
        resolve(x)
    }
}

const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    })
}).then((res)=>{
    console.log('then+' + res)
    return 2;
}, (err)=> {
    console.log(err)
}).then((res) => {
    console.log('then++' + res)
})

/**
 * @method 
 * @description 手写-查找数组公共前缀（美团）
 */

/**
 * @method 
 * @description 手写-发布订阅模式（字节）
 */

class EventBus {
    handles = {};
    static on(type, handle) {
        (this.handles[type] || []).push(handle);
    }
    static emit(type, params) {
        if (!this.handles[type]) {
            return  new Error('事件未注册');
        }
        this.handles[type].forEach(cb => cb(...params));
    }
    static off(type, handle) {
        if (!this.handles[type]) {
            return new Error('事件未注册');
        }
        if (!handle) {
            delete this.handles[type];
        } else {
            let index = this.handles[type].findIndex(fn => fn === handle);
            if (index === -1) return new Error('事件不存在');
            this.handles[type].splice(index, 1);
            if (!this.handles[type].length) {
                delete this.handles[type];
            }
        }
    }
}

/**
 * @method 
 * @description 手写-setTimeout 模拟实现 setInterval（阿里）
 */
 function myInterval(fn, time) {
    let timer = null;
    let isClear = false;
    function interval() {
        if (isClear) {
            isClear = false;
            clearTimeout(timer);
            return;
        }
        fn();
        timer = setTimeout(interval, time);
    }
    timer = setTimeout(interval, time);
    return () => {
        isClear = true;
    }
}
let clearMyInterval = myInterval(() => {
  console.log(111);
}, 1000);

setTimeout(() => {
    console.log(222);
    clearMyInterval();
}, 5000);


/**
 * @method 
 * @description 手写-怎么在制定数据源里面生成一个长度为 n 的不重复随机数组 能有几种方法 时间复杂度多少（字节）
 */

/**
 * @method 
 * @description 手写-如何找到数组中第一个没出现的最小正整数 怎么优化（字节）
 * 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

示例 1：

输入：nums = [1,2,0]
输出：3

示例 2：

输入：nums = [3,4,-1,1]
输出：2

示例 3：

输入：nums = [7,8,9,11,12]
输出：1
 */
/**
 * @method 
 * @description 手写-实现一个对象的 flatten 方法（阿里）
 * const obj = {
 a: {
        b: 1,
        c: 2,
        d: {e: 5}
    },
 b: [1, 3, {a: 2, b: 3}],
 c: 3
}

flatten(obj) 结果返回如下
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }
 */

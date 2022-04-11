/**
 * @method 
 * @description 实现日期格式化
 *  dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd') // 2020/12/01
    dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd') // 2020/04/01
    dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日') // 2020年04月01日
 */
function dateFormat(date, type) {
    let result = '';
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    result = type.replace('/yyy/', year);
    result = type.replace('/MM/', day);
    result = type.replace('/dd/', month);
    return result;
}
/**
 * @method 
 * @description 实现数组的乱序输出 [1,2,3,4,5]
 */
function getRandomArr(arr) {
    let length = arr.length,
        randomIndex;
    while (length) {
        randomIndex = ~~(Math.random() * length--);
        [arr[length], arr[randomIndex]] = [arr[randomIndex], arr[length]]
    }
    return arr;
}
/**
 * @method 
 * @description 实现数组元素求和(1维+多维) [1,2,3] [1,[2,3]]
 */
function arrSum(arr) {
    return arr.reduce((sum, i) => sum + i, 0);
}
/**
 * @method 
 * @description 数组扁平化
 */
function flatter(arr, deep) {
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
/**
 * @method 
 * @description 实现ES6 flat(Infinity);
 */
Array.prototype.myFlat = function(depth) {
    if(!Array.isArray(this) || depth <= 0) return this;
    while(this.some(item => Array.isArray(item)) && depth-- > 0) {
        this = [].concat(...this);
    }
    return this;
}
function _flat(arr, depth = 1) {
    if (!Array.isArray(arr) || depth < 1) return arr;
    return arr.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
            return prev.concat(_flat(cur, depth - 1));
        } else {
            return prev.concat(cur);
        }
    }, []);
}
// _flat([1,[2,[3]],4], 2);
/**
 * @method 
 * @description 实现数组去重[1,1,2,2]
 */
// function uniqueArr(arr) {
//     return Array.from(new Set(arr));
// }
function uniqueArr(arr) {
    let map = new Map();
    let result = [];
    for (let index = 0; index < arr.length; index++) {
        if (!map.has(arr[index])) {
            result.push(arr[index]);
        }
        map.set(arr[index], 1);
    }
    return result;
}
/**
 * @method 
 * @description 实现数组原型filter方法
 */
Array.prototype.myFilter = function(fn) {
    if(typeof fn !== 'function') {
        throw Error('参数必须为函数')
    }
    const result = [];
    for (let index = 0; index < this.length; index++) {
        fn(this[index]) && result.push(this[index]);
    }
    return result;
}
['1','2'].myFilter(item => item > 1)
/**
 * @method 
 * @description 实现数组原型map方法
 */
function myMap(arr, fn) {
    if(typeof fn !== 'function') {
        throw Error('参数必须为函数')
    }
    let result = [];
    for (let index = 0; index < arr.length; index++) {
        result.push(fn(arr[index]))
    }
    return result;
}
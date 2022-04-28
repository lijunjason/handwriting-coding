const getScrollParent = (el) => {
    let parentNode = el.parentNode;
    while(parentNode){
        if(/(scroll)|(auto)/.test(getComputedStyle(parentNode)['overflow'])){
            return parentNode;
        }
        parentNode = parentNode.parentNode;
    }
    return parentNode;
}
function loadAsyncImg(src, resolve, reject){
    let img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
}

// 防抖
function debounce(func, wait=0) {    
    if (typeof func !== 'function') {
        throw new TypeError('need a function arguments')
    }
    let timeid = null;
    let result;

    return function() {
        let context = this;
        let args = arguments;

        if (timeid) {
            clearTimeout(timeid);
        }
        timeid = setTimeout(function() {
            result = func.apply(context, args);
        }, wait);

        return result;
    }
}

const Lazy = (Vue) => {
    // 把每张图片当作的一个对象来处理
    class ReactiveListener{
        constructor({el, src, options, elRender}){
            this.el = el;                   // 图片html元素
            this.src = src;                 // 图片src
            this.options = options;
            this.status = {loaded: false};    // 记录图片加载的状态
            this.elRender = elRender;
        }
        // 判断是否在可加载区域
        checkInView(){
            let bcr = this.el.getBoundingClientRect();
            return bcr.top < window.innerHeight*(this.options.preload || 1.3);
        }
        // 加载图片
        load(){
            this.elRender(this, 'loading');
            loadAsyncImg(this.src, () => {
                this.elRender(this, 'finish');
            }, () => {
                this.elRender(this, 'error');
            })
            this.status.loaded = true;
        }
    }


    // 封装懒加载的逻辑
    return class LazyClass{
        constructor(options){
            this.options = options;
            this.hasAddScrollListener = false;
            this.queueListener = [];
        }

        scrollHandler(e){
            console.log('scroll')
            // 滚动的时候判断每张图片是否进入可视区域
            this.queueListener.forEach(listener => {
                let catIn = listener.checkInView();
                catIn && !listener.status.loaded && listener.load();
            })
        }

        add(el, bindings, vnode, oldVnode){
            // 找到父元素，给父元素监听滚动事件，自定义指令在bind的时候还获取不到el，所以要用到nextTick
            Vue.nextTick(() => {
                const parentNode = getScrollParent(el);
                if(parentNode && !this.hasAddScrollListener){
                    this.hasAddScrollListener = true;
                    parentNode.addEventListener('scroll', debounce(this.scrollHandler.bind(this), 100));
                }
                // 把每张图片添加到队列中
                const listener = new ReactiveListener({
                    el: el,
                    src: bindings.value,
                    options: this.options,
                    elRender: this.elRender,
                });
                this.queueListener.push(listener);
                // 首次判断一下图片是否在可视区域
                this.scrollHandler()
            })
        }

        elRender(listener, status){
            let el = listener.el;
            let src = '';
            switch(status){
                case 'loading':
                    src = this.options.loading || '';
                    break;
                case 'error':
                    src = this.options.error || '';
                    break;
                default:
                    src = listener.src;
                    break;
            }
            el.setAttribute('src', src);
        }
    }
}

const VueLazyLoad = {
    install(Vue, options){
        // 把懒加载的逻辑封装在一个类里面
        const lazyClass = Lazy(Vue);
        const lazy = new lazyClass(options);
        Vue.directive('lazy', {
            bind: lazy.add.bind(lazy),
        })
    }
}

// 使用
const loading = "./image/loading.gif";
const error = './image/error.png';
Vue.use(VueLazyLoad, {
    preload: 1.3,
    loading,
    error,
})
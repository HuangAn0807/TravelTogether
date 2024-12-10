/**
 * 
 * @param fn 需要节流的函数
 * @param delay 延迟时间
 * @returns 返回一个新的函数
 */
export function throttle(fn:Function, delay:number) {
    let timer:any = null;
    return function (this:any,...args:any[]) {
        let context= this;
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, delay);
        }
    };
}
/**
 * 
 * @param fn 需要防抖的函数
 * @param delay 延迟时间
 * @returns 返回一个新的函数
 */
export function debounce(fn:Function, delay:number) {
    let timer:any = null;
    return function (this:any,...args:any[]) {
        let context= this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}
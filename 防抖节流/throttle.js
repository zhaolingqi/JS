var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    console.log(e)
    container.innerHTML = count++;
};

// 使用时间戳
// function throttle(func, wait) {
//     let previous = 0
//     let args, context
//     return function() {
//         let now = +new Date()
//         args = arguments
//         context = this
//         if(now - previous > wait) {
//             func.apply(context, args)
//             previous = now
//         }
//     }
// }

// 触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。
// function throttle(func, wait) {
//     let args, context
//     let timeout = null
//     return function() {
//         args = arguments
//         context = this
//         if(!timeout) {
//             timeout = setTimeout(()=>{
//                 timeout = null
//                 func.apply(context, args)
//             }, wait)
//         } 
//     }
// }

//综合
// function throttle(func, wait) {
//     let timeout, context, args, result
//     let previous = 0
//     let later = function() {
//         previous = +new Date()
//         timeout = null
//         func.apply(context, args)
//     }
//     return throttled = function() {
//         var now = +new Date();
//         //下次触发 func 剩余的时间
//         var remaining = wait - (now - previous);
//         context = this;
//         args = arguments;
//          // 如果没有剩余的时间了或者你改了系统时间
//         if (remaining <= 0 || remaining > wait) {
//             if (timeout) {
//                 clearTimeout(timeout);
//                 timeout = null;
//             }
//             previous = now;
//             func.apply(context, args);
//         } else if (!timeout) {
//             timeout = setTimeout(later, remaining);
//         }
//     };
// }

// function throttle(func, wait) {
//     let args, context, timeout
//     let previous = 0

//     return function() {
//         args = arguments
//         context = this
//         let now = +new Date()
//         let remaining = wait - (now - previous)
//         if(remaining <= 0 || remaining > wait) {
//             if(timeout) {
//                 clearTimeout(timeout)
//                 timeout = null
//             }
//             func.apply(context, args)
//             previous = now
//         } else if(!timeout) {
//             timeout = setTimeout(function() {
//                 func.apply(context, args)
//                 timeout = null
//                 previous = +new Date()
//             }, remaining)
//         }
//     }
// }


// function throttle(func, wait, options) {
//     var timeout, context, args, result;
//     var previous = 0;
//     if (!options) options = {};

//     var later = function() {
//         previous = options.leading === false ? 0 : new Date().getTime();
//         timeout = null;
//         func.apply(context, args);
//         if (!timeout) context = args = null;
//     };

//     var throttled = function() {
//         var now = new Date().getTime();
//         if (!previous && options.leading === false) previous = now;
//         var remaining = wait - (now - previous);
//         context = this;
//         args = arguments;
//         if (remaining <= 0 || remaining > wait) {
//             if (timeout) {
//                 clearTimeout(timeout);
//                 timeout = null;
//             }
//             previous = now;
//             func.apply(context, args);
//             if (!timeout) context = args = null;
//         } else if (!timeout && options.trailing !== false) {
//             timeout = setTimeout(later, remaining);
//         }
//     };
//     return throttled;
// }


// 设置options做为第三个参数，根据传值判断
//leading: false 表示禁用第一次执行
//trailing: false 表示禁用停止触发的回调
// 两者不能同时为零
function throttle(func, wait, options) {

    let args, context, timeout
    let previous = 0
    if(!options) options = {}

    return function() {
        let now = +new Date()
        if(!previous && options.leading === false) previous = now
        let remaining = wait - (now - previous)
        context = this
        args = arguments
        if(remaining <=0 || remaining > wait) {
            if(timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            func.apply(context, args)
            // if(!timeout) {
            //     context = args = null
            // }
        } else if(!timeout && options.trailing !== false) {
            timeout = setTimeout(()=>{
                previous = options.leading === false ? 0 : +new Date()
                timeout = null
                func.apply(context, args)
                // if(!timeout) context = args = null
            }, remaining)
        }
    }
}




// JS在事件处理函数中提供事件对象event
container.onmousemove = throttle(getUserAction, 1000, {trailing:true});
// container.onmousemove = getUserAction
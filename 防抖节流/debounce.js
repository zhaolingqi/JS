var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    console.log(e)
    container.innerHTML = count++;
};

// 第一版
// function debounce(func, wait) {
//     var timeout
//     return function() {
//         clearTimeout(timeout)
//         timeout = setTimeout(func, wait)
//     }
// }

// 第二、三版 将this指针指向正确的对象，添加event
// setTimeout返回定时器ID，可利用clearTimeout(ID)将定时器清除
// function debounce(func, wait) {
//     var timeout
//     return function() {
//         // var context = this
//         // var args = arguments
//         clearTimeout(timeout)
//         timeout = setTimeout(() => {
//             func.apply(this, arguments)
//         }, wait)
//     }
// }

// 第四版 考虑立即执行
function debounce(func, wait, immediate) {
    var timeout
    return function () {
        // var context = this
        var args = arguments
        if (timeout) clearTimeout(timeout)
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout
            timeout = setTimeout(() => { timeout = null }, wait)
            if (callNow) func.apply(this, args)
        } else {
            timeout = setTimeout(() => {
                func.apply(this, args)
            }, wait)
        }
    }
}


// JS在事件处理函数中提供事件对象event
container.onmousemove = debounce(getUserAction, 1000, true);
// container.onmousemove = getUserAction



function debounce1(func, wait) {
    let timeout
    let args
    return function() {
        args = arguments
        if(timeout) clearTimeout(timeout)
        timeout = setTimeout(function() {
            func.call(this, args)
        }, wait)
    }
}
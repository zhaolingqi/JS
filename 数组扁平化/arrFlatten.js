
// reduce 递归
// function flatten(arr) {
//     return arr.reduce((pre, e, index) => {
//         let res = []
//         if (Array.isArray(e)) {
//             res = flatten(e)
//         } else res.push(e)
//         return pre.concat(res)

//     }, [])
// }

// 如果数组的元素都是数字，可以使用toString方法

// function flatten(arr) {
//     return arr.join(',').split(',').map((e)=>{return Number(e)})
// }

// 使用Array.flat

// 使用扩展运算符
// function flatten(arr) {
//     while(arr.some((e) => Array.isArray(e))) {
//         arr = [].concat(...arr)
//     }
//     return arr
// }

// underscore中数组扁平化方法
/**
 * 
 * @param {Array} input 要处理的数组
 * @param {boolean} shallow  是否只扁平一次
 * @param {boolean} strict  是否严格处理元素， 若strict为true 过滤非数组元素
 * @param {Array} output  方便递归传递的参数
 */

function flatten(input, shallow, strict, output) {
    output = output || []
    let idx = output.length
    for(let i = 0, len = input.length; i < len; i++) {
        let val = input[i]
        if(Array.isArray(val)) {
            if(shallow) {
                let j = 0
                while(j < val.length) {
                    output[idx ++] = val[j++]
                }
            } else {
                flatten(val, shallow, strict, output)
                idx = output.length
            }
        }else if(!strict){
            output[idx++] = val
        }
    }
    return output
}



var arr = [1, [2, 3, 4,[4,[1],[5,6,7,[8,4,[10],12],14]], [3, 4]]];
console.log(flatten(arr, true, false)) // [1, 2, 3, 4]
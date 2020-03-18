/**
 * 
 * @param {Array} arr 
 */

// 1. 利用indexOf
// function uniqueArr(arr) {
//     let res = []
//     for(let i = 0; i < arr.length; i++) {
//         if(res.indexOf(arr[i]) === -1) {
//             res.push(arr[i])
//         }
//     }
//     return res
// }

// 2， 利用Set
// function uniqueArr(arr) {
//     return [...new Set(arr)]
// }

// 3. 利用object中的属性不能重复的特点
function uniqueArr(arr) {
    let obj = {}
    return arr.filter((e, index)=>{
        return obj.hasOwnProperty(typeof e + JSON.stringify(e)) ? false : obj[typeof e + JSON.stringify(e)] = true
    })
}

// 4. 排序后去重
// function uniqueArr(arr) {
//     let res = []
//     let sortedArr = arr.concat().sort() // 不修改原数组
//     console.log(sortedArr)
//     let pre
//     for(let i = 0; i < arr.length; i++) {
//         // 如果是第一个元素 或者 相邻的元素不同
//         if(!i || pre !== sortedArr[i]) {
//             res.push(sortedArr[i])
//         }
//         pre = sortedArr[i]
//     }
//     return res
// }






console.log(uniqueArr([1, '1',1, '1',2,4,2,6,'2','5',6,7,3,1,2,'5',{value: 1},{value: 2}]))
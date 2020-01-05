// let arr = [1,2,3]
// let newArr = arr
// newArr.push(5)
// console.log(arr, newArr)

function shallowCopy(obj) {
    // 判断obj是否为一个对象
    if(typeof obj !== 'object') return 'obj is not an object!'

    // 判断传入的obj是数组还是对象
    let newObj = Array.isArray(obj) ? [] : {}

    // 将obj中的每项数据复制
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}

function deepCopy(obj) {
    // 判断obj是否为一个对象
    if(typeof obj !== 'object') return 'obj is not an object!'

    // 判断传入的obj是数组还是对象
    let newObj = Array.isArray(obj) ? [] : {}

    // 将obj中的每项数据复制
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
        }
    }
    return newObj
}


let arr = [1,2,3]
let obj = {
    value: 1,
    value2: 3,
    name: 15,
    habbits: ['123','456']
}
let newArr = deepCopy(obj)
newArr.name = 7
newArr.habbits.push('1233')
console.log(obj,newArr)
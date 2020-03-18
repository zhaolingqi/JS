// 基础用法
// let message = `Hello world`
// console.log(message)  // Hello World
// console.log(typeof message) //string
// console.log(message.length) // 11

// // 多行字符串
// let mess = `Mutiline
// string
// 121`
// console.log(mess)

// 字符串占位符
function passthru(literals, ...substitutions) {
    let result = ""

    for(let i = 0; i < substitutions.length; i++) {
        result += literals[i]
        result += substitutions[i]
        // console.log(literals[i],substitutions[i])
    }

    result += literals[literals.length - 1]

    return result
}

let count = 10, price = 0.25
let message = passthru`${count} items costs $${(count * price).toFixed(2)}`
console.log(message)




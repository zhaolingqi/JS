function a () {
    this.b = function () {}
}
console.log(a.b)
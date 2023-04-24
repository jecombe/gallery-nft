const array = {
  ["yoyoy"]: {
    address: ["1"],
  },
  ["ccccc"]: {
    address: ["1", "2"],
  },
}
let length = 0
let obj = {}
Object.keys(array).map((e) => {
  if (array[e].address.length > length) {
    obj = array[e]
  }
})
console.log(obj)

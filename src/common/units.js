//防抖
export function debounce(func, delay) {
  let timer = null
  return function (...args) { //可以传入多个参数
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
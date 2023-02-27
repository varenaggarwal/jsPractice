/**
 * Memoizer function to cache the result of a function with n level of cache
 * @param {Function} func The Callback function to be memoized
 * @returns {Function} The memoized function
 */
const memoizer = (func) => {
  const cache = {};
  return (...args) => {
    console.log("args", args);
    const key = JSON.stringify(args);
    console.log("key", key);
    console.log("cache", cache);
    if (!cache[key]) {
      cache[key] = func(...args);
    }
    return cache[key];
  };
};
/**
 * Add two numbers
 * @param {Number} a Number to be added
 * @param {Number} b Number to be added
 * @returns
 */
const add = (a, b) => {
  console.log("processing... ");
  console.log("a", a);
  console.log("b", b);
  return a + b;
};
const memoizedAdd = memoizer(add);
console.log(memoizedAdd(1, 2));
console.log(memoizedAdd(1, 2));

/**
 * Fibonacci function
 * @param {Number} n
 * @returns {Number} The nth fibonacci number
 */
const fib = (n) => {
  let a = 0;
  let b = 1;
  let c = 0;
  for (let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  console.log("COMPUTING FIB");
  return n > 0 ? b : a;
};
/**
 * Shallow compare two arrays
 * @param {Array} arr1 Array to be compared
 * @param {Array} arr2 Array to be compared
 * @returns {Boolean} True if both arrays are equal
 */
const shallowCompare = (arr1, arr2) => {
  if (arr1 && arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    } else {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
          return false;
        }
      }
      return true;
    }
  }
  return false;
};
/**
 * Memoizer function to cache the result of a function with one level of cache
 * @param {Function} func The function to be memoized with one level of cache
 * @returns {Function} The memoized function with one level of cache
 */
const memoizerLevel1 = (func) => {
  let resultFunction = null;
  let argsArray;
  return (...args) => {
    if (!shallowCompare(args, argsArray)) {
      argsArray = args;
      resultFunction = func(...args);
    }
    return resultFunction;
  };
};
const memoziedFib = memoizerLevel1(fib);

console.log(memoziedFib(10));
console.log(memoziedFib(10));

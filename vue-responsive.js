// Vue 响应式原理

// 触发更新视图
function updateView() {
  console.log("update success");
}

// 重新定义数组 原型
const oldArrayProperty = Array.prototype;

// 创建 新对象，原型指向 oldArrayProperty，再扩展新的方法就不会影响原型
const arrPrototype = Object.create(oldArrayProperty);

  // 遍历一些常用的数组方法，为它们添加方法
["push", "pop", "shift", "unshift", "splice"].forEach((methodsName) => {
  arrPrototype[methodsName] = function () {
    // 重写原型上的方法
    updateView(); // 触发视图更新
    oldArrayProperty[methodsName].call(this, ...arguments); // 调用原生方法，把this传过去
		// 等于 Array.prototype.push.call(this, ...arguments)
  };
});

// 重新定义 响应式属性，监听起来
function defineReactive(target, key, value) {
  // 深度监听
  observer(value);

  // 核心 API
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        // 深度监听
        observer(newValue);
        // 设置新的值
        // 注意，value一直在闭包中，此处设置完之后再get也是undefined
        value = newValue;
        // 触发更新视图
        updateView();
      }
    },
  });
}

// 监听对象属性
function observer(target) {
  if (typeof target !== "object" || target === null) {
    // 不是对象或数组
    return target;
  }

  if (Array.isArray(target)) {
    target.__proto__ = arrPrototype;
    // 如果是数组就把target的原型指向数组原型
  }

  // 重新定义各个属性（for in 也可以遍历数组）
  for (let key in target) {
    defineReactive(target, key, target[key]);
  }
}

// 准备数据
const data = {
  name: "Noah",
  age: 20,
  info: {
    address: "杭州",
  },
  nums: [1, 2, 3, 4, 5, 6],
};

// 监听数据
observer(data);

// 测试
// data.name = "Kirito";
// data.age = 2;
// data.info.address = "余杭";
// data.x = "3.1415926";
// delete data.name;
// console.log(data.name); // undefined
// console.log(data.x); // 3.1415926
data.nums.pop()
console.log(data.nums);
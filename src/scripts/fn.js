/**
 * 功能
 */

'use strict';

// 随机排序
function randomSort(arr, newArr) {
  // 如果原数组arr的length值等于1时，原数组只有一个值，其键值为0
  // 同时将这个值push到新数组newArr
  if(arr.length == 1) {
    newArr.push(arr[0]);

    return newArr; // 相当于递归退出
  }

  // 在原数组length基础上取出一个随机数
  var random = Math.ceil(Math.random()*arr.length) - 1;
  // 将原数组中的随机一个值push到新数组newArr中
  newArr.push(arr[random]);
  // 对应删除原数组arr的对应数组项
  arr.splice(random,1);

  return randomSort(arr, newArr);
}

// 测试

//var arr = [1,2,3,4,5,6,7,8,9,10];
// var arr = [{a:1},{b:2},{c:3},{d:4},{f:6}];
// var newArr = [];

// randomSort(arr, newArr);
// console.log(newArr);
/**********************************************************/

// 排序
// var arr = [3,2,1,10,0];
// console.log(arr.sort((a,b)=>a-b));

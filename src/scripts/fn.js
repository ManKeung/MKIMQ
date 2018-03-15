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

/*{ // 验证用户是否离开页面
    // 兼容性：IE10+，Firefox10+,Chrome14+,Opera12.1+,Safari7.1+

  var hiddenProperty = 'hidden' in document ? 'hidden' :
  'webkitHidden' in document ? 'webkitHidden' :
  'mozHidden' in document ? 'mozHidden' : null;
  var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');

  document.addEventListener(visibilityChangeEvent, function() {

    if(!document[hiddenProperty]) {

      document.title = 0;
    } else {
      document.title = 1;
    }
  });

}*/
/**********************************************************/

// 用户选择类容
/*function getTxt() { // 方法要结合事件

  var txt = null;

  if(window.getSelect) {
    txt = window.getSelection().toString(); // 转化成字符串
  }else if(document.selection) {
    txt = document.selection.createRang().txt; // ie 写法
  }else {
    txt = 'no selection!!!'
  }

  return txt;
}*/
/**********************************************************/

/**
 * 基础常用功能函数
 */
'use strict';

// 绑定事件
function on(obj, type, fn) {

  var dom = isString(obj)?$id(obj):obj;

  if(dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  }else if(dom.attachEvent) {
    dom.attachEvent('on' + type, fn);
  }
}

// 解除事件
function un(obj, type, fn) {
  var dom = isString(obj)?$id(obj):obj;

  if(dom.removeEventListener) {
    dom.removeEventListener(type, fn);
  }else if(dom.detachEvent) {
    dom.detachEvent('on' + type, fn);
  }
}

// 隐藏
function hide(obj) {
  css(obj, 'display', 'none');
}

// 显示
function show(obj) {
  css(obj, 'display', 'block');
}

/**********************************************************/

// 事件
// 获取事件对象
function getEvent(event) {

  return event?event:window.event;
}

// 获取目标元素
function getTargent(event) {
  var e = getEvent(event);

  return e.event.target || e.srcElement;
}

// 阻止默认行为
function preventDefault(event) {
  var e = getEvent(event);

  if(e.preventDefault) {
    e.preventDefault();
  }else {
    e.returnValue = false;
  }
}

// 阻止冒泡
function stopPropagation(event) {
  var e = getEvent(event);

  if(e.stopPropagation) {
    e.stopPropagation();
  }else {
    e.cancelBubble = true;
  }
}
/**********************************************************/

// 选择器
// ID
function $id(id) {

  return document.getElementById(id);
}

// tag
function $tag(tag) {

  return document.getElementsByTagName(tag);
}

// class
function $class(className) {
  var i = 0, len = 0, dom = [], arr = [];

  if(document.getElementsByClassName) { // 支持直接选择

    return document.getElementsByClassName(className);
  }else {

    dom = $tag('*');

    for(i,len = dom.length; i < len; i++) {
      if(dom[i].className) {
        arr.push(dom[i]);
      }
    }
  }

  return arr;
}

// h5选择器
function $all(sel) { // 选择的是集合

  return document.querySelectorAll(sel);
}

function $(sel) { // 选择单个

  return document.querySelector(sel);
}
/**********************************************************/

// css样式
function css(obj, attr, value) {
  if(arguments.length == 2) { // 两个参数说明获得属性值
    if(obj.currentStyle){ // IE

      return obj.currentStyle[attr];
    }else {

      return getComputedSyle(obj, null)[attr];
    }
  }else if(arguments.length == 3) { // 三个参数设置属性

    return obj.style[attr] = value;
  }else{
    console.error('css出错了');
  }
}
/**********************************************************/

// 属性
// 获取或设置
function attr(obj, attr, value) {
  var i = 0, len = 0;

  if(obj.length) {
    if(value) {
      for(i = 0, len = obj.length; i < len; i++) {
        obj[i].setAttribute(attr, value);
      }
    }else {

      return obj[0].getAttribute(attr);
    }
  }else {
    if(value) {
      obj.setAttribute(attr, value);
    }else {

      return obj.getAttribute(attr);
    }
  }
}

// 删除
function removeAttr(obj, attr) {
  var i = 0, len =0;
  if(obj.length) {
    for(i = 0, len = obj.length; i < len; i++) {
      obj[i].removeAttribute(attr);
    }
  }else {
    dom.removeAttribute(attr);
  }
}
/**********************************************************/

// 动态添加class
// 增加class
function addClass(obj, name) {
  var i = 0, len = 0;

  if(obj.length) {
    for(i = 0, len = obj.length; i < len; i++) {
      addName(obj[i]);
    }
  }else {
    addName(obj);
  }

  function addName(obj) {
    obj.className = obj.className + ' ' + name; // 把原先的class属性加上
  }
}

// 删除class
function removeClass(obj, name) {
  var i = 0, len = 0;

  if(obj.length) {
    for(i = 0, len = obj.length; i < len; i++) {
      removeName(obj[i]);
    }
  }else {
    removeName(obj);
  }

  function removeName(obj) {
    obj.className = obj.className.replace(name, '');
  }
}

// 判断是否有
function hasClass(obj, name) {
  var i = 0, len = 0, flag = true;

  for (var i = 0, len = obj.length; i < len; i++) {
    flag = flag && check(obj[i], name);
  }

  return flag;

  //  判断单个元素
  function check(el, name) {

    return -1 < (' ' + el.className + ' ').indexOf(' ' + name + ' ');
  }
}

// 获取
function getClass(obj) {

  return trim(obj.className).split(' ');
}
/**********************************************************/

// 字符串操作
// 去除左边空格
function ltrim(str) {

  return str.replace(/(^\s*)/g, '');
}

//  去除右边空格
function rtrim(str) {

  return str.replace(/(\s*$)/g, '');
}

// 去除两边空格
function trim(str) {

  return str.replace(/(^\s*)|(\s*$)/g, '');
}

//  去除标签
function eltrim(str) {

  return str.replace(/<.*?>/ig,"");
}

// 随机数
function random(begin, end) {

  return Math.floor(Math.random() * (end - begin)) + begin;
}
/**********************************************************/

// 数据类型判断
// 是不是数字
function isNumber(val) {

  return typeof val === 'number' && isFinite(val);
}

// 是不是布尔
function isBoolean(val) {

  return typeof val === 'boolean';
}

// 是不是字符
function isString(val) {

  return typeof val === 'string';
}

// 是不是undefined
function isUndefined(val) {

  return typeof val === 'undefined';
}

//  是不是对象
function isObj(str) {
  if(str === null || typeof str === 'undefined') {

    return false;
  }

  return typeof str === 'object';
}

//  是不是null
function isNull(val) {

  return val === null;
}

//  是不是数组
function isArray(arr) {
  if(arr === null || typeof arr === 'undefined') {

    return false;
  }else {

    return arr.constructor === Array;
  }
}
/**********************************************************/

// json
// json转字符串
function sjson(json) {

  return JSON.stringify(json);
}

// 字符串转json
function json(str) {

  return eval(str);
}
/**********************************************************/

// 宽高 左右偏移 滚动
// 元素的宽高
// width/height  + border  +  padding
// left、top距离上级盒子（最近的带有定位）左边的位置 父级没定位以body为准
function offset(obj) {

  return {
    width: obj.offsetWidth,
    height: obj.offsetHeight,
    top: obj.offsetTop,
    left: obj.offsetLeft
  }
}

// 窗口滚动的距离
function scroll() {
  if(window.pageYOffset != null) { // ie9+ 和其他浏览器

    return {
      top: window.pageYOffset,
      left: window.pageXOffset
    }
  }else if(document.compatMode == 'CSS1Compat') { // 声明的了 DTD
    // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>

    return {
      top: document.documentElement.scrollTop,
      left: document.documentElement.scrollLeft
    }
  }

  return  {
    top: document.body.scrollTop,
    left: document.body.scrollLeft
  }
}

// 屏幕的宽度
function screen() {

  return {
    width: window.screen.width,
    height: window.screen.height
  }
}

// 可视区域
function client() {
        if(window.innerWidth != null)  // ie9 +  最新浏览器
        {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
        else if(document.compatMode === "CSS1Compat")  // 标准浏览器
        {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
        return {   // 怪异浏览器
            width: document.body.clientWidth,
            height: document.body.clientHeight

        }
    }

// function client() {
//   if(window.innerWidth != null) { // ie9+ 最新浏览器

//     return {
//       width: window.innerWidth,
//       height: window.innerHeight
//     }
//   }else if(document.compatMode === 'CSS1Compat') { // 标准浏览器

//     return {
//       width: document.documentElement.clientWidth,
//       height: document.documentElement.clientHeight
//     }
//   }

//   return { // 怪异浏览器
//     width: document.body.clientWidth,
//     height: document.body.clientHeight
//   }
// }
/**********************************************************/

// DOM操作
// 创建标签
function el(el) {

  return document.creatElement(el);
}

// 内容
function html(obj, value) {

  if(obj.length) {
    if(value) {
      var i = 0, len = 0;
      for(i = 0, len = obj.length; i < len; i++) {
        obj[i].innerHTML = value;
      }
    }else {
      return obj[0].innerHTML;
    }
  }else {
    if(value) {
      obj.innerHTML = value;
    }else {
      return obj.innerHTML;
    }
  }
}
/**********************************************************/

// 移动端判定
function isMobile() {
  var suserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = suserAgent.match(/ipad/i) == 'ipad';
  var bIsIphoneOs = suserAgent.match(/iphone os/i) == 'iphone os';
  var bIsMidp = suserAgent.match(/midp/i) == 'midp';
  var bIsUc7 = suserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
  var bIsUc = suserAgent.match(/ucweb/i) == 'ucweb';
  var bIsAndroid = suserAgent.match(/android/i) == 'android';
  var bIsCE = suserAgent.match(/window ce/i) == 'window ce';
  var bIsWM = suserAgent.match(/window mobile/i) == 'window mobile';

  if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {

    return true;
  }else {

    return false;
  }
}

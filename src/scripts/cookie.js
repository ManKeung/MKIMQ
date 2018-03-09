/**
 * 本地存储
 */
'use strict';

// coockie
function setCookie(name, value, days, path) {
  var name = escape(name); // escape()编码
  var value = escape(value);
  days = days == ''?1:days; // 天数
  path = path == ''?'/':';path'+path;
  var expires = new Date();

  expires.setTime(expires.getTime() + days*24*60*60*1000);
  _expires = (typeof hours) == 'string'?'':';exipires='+expires.toUTCString();
  document.cookie = name+'='+value+_expires+path;
}

// 获取cookie值
function getCookie(name) {
  var name = escape(name);
  // 读取值
  var allcookies = document.cookie;

  // 查找名为name的cookie的开始位置
  name += '=';
  var pos = allcookies.indexOf(name);
  // 如果找到了具有该名字的cookie，那么提取并使用它的值
  if(pos != -1) {
    var start = pos + name.length;
    var end = allcookies.indexOf(';', start);

    if (end == -1) {
      end = allcookies.length;
    }

    var value = allcookies.substring(start, end);

    return unescape(value); // 解码
  }else {

    return '';
  }
}

// 删除cookie
function deleteCookie(name, path) {
  var name = escape(name);
  var expires = new Date(0)
  path = path == ''?'':';path'+path;
  document.cookie = name+'='+';expires='+expires.toUTCString()+path;
}

/**
 * 多个属性运动框架
 */

'use strict';

function animate(obj, json, fn) {
  clearInterval(obj.timer);

  obj.timer = setInterval(function() {
    var flag = true;
    for(var attr in json) {
      // 开始遍历 json
      // 计算步长 用 target 位置 减去 当前的位置 除以 10
      // console.log(attr);
      var current = 0;

      if(attr == 'opacity') {
        current = Math.round(parseInt(css(obj, attr)*100)) || 0;
      }else {
        current = parseInt(css(obj, attr)); // 数字
      }

      // 目标位置就是 属性值
      var step = (json[attr] - current) / 10; // 步长
      set = step > 0 ? Math.ceil(step) : Math.floor(step);

      // 判断透明度
      if(attr == 'opacity') { // 判断用户有没有输入 opacity
        if('opacity' in obj.style) { // 判断 我们浏览器是否支持opacity
          obj.style.opacity = (current + step) / 100;
        }else {
          obj.style.filter = 'alpha(opacity = ' + (current + step) * 10 +')';
        }
      }else if(attr == 'zIndex'){
        obj.style.zIndex = json[attr];
      }else {
        obj.style[attr] = current + step + 'px';
      }

      if(current != json[attr]) { // 只要其中一个不满足条件 就不应该停止定时器  这句一定遍历里面
        flag = false;
      }
    }

    if(flag) { // 用于判定定时器的条件
      clearInterval(obj.timer);

      if(fn) {
        fn();
      }
    }
  }, 30);
}

/**
 * cssTransfrom
 */
function cssTransform(el,attr,val) {
  if(!el.transform){
    el.transform = {};
  }
  if(arguments.length>2) {
    el.transform[attr] = val;
    var sVal = "";
    for(var s in el.transform){
      switch(s) {
        case "rotate":
        case "skewX":
        case "skewY":
          sVal +=s+"("+el.transform[s]+"deg) ";
          break;
        case "translateX":
        case "translateY":
          sVal +=s+"("+el.transform[s]+"px) ";
          break;
        case "scaleX":
        case "scaleY":
        case "scale":
          sVal +=s+"("+el.transform[s]+") ";
          break;
      }
      el.style.WebkitTransform = el.style.transform = sVal;
    }
  } else {
    val  = el.transform[attr];
    if(typeof val == "undefined" ) {
      if(attr == "scale" || attr == "scaleX" || attr == "scaleY"  ) {
        val = 1;
      } else {
        val = 0;
      }
    }
    return val;
  }
}

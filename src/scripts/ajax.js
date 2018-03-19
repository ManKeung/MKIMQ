/**
 * AJAX
 */
'use strict';

/*// AJAX
function ajax(data){
  //data={data:"",dataType:"xml/json",type:"get/post"，url:"",asyn:"true/false",success:function(){},failure:function(){}}

  //data:{username:123,password:456}
  //data = 'username=123&password=456';
  //第一步：创建xhr对象
  var xhr = null;
  if(window.XMLHttpRequest){//标准的浏览器
    xhr = new XMLHttpRequest();
  }else{
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  //第二步：准备发送前的一些配置参数
  var type = data.type == 'get'?'get':'post';
  var url = '';
  if(data.url){
    url = data.url;
    if(type == 'get'){
      url += "?" + data.data + "&_t="+new Date().getTime();
    }
  }
  var flag = data.asyn == 'true'?'true':'false';
  xhr.open(type,url,flag);

  //第三步：执行发送的动作
  if(type == 'get'){
     xhr.send(null);
  }else if(type == 'post'){
     xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
     xhr.send(data.data);
  }

  //第四步：指定回调函数
  xhr.onreadystatechange = function(){
    if(this.readyState == 4){
      if(this.status == 200){
        if(typeof data.success == 'function'){
          var d = data.dataType == 'xml'?xhr.responseXML:xhr.responseText;
          data.success(d);
        }
      }else{
        if(typeof data.failure == 'function'){
          data.failure();
        }
      }
    }
  }

}
*/
/*// 用法参数说明
window.onload = function(){
    //注册按钮单击事件
    var btn = document.getElementById('btn');
    btn.onclick = function(){
      var param = {
        url:'http://cdn.weather.hao.360.cn/api_weather_info.php?app=hao360&_jsonp=weather&code=101010100',
        type:'get',
        dataType:'json',
        success:function(data){
          alert(data);
        }
      };
      ajax(param);
    }
  }*/

/**********************************************************/


/**
 * AJAX 不能跨域
 */

function ajax(options) {
  options = options || {};
  options.type = (options.type || 'GET').toUpperCase(); // get post -> 转大写
  options.dataType = options.dataType || 'json';
  var params = formatParams(options.data);
  // var flag = options.asyn == 'true'?'true':'false';

  // 创建 - 非IE6 第一步
  if(window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  }else {
    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  // 接收 - 第二步
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      var status = xhr.status;
      if(status >= 200 && status < 300) {
        var d = options.dataType == 'xml'?xhr.responseXML:xhr.responseText;
        options.success &&options.success(d);
      }else {
        options.fail && options.fail(status);
      }
    }
  }

  // 连接 - 发送 - 第二步
  if(options.type == 'GET') {
    xhr.open('GET', options.url + '?' + params, true);
    xhr.send(null);
  }else if(options.type == 'POST'){
    xhr.open('POST', options.url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
  }
}

function formatParams(data) {
  var arr = [];

  for(var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }

  arr.push(('v='+Math.random()));

  return arr.join('&');
}

// 用法 默认是异步的 同步的化 改 false
/*ajax({
  url: './tes.php', // 请求地址
  type: 'POST', // 请求方式
  data: {name:'mk', age:20}, // 请求参数
  dataType: 'json',
  success: function(data) {
    // 此处放成功后执行的代码
  },
  fail: function(status) {
    // 此处放失败后执行的代码
  }
})
*/

/**
 * jsonp 跨域
 */
function jsonp(options) {
  options = options || {};
  options.callback = options.callback || 'callback';

  if(!options.url || !options.callbackName) {
    throw new Error('参数不合法');
  }

  // 创建script标签并加入到页面
  var callbackName = (options.callbackName + Math.random()).replace('.', '');
  options.data[options.Callback] = callbackName;
  var params = formatParams(options.data);
  var oHead = document.getElementsByTagName('head')[0];
  var oS = document.createElement('script');
  oHead.appendChild(oS);

  // 创建jsonp回调函数
  callbackName = callbackName.split('0')[0];
  window[callbackName] = function(json) {
    oHead.removeChild(oS);
    clearTimeout(oS.timer);
    window[callbackName] = null;
    options.success && options.success(json);
  }

  // 发送请求
  oS.src = options.url + '?' + params;

  if(options.time) {
    oS.timer = setTimeout(function(){
      window[callbackName] = null;
      oHead.removeChild(oS);
      options.error && options.error({message: '超时'});
    }, options.time);
  }
}

/*// 用法
jsonp({
  url: 'http://localhost:9999/ac/test.php',
  data: {q:1},
  callbackName: 'foo',
  time: 1,
  success: function(json) {
    console.log(json.name);
  },
  error: function(json) {
    console.log(json.message);
  }
});

//test.php
<?php
$callback = $_GET["callback"];
$callback = explode("0",$callback);
$callback = $callback[0];
$array = [
    "foo" => ["name" => "OK"],
    "aaa" => "bar"
];
$result = $array[$callback];
echo $callback.'('.json_encode($result).')';
exit;
?>*/

/**
 * Promise
 */

/*var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });

  return promise;
};

getJSON("https://api.github.com/search/users?q=1").then(function(json) {
  console.log('Contents: ' + json.items[0].id);
}, function(error) {
  console.error('出错了', error);
});*/

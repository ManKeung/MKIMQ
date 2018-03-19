/**
 * 页面独立js
 */

'use strict';

/**
 * loading效果
 */

/**
 * 导航栏部分
 */
{
  let nav = $('header');
  let iconTop = $('.icon_top');
  let home = $('#home');
  // let about = $('#about');
  // console.log(offset(about).top); // 测试offset().top 功能

  window.onscroll = () => { // 滚动事件
    let navHeight = offset(nav).height;
    scrollHeight = scroll().top;
    let homeHeight = offset(home).height;
    let op = 0;
    let displayTop = 'none';

    if (scrollHeight <= navHeight) {
      op = (scrollHeight / navHeight).toFixed(2);
    } else {
      op = 1;
    }
    // console.log(navHeight);
    // console.log(scrollHeight);
    css(nav, 'backgroundColor', 'rgba(23, 23,23,' + op + ')');

    if (scrollHeight > homeHeight - navHeight) {
      displayTop = 'block';
    } else {
      displayTop = 'none';
    }

    css(iconTop, 'display', displayTop);

    let screenH = client().height;
    // console.log('屏幕高度：' + screenH);
    // console.log('滚动高度：' + scroll().top);
    for (var i = 0, len = main.length; i < len; i++) {
      removeClass(roll[i], 'current');
      if (screenH + scroll().top > offset(main[i]).top + offset(nav).height && scrollHeight != 0) {
        for (var j = 0, le = roll.length; j < le; j++) {
          removeClass(roll[j], 'current');
        }
        addClass(roll[i], 'current');
        // console.log(i+'在可视区域内');
      }
    }

    if (scrollHeight == 0) { // 解决回到顶部时
      for (var i, len = main.length; i < len; i++) {
        removeClass(roll[i], 'current');
      }
      addClass(roll[0], 'current');
    }

    // let body = $('body');
    // console.log(body.style.cssText);
  }

  let scrollHeight = 0,
    target = 0,
    timer = null; // 回到顶部参数

  on(iconTop, 'click', () => { // 点击回到顶部
    target = 0;
    clearInterval(timer);

    timer = setInterval(() => {
      scrollHeight = scrollHeight + (target - scrollHeight) / 10;
      window.scrollTo(0, scrollHeight);

      if (scrollHeight == target) {
        clearInterval(timer);
      }
    }, 20);
  });
  /***************************************************************************/
  let playStop = $('.playStop'); // 音乐
  let music = $('#music');
  let play = $('.play');
  let stop = $('.stop');
  let hiddenFalg = true; // 判断是用户点击暂停音乐

  if (music.paused) {
    music.play(); // 暂停
    hide(stop);
    show(play);
    // hiddenFalg = true;
  } else {
    music.pause();
    hide(play);
    show(stop);
    // hiddenFalg = false;
  }

  on(playStop, 'click', () => { // 点击播放暂停音乐
    if (music.paused) {
      music.play(); // 暂停
      hide(stop);
      show(play);
      hiddenFalg = true;
    } else {
      music.pause();
      hide(play);
      show(stop);
      hiddenFalg = false;
    }
  });

  // 判断用户离开页面暂停音乐
  var hiddenProperty = 'hidden' in document ? 'hidden' :
    'webkitHidden' in document ? 'webkitHidden' :
    'mozHidden' in document ? 'mozHidden' : null;
  var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');

  on(document, visibilityChangeEvent, () => {
    if (!document[hiddenProperty] && hiddenFalg) {
      music.play();
    } else {
      music.pause();
    }
  });

  /******************************************************************************/
  let roll = $all('.roll');
  let main = $all('main');
  // console.log('roll = ' + roll.length, ' main = ' + main.length);
  let leader1 = 0,
    target1 = 0,
    timer1 = null;

  for (var i = 0, len = roll.length; i < len; i++) { // 滚动划屏
    roll[i].index = i;

    on(roll[i], 'click', function() {
      clearInterval(timer1);
      target1 = offset(main[this.index]).top - offset(nav).height; // 核心语句
      // console.log(this);
      timer1 = setInterval(() => {
        leader1 = leader1 + (target1 - leader1) / 10;
        window.scrollTo(0, leader1);
        if (Math.round(Math.abs(leader1)) == Math.floor(Math.abs(target1))) {
          clearInterval(timer1);
        }
      }, 60);

      for (var i = 0, len = roll.length; i < len; i++) { // 导航栏 加class
        // removeClass(roll[i], 'current');
        removeClass(roll[i], 'current');
      }

      addClass(roll[this.index], 'current');
    });
  }
}

/**
 * 导航栏手机端菜单栏
 */
{
  let phone = $('.phone');
  let navr = $('.nav_r');
  // console.log(offset(navrli[0]).height);
  let target = 44 * 7 + 20;
  let flag = true; // 开关
  let navrHeight = offset(navr).height;

  on(phone, 'click', () => {
    if (flag) {
      document.body.style.overflow = "hidden"; // 隐藏滚动条
      addClass(navr, 'nav_r_add');
      animate(navr, 0, target);
      flag = false;

    } else {
      document.body.style.overflow = "visible"; // 显示滚动条
      animate1(navr, target, 0);
      // removeClass(navr, 'nav_r_add');
      flag = true;

    }
  });

  let navrli = navr.children;
  // console.log('有几个孩子'+navrli.length);
  for (var i = 0, len = navrli.length - 1; i < len; i++) {
    // console.log('ok');
    if (isMobile()) {
      on(navrli[i], 'click', () => {
        document.body.style.overflow = "visible"; // 显示滚动条
        animate1(navr, target, 0);
        // removeClass(navr, 'nav_r_add');
        flag = true;
      });
    }
  }

  function animate(obj, current, target) {
    let timer = null;
    clearInterval(timer);

    timer = setInterval(() => {
      current = current + (target - current) / 10;
      current = current > 0 ? Math.ceil(current) : Math.floor(current);
      obj.style.height = current + 'px';
      // console.log(current, target);

      if (current == target) {
        clearInterval(timer);
      }
    }, 30);
  }

  function animate1(obj, current, target) {
    let timer = null;
    clearInterval(timer);

    timer = setInterval(() => {
      current = current + (target - current) / 10;
      current = current > 0 ? Math.ceil(current) : Math.floor(current);
      obj.style.height = current - 9 + 'px';
      // console.log(current, target);

      if (current - 9 == target) {
        clearInterval(timer);
      }
    }, 30);
  }
}

/**
 * 关于我
 */
{
  let aboutR = $('.about_r');
  let aboutRC = aboutR.children; // 获取ul 2两个
  let lis = html(aboutRC[0]);
  html(aboutRC[0], lis + lis); // 增加一倍 li
  let aboutli = aboutRC[0].children; // 获得所有li
  // console.log(aboutli.length);
  let aboutWidth = aboutWidth = offset(aboutR).width; // 得到父级的宽度
  let aboutCWidth = aboutCWidth = aboutWidth * aboutli.length; // 得到ul宽度
  // aboutWidth = offset(aboutR).width; // 得到父级的宽度
  // aboutCWidth = aboutWidth * aboutli.length; // 得到ul宽度


  // 动态设置轮播图大小
  css(aboutRC[0], 'width', aboutCWidth + 'px');
  for (let i = 0, len = aboutli.length; i < len; i++) {
    css(aboutli[i], 'width', aboutWidth + 'px');
  }

  on(window, 'resize', () => { // 窗口拖动调整大小
    aboutWidth = offset(aboutR).width; // 得到父级的宽度
    aboutCWidth = aboutWidth * aboutli.length; // 得到ul宽度

    // 动态设置轮播图大小
    css(aboutRC[0], 'width', aboutCWidth + 'px');
    for (let i = 0, len = aboutli.length; i < len; i++) {
      css(aboutli[i], 'width', (aboutWidth + 'px'));
    }
  });
  // console.log('父级宽度：'+aboutCWidth+'li宽度：' + aboutWidth); // 测试

  let timer = null; // 定时器
  let lisL = aboutli.length; // li的个数
  let now = 0; // 计数
  let ulLast = aboutRC[1];
  // console.log(ulLast.children.length);
  cssTransform(aboutRC[0], 'translateX', 0);
  auto();

  function auto() { // 自动播放
    clearInterval(timer); // 先清除
    timer = setInterval(() => {
      if (now == lisL - 1) {
        now = ulLast.children.length - 1;
      }

      css(aboutRC[0], 'transition', 'none');
      cssTransform(aboutRC[0], 'translateX', -now * aboutWidth);
      setTimeout(() => {
        now++;
        tab();
      }, 30);
    }, 3000);
  }

  function tab() { // 按钮
    css(aboutRC[0], 'transition', '.5s');
    cssTransform(aboutRC[0], 'translateX', -now * aboutWidth);

    for (let i = 0, len = ulLast.children.length; i < len; i++) {
      removeClass(ulLast.children[i], 'active');
    }

    addClass(ulLast.children[now % ulLast.children.length], 'active');
  }

  on(aboutR, 'mouseover', () => { // 鼠标经过
    clearInterval(timer);
  });

  on(aboutR, 'mouseout', () => { // 鼠标离开
    auto();
  });

  // for(let i=0, len=ulLast.children.length; i<len; i++) { // 鼠标经过切换按钮
  //   ulLast.children[i].index = i;
  //   on(ulLast.children[i], 'mouseover', () => {
  //     now = ulLast.children[i].index;

  //     cssTransform(aboutRC[0], 'translateX', -now * aboutWidth);
  //     tab();
  //     // console.log('点击的是：'+ ulLast.children[i].index);
  //   });
  // }

  if (!isMobile()) { // PC端才有鼠标经过切换效果
    for (let i = 0, len = ulLast.children.length; i < len; i++) { // 鼠标经过切换按钮
      ulLast.children[i].index = i;
      on(ulLast.children[i], 'mouseover', () => {
        now = ulLast.children[i].index;

        cssTransform(aboutRC[0], 'translateX', -now * aboutWidth);
        tab();
        // console.log('点击的是：'+ ulLast.children[i].index);
      });
    }
  }

  let buttonL = $all('.button_l');
  let buttonR = $all('.button_r');
  let main = $all('main');
  let navHeight = $('header');
  let leftHeight = offset(main[4]).top;
  let rightHeight = offset(main[6]).top;

  for (let i = 0, len = buttonL.length; i < len; i++) { // 回到我的作品
    on(buttonL[i], 'click', () => {
      buttonTo(leftHeight);
    });
  }

  for (let i = 0, len = buttonR.length; i < len; i++) { // 回到联系我
    on(buttonR[i], 'click', () => {
      buttonTo(rightHeight);
    });
  }

  function buttonTo(taget) { // 动画封装
    let leader = 0,
      timer = null;

    clearInterval(timer);
    timer = setInterval(() => {
      leader = leader + (taget - leader) / 10;
      leader = leader > 0 ? Math.ceil(leader) : Math.floor(leader);
      window.scrollTo(0, leader);

      if (leader == taget) {
        clearInterval(timer);
      }
    }, 30);
  }

  if (isMobile()) { // 移动端才有滑动效果
    let touchstart = 'touchstart';
    let touchmove = 'touchmove';
    let touchend = 'touchend';

    // if(!isMobile()){ // 移动PC兼容
    //   touchstart = 'mousedown';
    //   touchmove = 'mousemove';
    //   touchend = 'mouseup';
    //   // console.log('PC');
    // }

    let startPoint = 0; // 刚点击或触碰的位置
    let startX = 0; // 刚点击时移动的位置
    let isMove = true; // 两个开关
    let isFirst = true;

    on(aboutR, touchstart, (event) => { // 按下
      let ev = getEvent(event); // 兼容
      startPoint = ev.changedTouches ? ev.changedTouches[0] : ev;
      // console.log(ev);

      clearInterval(timer);
      css(aboutRC[0], 'transition', 'none');

      let translateX = cssTransform(aboutRC[0], 'translateX');
      // console.log(translateX);
      now = Math.round(-translateX / aboutWidth); // 滚动到哪儿
      // console.log(now);

      if (now == 0) {
        now = ulLast.children.length;
      }

      if (now == aboutRC[0].children.length - 1) {
        now = ulLast.children.length - 1;
      }
      cssTransform(aboutRC[0], 'translateX', -now * aboutWidth);
      startX = cssTransform(aboutRC[0], 'translateX');
      // alert(startX);
      isMove = true;
      isFirst = true;
      // alert(111); // ok
    });

    on(aboutR, touchmove, (event) => {
      if (!isMove) {
        return;
      }
      // alert(startX);
      let ev = getEvent(event);
      let nowPoint = ev.changedTouches ? ev.changedTouches[0] : ev;

      let disX = nowPoint.pageX - startPoint.pageX;
      // console.log(disX);
      let disY = nowPoint.pageY - startPoint.pageY;

      if (isFirst) {
        isFirst = false;

        if (Math.abs(disY) > Math.abs(disX)) { // 判断是上下还是左右移动
          isMove = false;
        }
      }

      if (isMove) {
        // alert(disX + startX);
        cssTransform(aboutRC[0], 'translateX', startX + disX);
      }
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      // console.log(touch);
    });

    on(aboutR, touchend, (e) => {
      let translateX = cssTransform(aboutRC[0], 'translateX');
      // alert(translateX);
      now = Math.round(-translateX / aboutWidth);
      tab();
      auto();
    });
  }
}

/**
 * 经历
 */

{
  let expBig = $('#exp-big');
  let iconE = $all('.icon_e');
  let height = offset(expBig).height / 6 + 36 + 'px';
  for (let i = 0, len = iconE.length; i < len; i++) {
    css(iconE[i], 'height', height);
    // iconE[i].style.height = height;
  }

  css(iconE[iconE.length - 1], 'height', parseFloat(height) + 30 + 'px');
}

/**
 * 作品
 */

{
  /**
   * 数据 title 标题 url 图片地址
   */

  let arrP = [
    { title: '超融合自动化运维系统', url: 'p01.png' },
    { title: '彭州公安队伍管理后台系统', url: 'p02.png' },
    { title: '成华公安后台报备管理系统', url: 'p03.png' },
    { title: '偏平化系统', url: 'p04.png' }
  ];

  let arrM = [
    { title: '彭州队伍管理APP', url: 'm01.png' },
    { title: '雪亮工程APP', url: 'm02.png' },
    { title: '考勤APP', url: 'm03.png' },
    { title: '报备APP', url: 'm04.png' }
  ];

  let arrU = [
    { title: '派沃特宣传画册', url: 'u01.png' },
    { title: '派沃特宣传DM单', url: 'u02.png' },
    { title: '派沃特公司简介易拉宝', url: 'u03.png' },
    { title: '派沃特企业VI', url: 'u04.png' }
  ];

  let arrAll = arrP.concat(arrM, arrU);

  function randomSort(arr, newArr) { // 随机数组
    if (arr.length == 1) {
      newArr.push(arr[0]);

      return newArr;
    }

    var random = Math.ceil(Math.random() * arr.length) - 1;
    newArr.push(arr[random]);
    arr.splice(random, 1);

    return randomSort(arr, newArr);
  }

  let newAll = [];
  let newP = [];
  let newM = [];
  let newU = [];

  randomSort(arrAll, newAll);
  randomSort(arrP, newP);
  randomSort(arrM, newM);
  randomSort(arrU, newU);
  // *************************************
  /**
   *  数据随机
   */

  /**
   * 创建li标签
   */
  function list(parent, arr) { // 方法创建li标签并且设置背景图片
    // console.log(parent, arr.length); // ok
    for (var i = 0, len = arr.length; i < len; i++) {
      let li = el('li'); // li 标签
      attr(li, 'data-title', arr[i].title);
      attr(li, 'data-url', arr[i].url);
      css(li, 'backgroundImage', `url(./images/ui/${arr[i].url})`);
      // html(li, arr[i].url);
      parent.appendChild(li);
    }

    // console.log('sum = '+parent + arr, 'li: '+li);
  }
  // list(ulLis[0], newAll);
  // ***************************************

  // 点击切换
  let li = $('#li-span');
  let liSpan = li.children; // 所有的span
  let bigdiv = $('#bigdiv');
  let ulLis = bigdiv.children;

  /*console.log(liSpan.length);
  console.log(ulLis);*/
  for (let i = 0, len = liSpan.length; i < len; i++) {
    on(liSpan[i], 'click', function(num) {
      return () => {

        for (var j = 0; j < liSpan.length; j++) {
          removeClass(liSpan[j], 'current_all');
          removeClass(ulLis[j], 'ulblock');
        }

        addClass(liSpan[num], 'current_all');
        addClass(ulLis[num], 'ulblock');
        // console.log('第：'+num+'个');
      }
    }(i));
  }
  list(ulLis[0], newAll);
  list(ulLis[1], newP);
  list(ulLis[2], newM);
  list(ulLis[3], newU);

  function getData(obj) { // 得到点击的数据
    return {

      title: attr(obj, 'data-title'),
      url: attr(obj, 'data-url')
    }
  }
  // let falg = false;
  // let Height = 0;
  let top = 0;

  function clickImg(obj, dt, dd, show) { // 点击的那个ul obj 那张图标 dt 标题 dd 插入背景图 show 展示
    for (let i = 0, len = obj.length; i < len; i++) {
      on(obj[i], 'click', function(num) {

        return () => {
          let title = getData(obj[num]).title;
          let image = getData(obj[num]).url;

          dt.innerHTML = title;
          html(dt, title);
          css(dd, 'backgroundImage', `url(./images/ui/${image})`);
          css(show, 'display', 'block');
          top = scroll().top;
          // console.log(top);
          let body = $('body');
          // addClass(body, 'addBody');
          let header = $('#header-span');
          css(body, 'position', 'fixed');
          css(body, 'top', -top + 'px');
          // window.scrollTo(0, '88px');
          // alert(scroll().top);
          css(header, 'backgroundColor', 'rgba(23, 23, 23, 1)');
        }
      }(i));
    }
  }

  // console.log(top);

  let dt = $('#dt-title');
  let dd = $('#dd-img');
  let showImage = $('.show_img');
  let spanImg = $('.span_img');
  let showL1 = ulLis[0].children;
  let showL2 = ulLis[1].children;
  let showL3 = ulLis[2].children;
  let showL4 = ulLis[3].children;
  // console.log(`dt:${dt}, dd:${dd}, showImage:${showImage}`); // ok选择器没问题
  // alert(getData(showL1[0]).url);
  clickImg(showL1, dt, dd, showImage);
  clickImg(showL2, dt, dd, showImage);
  clickImg(showL3, dt, dd, showImage);
  clickImg(showL4, dt, dd, showImage);
  on(spanImg, 'click', () => {
    css(showImage, 'display', 'none');

    let body = $('body');
    let header = $('#header-span');
    css(body, 'position', 'relative');
    css(header, 'backgroundColor', 'rgba(23, 23, 23, 0)');
    css(body, 'top', 0);
    // css(header, 'top', 0);
    window.scrollTo(0, top);
  });
}

/**
 * 项目介绍
 */

{
  // 数据 title 标题 desc 描述 do 自己职责 url 图片名字
  let arrJ = [
    { title: '超融合自动化运维系统', desc: '提供自主可控的分布式数据库、分布式数据仓库、分布式文件存储、分布式内存缓存、统一计算以及融合虚拟化平台。 提供面向文本处理的文本智能分析一体化引擎以及面向视频分析的影响智能分析一体化引擎。支持多种计算模式，包括Deep Learning+CPU/Deep Learning+GPU/Deep Learning+FPGA+CNN。', do: '超融合项目中根据需求，设计出界面效果，讨论通过后，根据设计图完成前端代码编写，与后台协作完成。', url: 'j01.png' },
    { title: '成华公安扁平化指挥系统', desc: '以互联网、物联网、GIS等技术融合为支撑，以大数据融合为驱动，推出了综合指挥调度系统。实现音视频调度、集群对讲、数据调度、GIS调度、远程监控、视频会议等一体的综合调度平台，为客户提供专业的解决方案，解决指挥手段繁多、系统融合难度高等问题，完美实现系统联动、调度。', do: '在成华项目组，主要职责：设计移动勤务协助安卓开发人员工作，同时嵌套h5代码；为指挥系统客服端设计界面及图表；为勤务报备系统写前台和后台页面。', url: 'j02.png' },
    { title: '彭州公安队伍管理APP', desc: '针对执法人员出勤制度、装备管理制度、重大安保活动保障要求和流动性大的特点，创造性地将勤务和人员管理与案事件、任务、指挥、装备进行融合关联，并结合4G移动终端，解决了各级执法部门勤务和队伍管理的痛点，引领勤务和队伍管理从传统落后局面迈向现代化。', do: '队伍管理项目，主要职责：界面设计，及书写管理后台页面。', url: 'j03.png' }
  ];

  function randomSort(arr, newArr) { // 随机数组
    if (arr.length == 1) {
      newArr.push(arr[0]);

      return newArr;
    }

    var random = Math.ceil(Math.random() * arr.length) - 1;
    newArr.push(arr[random]);
    arr.splice(random, 1);

    return randomSort(arr, newArr);
  }
  let newJ = []

  newJ = randomSort(arrJ, newJ);

  let imgList = $all('.project_img');
  let dlList = $all('.dl_msg');
  // console.log(dlList[0].children);

  function msgImg(img, msg, arr) { // 方法
    css(img, 'backgroundImage', `url(./images/ui/${arr.url})`);
    msg.children[0].innerHTML = arr.title;
    msg.children[1].innerHTML = arr.desc;
    msg.children[2].innerHTML = arr.do;
  }

  for (let i = 0, len = imgList.length; i < len; i++) {
    msgImg(imgList[i], dlList[i], newJ[i]);
  }
}

/**
 * 走过的岁月
 */

{
  let home = $('#home');
  let startTime = new Date('1991/10/11'); // 出生日期

  function youngYears() {
    let nowTime = new Date(); // 现在时间
    let d = (nowTime.getFullYear() - startTime.getFullYear()) * 365;

    attr(home, 'data-yongYears', `亲爱的❥(^_-)[ManKeung]，(#^.^#)走过${d}天︿(￣︶￣)︿`);
  }

  youngYears();
}

/**
 * 联系方式
 */

{
  let errLis = $all('.error');
  // 正则
  let zn = /^[\u4e00-\u9fa5]{2,5}$/; // 匹配中文
  let us = /^[a-zA-Z\s,']{3,25}$/i; // 英文名字
  let em = /^\w+[.]{0,1}[a-z0-9_-]+\w+@([a-zA-Z0-9_-])+\.[a-z]{2,4}$/i; // 邮箱
  let ph = /^1[3-9][0-9]{9}$/; // 手机号码
  let msgr = /\S{51}/;

  // *** 姓名输入框  start ***
  let nameInput = $('#name'); // 这里有个坑 如果名字去 name 会有问题 拿到这个标签
  let msgName = $('#msg-name');

  on(nameInput, 'focus', () => { // 获得焦点
    hide(msgName);
    nameInput.select(); // 选择表单
  });

  nameInput.onblur = () => { // 离开焦点  这里有坑不能用 addEventListener
    let val = trim(nameInput.value);

    if (val == '') {
      show(msgName);
      errLis[0].children[1].innerHTML = '留下你美丽的名字吧！';
      errLis[0].style.transform = 'scale(1)';
      setTimeout(() => {
        errLis[0].style.transform = 'scale(0)';
      }, 3000);

    } else {
      nameInput.value = val;

      // 正则判断 名字是否为正确
      let znR = zn.test(val); // false 表示不是中文
      let usR = us.test(val); // false 表示不是英文

      if (!znR && !usR) {
        errLis[0].children[1].innerHTML = '名字输入有误，请再看看(#^.^#)';
        errLis[0].style.transform = 'scale(1)';
        setTimeout(() => {
          errLis[0].style.transform = 'scale(0)';
        }, 3000);

      }

    }
  }


  // *** 姓名输入框 end ***

  // *** 邮件输入框  start ***
  let emailInput = $('#email'); // 这里有个坑 如果名字去 name 会有问题 拿到这个标签
  let msgEmail = $('#msg-email');

  on(emailInput, 'focus', () => { // 获得焦点
    hide(msgEmail);
    emailInput.select();
  });

  emailInput.onblur = () => { // 离开焦点
    let val = trim(emailInput.value);

    if (val == '') {
      show(msgEmail);
      if (val == '') {
        show(msgName);
        errLis[1].children[1].innerHTML = '没有邮箱怎么联系呢！';
        errLis[1].style.transform = 'scale(1)';
        setTimeout(() => {
          errLis[1].style.transform = 'scale(0)';
        }, 3000);
      }
    } else {
      emailInput.value = val;

      // 正则判断
      if (!em.test(val)) {
        errLis[1].children[1].innerHTML = '您的邮箱格式有误！';
        errLis[1].style.transform = 'scale(1)';
        setTimeout(() => {
          errLis[1].style.transform = 'scale(0)';
        }, 3000);
      }
    }
  }
  // *** 邮件输入框 end ***


  // **** 电话输入框 start ***
  let phoneInput = $('#phone');
  let msgPhone = $('#msg-phone');

  on(phoneInput, 'focus', () => { // 获得焦点
    hide(msgPhone);
    phoneInput.select();
  });

  phoneInput.onblur = () => { // 离开焦点
    let val = trim(phoneInput.value);

    if (val == '') {
      show(msgPhone);
      errLis[2].children[1].innerHTML = '你的号码对我很重要！';
      errLis[2].style.transform = 'scale(1)';
      setTimeout(() => {
        errLis[2].style.transform = 'scale(0)';
      }, 3000);

    } else {
      phoneInput.value = val;

      // 正则
      if (!ph.test(val)) {
        errLis[2].children[1].innerHTML = '手机号码输入有误！';
        errLis[2].style.transform = 'scale(1)';
        setTimeout(() => {
          errLis[2].style.transform = 'scale(0)';
        }, 3000);

      }
    }
  }
  // **** 电话输入框 end ***

  // **** 留言输入框 start ***
  let msg = $('#msg');
  let msgMsg = $('#msg-msg');

  on(msg, 'focus', () => { // 获得焦点
    hide(msgMsg);
    msg.select();
  });

  msg.onblur = () => { // 离开焦点
    let val = trim(msg.value);
    val = val.replace(/\n/g, '');

    if (val == '') {
      show(msgMsg);
      errLis[2].children[1].innerHTML = '就没有什么对我说吗？┭┮﹏┭┮！';
      errLis[2].style.transform = 'scale(1)';
      setTimeout(() => {
        errLis[2].style.transform = 'scale(0)';
      }, 3000);
    } else {

      // 正则
      // 过敏词组
      let arr = [
        '你爸', '你祖宗', '妈卖批', '你爷', '草拟', '操你', '你妹', '老二', '色鬼', '傻逼', '狗蛋', '你全家', '哈', '呵', '嘻', '大便', '屎', '儿子', '孙子', '屌丝', '王文强', '智障', '搞', '无节操', '无下限', '尼玛', '草', '艹', '泥马', '法克', '神经', '病', '混蛋', '卧槽', '制杖', '撞壁', '捡币', '撒币', '你妈', '死', '全家', '你娘', '牛逼'
      ];

      for (let i = 0, len = arr.length; i < len; i++) {
        val = val.replace(arr[i], '');
      }

      val = val.replace(/sb|sx|x你妈|x你妹|x你全家|傻b|妈b|s逼|哈p|x|b|fuck/gi, '');

      msg.value = val;

      if (msgr.test(val)) {
        errLis[2].children[1].innerHTML = '输入的太多了╮(╯▽╰)╭！';
        errLis[2].style.transform = 'scale(1)';
        setTimeout(() => {
          errLis[2].style.transform = 'scale(0)';
        }, 3000);
      }
    }
  }
  // **** 留言输入框 end ***




  // 提交
  let formTxt = $('form');
  let button = $('#button');
  let errorText = ''; // 收集错误信息
  let errorR = /、$/;

  on(button, 'click', () => {

    let caveat = $('.caveat'); // 大盒子
    let caveatBg = $('.caveat_bg'); // 弹出窗
    let countDown = $('#count-down'); // 关闭倒计时
    let stopCaveat = $('#stop-caveat'); // 关闭窗口
    let caveatImg = $('#caveat-img'); // 错误提示背景色  oK #42cf8c error #ffb200 背景图
    let caveatError = $('#caveat-erro'); // 错误提示前缀
    let caveatTxt = $('#caveat-txt'); // 哪些地方错了 并设置字体颜色
    let count = 6; // 五秒后关闭
    let timer = null; // 定时器

    // let msgTR = /\S{51}|\S{0}/; // 正则字符 1到50
    // 得到表单数据
    let nameuser = formTxt.name.value;
    let email = formTxt.email.value;
    let phone = formTxt.phone.value;
    let msgT = formTxt.msgtxt.value;
    // console.log(`name: ${name}, email: ${email}, phone: ${phone}, msg: ${msgT}。`);

    let znR = zn.test(nameuser); // false 表示不是中文
    let usR = us.test(nameuser); // false 表示不是英文

    let nameFalg = znR == true ? znR : usR; //  name 错误开关 false
    let emailFalg = em.test(email); //  email 错误开关 false
    let phoneFalg = ph.test(phone); //  phone 错误开关 false
    let msgFalg = msgr.test(msgT); //  phone 错误开关 false
    msgFalg = msgT == '' ? true : msgFalg;

    let str = ''; // 记录错误信息
    str += nameFalg == true ? '' : '姓名、';
    str += emailFalg == true ? '' : '邮箱、';
    str += phoneFalg == true ? '' : '手机号、';
    str += msgFalg == true ? '内容、' : '';
    // str += msgT == '' ? '信息' : '';
    str = str.replace(/、$/, ''); // 去掉最后一个顿号
    // console.log(str);

    let focusTxt = str.substr(0, 3);
    focusTxt = focusTxt.replace(/、$/, ''); // 把、去掉
    // console.log('第一个是：', focusTxt);

    if (nameFalg && emailFalg && phoneFalg && !msgFalg) { // AJAX
      // name; // 名字
      email = compileStr(email); // 邮箱
      // phone.toString(); // 手机号转字符串
      phone = compileStr(phone.toString());
      // msgT; // msg
      let time = new Date().getTime(); // 得到时间戳

      // console.log(`name: ${nameuser}, email: ${email}, phone: ${phone}, msgT: ${msgT}, time: ${time}`);

      ajax({
        url: 'mkimq.php',
        data: { userval: nameuser, phoneval: phone, emailval: email, msgval: msgT, timeval: time },
        type: 'POST',
        dataType: 'json',
        success: function(data) {
          // console.log(data);
          // 图片 数据渲染
          css(caveatImg, 'backgroundColor', '#42cf8c');
          css(caveatImg, 'backgroundImage', 'url(./images/ok.png)');
          html(caveatError, '');
          html(caveatTxt, data);
          css(caveatTxt, 'color', '#42cf8c');
          css(caveat, 'display', 'block');
          setTimeout(() => {
            caveatBg.style.transform = 'scale(1)'; // 这里有坑 注意如果没延迟 就看不出效果
          }, 100);
          clearInterval(timer);
          timer = setInterval(() => {
            count--;
            html(countDown, `提示：还有(${count}) 秒，自动关闭！`);

            if (count == 0) {
              clearInterval(timer);
              setTimeout(() => {
                caveatBg.style.transform = 'scale(0)';
                setTimeout(() => {
                  css(caveat, 'display', 'none');
                }, 500);
              }, 1000);
            }
          }, 1000);

          on(stopCaveat, 'click', () => {
            caveatBg.style.transform = 'scale(0)';
            setTimeout(() => {
              css(caveat, 'display', 'none');
            }, 500);
            clearInterval(timer);
          });
          formTxt.name.value = '';
          formTxt.email.value = '';
          formTxt.phone.value = '';
          formTxt.msgtxt.value = '';
        },
        fail: function(err) {
          // console.log(err);
          css(caveatImg, 'backgroundColor', '#ffb200');
          css(caveatImg, 'backgroundImage', 'url(./images/erro.png)');
          html(caveatError, '真的不好意思，我这边没收到，');
          html(caveatTxt, data);
          css(caveatTxt, 'color', 'red');
          css(caveat, 'display', 'block');
          setTimeout(() => {
            caveatBg.style.transform = 'scale(1)'; // 这里有坑 注意如果没延迟 就看不出效果
          }, 100);
          clearInterval(timer);
          timer = setInterval(() => {
            count--;
            html(countDown, `提示：还有(${count}) 秒，自动关闭！`);

            if (count == 0) {
              clearInterval(timer);
              setTimeout(() => {
                caveatBg.style.transform = 'scale(0)';
                setTimeout(() => {
                  css(caveat, 'display', 'none');
                }, 500);
              }, 1000);
            }
          }, 1000);

          on(stopCaveat, 'click', () => {
            caveatBg.style.transform = 'scale(0)';
            setTimeout(() => {
              css(caveat, 'display', 'none');
            }, 500);
            clearInterval(timer);
          });

          formTxt.name.value = '';
          formTxt.email.value = '';
          formTxt.phone.value = '';
          formTxt.msgtxt.value = '';
        }
      });
    } else { // 错误信息处理

      /* // 选择标签
       let caveat = $('.caveat'); // 大盒子
       let caveatBg = $('.caveat_bg'); // 弹出窗
       let countDown = $('#count-down'); // 关闭倒计时
       let stopCaveat = $('#stop-caveat'); // 关闭窗口
       let caveatImg = $('#caveat-img'); // 错误提示背景色  oK #42cf8c error #ffb200 背景图
       let caveatError = $('#caveat-erro'); // 错误提示前缀
       let caveatTxt = $('#caveat-txt'); // 哪些地方错了 并设置字体颜色
       let count = 6; // 五秒后关闭
       let timer = null; // 定时器*/

      // 图片 数据渲染
      css(caveatImg, 'backgroundColor', '#ffb200');
      css(caveatImg, 'backgroundImage', 'url(./images/erro.png)');
      html(caveatError, '你还有信息填写错误， 还不能提交，请您再确认一下：');
      html(caveatTxt, str);
      css(caveatTxt, 'color', 'red');
      css(caveat, 'display', 'block');
      setTimeout(() => {
        caveatBg.style.transform = 'scale(1)'; // 这里有坑 注意如果没延迟 就看不出效果
      }, 100);
      clearInterval(timer);
      timer = setInterval(() => {
        count--;
        html(countDown, `提示：还有(${count}) 秒，自动关闭！`);

        if (count == 0) {
          clearInterval(timer);
          setTimeout(() => {
            caveatBg.style.transform = 'scale(0)';
            setTimeout(() => {
              css(caveat, 'display', 'none');
            }, 500);
            foucsTo(focusTxt);
          }, 1000);
        }
      }, 1000);

      on(stopCaveat, 'click', () => {
        caveatBg.style.transform = 'scale(0)';
        setTimeout(() => {
          css(caveat, 'display', 'none');
        }, 500);
        foucsTo(focusTxt);
        clearInterval(timer);
      });
    }

    function foucsTo(val) {
      switch (val) {
        case '姓名':
          nameInput.focus();
          break;
        case '邮箱':
          emailInput.focus();
          break;
        case '手机号':
          phoneInput.focus();
          break;
        default:
          msg.focus();
      }
    }
  });

  if (isMobile()) {
    attr(phoneInput, 'type', 'number'); // 手机调数字键盘
  }

  function compileStr(code) {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);

    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }

    return escape(c);
  }
}

/**
 * 账号调用
 */

{
  let user = $('#username');
  let qq = user.children[2];

  on(qq, 'click', () => {
    if (isMobile) {
      window.location.href = "mqqwpa://im/chat?chat_type=wpa&uin=765139572&version=1&src_type=web&web_src=oicqzone.com";
    } else {
      window.location.href = "tencent://im/chat?chat_type=wpa&uin=765139572&version=1&src_type=web&web_src=oicqzone.com";
    }
  });
}

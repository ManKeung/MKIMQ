/**
 * 页面独立js
 */

'use strict';

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

    if(scrollHeight <= navHeight) {
      op = (scrollHeight / navHeight).toFixed(2);
    } else {
      op = 1;
    }
    // console.log(navHeight);
    // console.log(scrollHeight);
    css(nav, 'backgroundColor', 'rgba(23, 23,23,' + op + ')');

    if(scrollHeight > homeHeight - navHeight) {
      displayTop = 'block';
    } else {
      displayTop = 'none';
    }

    css(iconTop, 'display', displayTop);

    let screenH = client().height;
    // console.log('屏幕高度：' + screenH);
    // console.log('滚动高度：' + scroll().top);
    for(var i=0, len=main.length; i<len; i++) {
      removeClass(roll[i], 'current');
      if(screenH+scroll().top > offset(main[i]).top+offset(nav).height && scrollHeight != 0) {
        for(var j=0, le=roll.length; j<le; j++) {
          removeClass(roll[j], 'current');
        }
        addClass(roll[i], 'current');
        // console.log(i+'在可视区域内');
      }
    }

    if(scrollHeight == 0) { // 解决回到顶部时
      for(var i, len=main.length; i< len; i++) {
        removeClass(roll[i], 'current');
      }
      addClass(roll[0], 'current');
    }
  }

  let scrollHeight = 0, target = 0, timer = null; // 回到顶部参数

  on(iconTop, 'click', () => { // 点击回到顶部
    target = 0;
    clearInterval(timer);

    timer = setInterval(() => {
      scrollHeight = scrollHeight + (target - scrollHeight) / 10;
      window.scrollTo(0, scrollHeight);

      if(scrollHeight == target) {
        clearInterval(timer);
      }
    }, 20);
  });

  let playStop = $('.playStop');
  let music = $('#music');
  let play = $('.play');
  let stop = $('.stop');

  if(music.paused) {
    music.play(); // 暂停
    hide(stop);
    show(play);
  }else {
    music.pause();
    hide(play);
    show(stop);
  }

  on(playStop, 'click', () => { // 点击播放暂停音乐
    if(music.paused) {
      music.play(); // 暂停
      hide(stop);
      show(play);
    }else {
      music.pause();
      hide(play);
      show(stop);
    }
  });

  let roll = $all('.roll');
  let main = $all('main');
  // console.log('roll = ' + roll.length, ' main = ' + main.length);
  let leader1 = 0,target1 = 0,timer1 = null;

  for(var i = 0,len = roll.length; i < len; i++) { // 滚动划屏
    roll[i].index = i;

    on(roll[i], 'click', function() {
      clearInterval(timer1);
      target1 = offset(main[this.index]).top - offset(nav).height; // 核心语句
      // console.log(this);
      timer1 = setInterval(() => {
        leader1 = leader1 + (target1 - leader1) / 10;
        window.scrollTo(0, leader1);
        if(Math.round(Math.abs(leader1)) == Math.floor(Math.abs(target1))) {
          clearInterval(timer1);
        }
      }, 60);

      for(var i = 0, len = roll.length; i < len; i++) { // 导航栏 加class
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
  let target = 44*7+20;
  let flag = true; // 开关
  let navrHeight = offset(navr).height;

  on(phone, 'click', () => {
    if(flag) {
      addClass(navr, 'nav_r_add');
      animate(navr, 0, target)
      flag = false;
    }else {
      animate1(navr, target, 0);
      // removeClass(navr, 'nav_r_add');
      flag = true;
    }
  });

  let navrli = navr.children;
  // console.log('有几个孩子'+navrli.length);
  for(var i=0, len=navrli.length-1; i<len; i++) {
    // console.log('ok');
    if(isMobile()) {
       on(navrli[i], 'click', () => {
       // console.log(i);
       animate1(navr, target, 0);
       flag = true;
      });
    }
  }

  function animate(obj, current, target) {
    let timer = null;
    clearInterval(timer);

    timer = setInterval(() => {
      current =current + (target - current) / 10;
      current = current > 0 ? Math.ceil(current) : Math.floor(current);
      obj.style.height = current+'px';
      // console.log(current, target);

      if(current == target) {
        clearInterval(timer);
      }
    }, 30);
  }

  function animate1(obj, current, target) {
    let timer = null;
    clearInterval(timer);

    timer = setInterval(() => {
      current =current + (target - current) / 10;
      current = current > 0 ? Math.ceil(current) : Math.floor(current);
      obj.style.height = current-9+'px';
      // console.log(current, target);

      if(current-9 == target) {
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
  html(aboutRC[0], lis+lis); // 增加一倍 li
  let aboutli = aboutRC[0].children; // 获得所有li
  // console.log(aboutli.length);
  let aboutWidth = aboutWidth = offset(aboutR).width; // 得到父级的宽度
  let aboutCWidth = aboutCWidth = aboutWidth * aboutli.length; // 得到ul宽度
  // aboutWidth = offset(aboutR).width; // 得到父级的宽度
  // aboutCWidth = aboutWidth * aboutli.length; // 得到ul宽度


   // 动态设置轮播图大小
  css(aboutRC[0], 'width', aboutCWidth + 'px');
  for(let i=0, len=aboutli.length; i< len; i++) {
    css(aboutli[i], 'width', aboutWidth+'px');
  }

  on(window, 'resize', () => { // 窗口拖动调整大小
    aboutWidth = offset(aboutR).width; // 得到父级的宽度
    aboutCWidth = aboutWidth * aboutli.length; // 得到ul宽度

    // 动态设置轮播图大小
    css(aboutRC[0], 'width', aboutCWidth + 'px');
    for(let i=0, len=aboutli.length; i< len; i++) {
      css(aboutli[i], 'width', (aboutWidth+'px'));
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
      if(now == lisL-1) {
        now = ulLast.children.length -1;
      }

      css(aboutRC[0], 'transition', 'none');
      cssTransform(aboutRC[0], 'translateX', -now*aboutWidth);
      setTimeout(() => {
        now++;
        tab();
      }, 30);
    }, 3000);
  }

  function tab() { // 按钮
    css(aboutRC[0], 'transition', '.5s');
    cssTransform(aboutRC[0], 'translateX', -now * aboutWidth);

    for(let i=0, len=ulLast.children.length; i<len; i++) {
      removeClass(ulLast.children[i], 'active');
    }

    addClass(ulLast.children[now%ulLast.children.length], 'active');
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

  if(!isMobile()) { // PC端才有鼠标经过切换效果
    for(let i=0, len=ulLast.children.length; i<len; i++) { // 鼠标经过切换按钮
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
  let leftHeight = offset(main[3]).top+offset(navHeight).height;
  let rightHeight = offset(main[6]).top+offset(navHeight).height;
  // console.log('left:'+buttonL.length, 'right:'+buttonR.length);
  for(let i=0, len=buttonL.length; i<len; i++){ // 回到我的作品
    on(buttonL[i], 'click', () => {
      buttonTo(leftHeight);
    });
  }

  for(let i=0, len=buttonR.length; i<len; i++){ // 回到联系我
    on(buttonR[i], 'click', () => {
      buttonTo(rightHeight);
    });
  }

  function buttonTo(taget) { // 动画封装
    let leader = 0, timer = null;

    clearInterval(timer);
    timer = setInterval(() => {
      leader = leader + (taget - leader) / 10;
      leader = leader>0 ? Math.ceil(leader) : Math.floor(leader);
      window.scrollTo(0, leader);

      if(leader == taget) {
        clearInterval(timer);
      }
    }, 30);
  }

  if(isMobile()) { // 移动端才有滑动效果
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

      if(now == 0) {
        now = ulLast.children.length;
      }

      if(now == aboutRC[0].children.length-1) {
        now = ulLast.children.length-1;
      }
      cssTransform(aboutRC[0], 'translateX', -now*aboutWidth);
      startX = cssTransform(aboutRC[0], 'translateX');
      // alert(startX);
      isMove = true;
      isFirst = true;
      // alert(111); // ok
    });

    on(aboutR, touchmove, (event) => {
      if(!isMove) {
        return;
      }
      // alert(startX);
      let ev = getEvent(event);
      let nowPoint = ev.changedTouches ? ev.changedTouches[0] : ev;

      let disX = nowPoint.pageX - startPoint.pageX;
      // console.log(disX);
      let disY = nowPoint.pageY - startPoint.pageY;

      if(isFirst) {
        isFirst = false;

        if(Math.abs(disY) > Math.abs(disX)) { // 判断是上下还是左右移动
          isMove = false;
        }
      }

      if(isMove) {
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
  let height = offset(expBig).height / 6 + 36 +'px';
  for(let i=0, len=iconE.length; i<len; i++) {
    css(iconE[i], 'height', height);
    // iconE[i].style.height = height;
  }

  css(iconE[iconE.length-1], 'height', parseFloat(height)+30+'px');
}

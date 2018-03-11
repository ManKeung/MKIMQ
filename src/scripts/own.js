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

    /*for(var i = 0, len = main.length; i < len; i++) { // 方法有待改变
      // 测试
      console.log('main['+i+'] = ' + 'top: ' + offset(main[i]).top);
      console.log('scrollRop = ' + scroll().top);
      console.log('main['+i+'] = ' + 'height: ' + offset(main[i]).height);

      if(offset(main[i]).top <= scroll().top <= (offset(main[i]).top + offset(main[i]).height)) {
        console.log('在第：' + i + '区域');
      }
    }*/

    // 用可视区判断
    let screenH = client().height;
    // console.log('屏幕高度：' + screenH);
    // console.log('滚动高度：' + scroll().top);
    for(var i=0, len=main.length; i<len; i++) {
      removeClass(roll[i], 'current');
      if(screenH+scroll().top > offset(main[i]).top+offset(nav).height) {
        // console.log(i+1+'在可视区域内');
        for(var j=0, le=roll.length; j<le; j++) {
          removeClass(roll[j], 'current');
        }
        addClass(roll[i], 'current');
        /*if(i>0) {
          if(screenH+scroll().top > offset(main[i-1]).top+offset(nav).height/2) {
            for(var j=0, len=roll.length; j<len; j++) {
              removeClass(roll[j], 'current');
            }
            addClass(roll[i-1], 'current');
          }else {
            for(var q=0, len=roll.length; q<len; q++) {
              removeClass(roll[q], 'current');
            }
            addClass(roll[i], 'current');
          }
        }else {
          for(var p=0, len=roll.length; p<len; p++) {
            removeClass(roll[p], 'current');
          }

          addClass(roll[i], 'current');
        }*/
      }
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

    on(roll[i], 'click', function(e) {
      // console.log('这是第'+this.index+'个, '+'距离顶部为：'+offset(main[this.index]).top);
      clearInterval(timer1);
      target1 = offset(main[this.index]).top - offset(nav).height; // 核心语句

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
    on(navrli[i], 'click', () => {
      // console.log(i);
      animate1(navr, target, 0);
      flag = true;
    });
  }

  function animate(obj, current, target) {
    let timer = null;
    clearInterval(timer);

    timer = setInterval(() => {
      current =current + (target - current) / 10;
      current = current > 0 ? Math.ceil(current) : Math.floor(current);
      obj.style.height = current+'px';
      console.log(current, target);

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

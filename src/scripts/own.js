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

    // let body = $('body');
    // console.log(body.style.cssText);
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
      document.body.style.overflow = "hidden"; // 隐藏滚动条
      addClass(navr, 'nav_r_add');
      animate(navr, 0, target);
      flag = false;

    }else {
      document.body.style.overflow = "visible"; // 显示滚动条
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

/**
 * 作品
 */

{
  /**
   * 数据 title 标题 url 图片地址
   */

  let arrP = [
    {title: '超融合自动化运维系统', url: 'p01.png'},
    {title: '彭州公安队伍管理后台系统', url: 'p02.png'},
    {title: '成华公安后台报备管理系统', url: 'p03.png'},
    {title: '偏平化系统', url: 'p04.png'}
  ];

  let arrM = [
    {title: '彭州队伍管理APP', url: 'm01.png'},
    {title: '雪亮工程APP', url: 'm02.png'},
    {title: '考勤APP', url: 'm03.png'},
    {title: '报备APP', url: 'm04.png'}
  ];

  let arrU = [
    {title: '派沃特宣传画册', url: 'u01.png'},
    {title: '派沃特宣传DM单', url: 'u02.png'},
    {title: '派沃特公司简介易拉宝', url: 'u03.png'},
    {title: '派沃特企业VI', url: 'u04.png'}
  ];

  let arrAll = arrP.concat(arrM, arrU);

  function randomSort(arr, newArr) { // 随机数组
    if(arr.length == 1) {
      newArr.push(arr[0]);

      return newArr;
    }

    var random = Math.ceil(Math.random()*arr.length) - 1;
    newArr.push(arr[random]);
    arr.splice(random,1);

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
    for(var i=0, len=arr.length; i<len; i++) {
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
  for(let i=0, len=liSpan.length; i<len; i++) {
    on(liSpan[i], 'click', function(num) {
      return () => {

        for(var j=0; j<liSpan.length; j++) {
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
    for(let i=0, len=obj.length; i<len; i++) {
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
  // 数据 title 标题 desc 描述 data 详情 url 图片名字
  let arrJ = [
    {title: '超融合管理平台', desc: '设计规划建设大数据平台，整合数据资源，发挥数据新价值，提升决策和风险防范水平，提高治理能力；实现对经济运行更为准确的监测、分析、预测、预警，提高决策的针对性、科学性和时效性。同时，也可通过互联网公共服务门户，面向社会大众提供政务数据服务，提升地方政府的社会服务治理水平。', deta: '以最高人民法院提出的“大数据、大格局、大服务”理念为指导原则，针对各级法院信息系统建设独立、法院内部各系统信息分散情况，以司法审判信息资源库及相应的信息资源交换和目录服务体系为支撑，运用顶层设计思想，从省高院、中院全局视角出发，科学整合各类司法信息资源，构建集审判动态、司法统计、审判质效、司法人事、司法公开、司法行政等一体的全方位、立体化和可视化的“司法信息数据平台”，实现对法院司法信息资源的海量存储、科学分类、多元检索，为法院多视角、多层级、多方面的信息服务和决策支持应用提供数据支撑。', url: 'j01.png'},
    {title: '综合指挥调度平台', desc: '以互联网、物联网、GIS等技术融合为支撑，以大数据融合为驱动，推出了综合指挥调度系统。实现音视频调度、集群对讲、数据调度、GIS调度、远程监控、视频会议等一体的综合调度平台，为客户提供专业的解决方案，解决指挥手段繁多、系统融合难度高等问题，完美实现系统联动、调度。', deta: '政府部门力量分散、条块分割、职能交叉、推诿扯皮等现象突出，各级、各类管理资源和力量急需进一步优化和整合。公司以P3业务基础平台流程管理为引擎，融合云呼叫中心、视联网、即时通信、物联网、GIS等技术，构建大联动信息平台。通过整合业务资源，实现城市治理不同部门异构系统间的资源共享和业务协同。运用大数据思维和技术，不断整合优化业务流程，构建城市治理联动中心，持续推进服务治理线上线下融合创新，构建“大联动+大数据应用”新机制，驱动城市治理从“经验治理”转向“科学治理”，引领城市治理联动新格局。为政府探索解决传统社会管理和服务理念、体制、机制、制度、方法等不适应社会经济发展需要的突出问题提供了完整的信息化解决方案，极大的节约了行政成本、提高了行政效能，全面提升了区域社会治理和服务的能力。', url: 'j02.png'},
    {title: '勤务及队伍管理现代化', desc: '针对执法人员出勤制度、装备管理制度、重大安保活动保障要求和流动性大的特点，创造性地将勤务和人员管理与案事件、任务、指挥、装备进行融合关联，并结合4G移动终端，解决了各级执法部门勤务和队伍管理的痛点，引领勤务和队伍管理从传统落后局面迈向现代化。', data: '凭借对公安指挥体系的深刻理解，结合依托指挥体系的信息化系统特点和发展规划，为各级公安机关打造具有先进合成作战指挥理念的现代化指挥中心。指挥中心不仅考虑传统功能分区，更兼顾警种之间的配合协作、各类信息系统之间的兼容集成、各类指挥场景的灵活切换和与政法委的双中心互动。在平台融合、业务融合先进理念的支撑下，为公安机关打造运行稳定、调度灵活、扩展简单的新一代合成作战指挥中心。', url: 'j03.png'}
  ];
}

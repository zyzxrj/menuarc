const srart_pos = 90.75;
const item_count = 13;
const radius = 250;
const s = (0.52 * Math.PI) / 180;

const angle = Math.PI / 180; //1度=π/180≈0.01745弧度

var pos = [];
var elem = document.getElementsByClassName("item");

function allocationItems() {
  // debugger
  //首先设置第7个元素处于中间最大的位置
  var i;

  //计算其它菜单项的位置
  pos[0] = srart_pos;
  for (i = 1; i < item_count; i++) {
    pos[i] = pos[i - 1] - 0.2;
    last_pos = pos[i];
  }
  for (i = 0; i < item_count; i++) {
    setItemCss(i);
  }
}

allocationItems();

var deg = 0;
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
var box = document.querySelector("#container");

// 根据当前位置设置当前css
function setItemCss(i) {
  const locationX = 240 + radius * Math.sin(pos[i]);
  const locationY = 240 + radius * Math.cos(pos[i]);
  let opacity; //离圆心月近就越接近1

  if (locationY < radius) {
    opacity = (radius - locationY) / radius;
  } else {
    opacity = (locationY - radius) / radius;
  }
  elem[i].style.left = locationX + "px";
  elem[i].style.top = locationY + "px";
  elem[i].style.opacity = 1 - opacity;
  console.log("locationY", locationY, 1 - opacity);
}

function boxTouchStart(e) {
  var touch = e.touches[0]; //获取触摸对象
  startX = touch.clientX; //获取触摸坐标
  startY = touch.clientY;
  // console.log(touch);
}

function boxTouchMove(e) {
  endX = e.touches[0].clientX; //获取触摸坐标
  endY = e.touches[0].clientY; //获取触摸坐标

  const changeDeg = (endY - startY) / radius;
  // console.log("move", endX - startX, "startY", endY - startY, changeDeg);

  for (i = 0; i < item_count; i++) {
    setItemCss(i);
    pos[i] -= changeDeg;
  } /* callback function */

  // changeItems(changeDeg)
  startX = e.touches[0].clientX; //获取触摸坐标
  startY = e.touches[0].clientY;
}

// 做节点循环处理
function changeItems(changeDeg) {
  var list = document.getElementById("list");
  var ch = changeDeg > 0 ? list.firstElementChild : list.lastElementChild;
  ch.remove();
  if (changeDeg > 0) {
    list.appendChild(ch);
  } else {
    list.insertBefore(ch, list.firstChild);
  }
  allocationItems();
}

function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn && fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}
box.addEventListener("touchstart", boxTouchStart, false);
box.addEventListener(
  "touchmove",
  throttle((e) => {
    boxTouchMove(e);
  }, 100)
);


function animation( flag) {
  var $ = {
      radius: 250, //圆周半径
      speed: 10 // 速度单位
  }
  var e = elem;
  console.log(3);
  
  function animate(draw, duration, callback) {
      console.log(4);
      
      var start = performance.now();


      requestAnimationFrame(function run(time) {
         
          console.log(5);
          // 自启动来的时差
          var timePassed = time - start;
          console.log(time, start)
          // 不能最大持续时间
          if (timePassed > duration)
              timePassed = duration;
          //重新绘制菜单项的位置
          draw();
          console.log(6);
          if (timePassed < duration) {
              console.log(7);
              requestAnimationFrame(run);
          } else 
          {
              console.log(8);
              // callback();
              console.log(9);
          }
      });
  }
  //执行函数
  animate(function () {
      console.log(1);
      var i;
      for (i = 0; i < item_count; i++) {
          setItemCss(i);
          if (flag) {
              pos[i] += s;
          } else {
              pos[i] -= s;
          }
      }   /* callback function */
  }, 400, function changeItems() { //这边用来做节点循环处理的，没有用到
      console.log(2);
      var list = document.getElementById('list');
      var ch = flag ? list.firstElementChild : list.lastElementChild
      ch.remove();
      if (flag) {
          list.appendChild(ch);
      } else {
          list.insertBefore(ch, list.firstChild);
      }
      allocationItems();
  });
}
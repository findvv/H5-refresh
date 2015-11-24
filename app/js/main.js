window.showList = function(data) {
  let newList = data.events,
      list = document.getElementsByClassName('list')[0],
      firstLi = list.childNodes[0];
  newList.forEach(function(element, index){
    let li = document.createElement("li");
    li.innerHTML = element.title;
    list.insertBefore(li,firstLi);    
  });
  refresh.openLock();
}
class Refresh {
  constructor(count=5,type='music',loc='beijing',lock=true,start=0,min=100) {
    this.count = count;
    this.type = type;
    this.loc = loc;
    this.lock = lock;
    this.min = min;
    this.start = start;
  }
  openLock(){
    this.lock = true;
  }
  getData() {
    let that = this,
        script = document.createElement("script"),
        body = document.getElementsByTagName('body')[0];
    script.type = "text/javascript";
    script.src = `https://api.douban.com/v2/event/list?callback=showList&type=${that.type}&count=${that.count}&loc=${that.loc}&start=${that.count*that.start}`;
    body.appendChild(script);
    body.removeChild(script);
    this.bindEvent();
  }
  bindEvent(){
    let startY = 0,
        endY = 0,
        moveY = 0,
        that = this,
        list = document.getElementsByClassName('list')[0];
    list.addEventListener('touchstart', (event)=>{
      if (!that.lock) {return;}
      list.className = 'list';
      startY = event.touches[0].pageY;
    },false);
    list.addEventListener('touchmove', (event)=>{
      if (!that.lock) {return;}
      endY = event.touches[0].pageY;
      moveY = endY-startY>300?300:endY-startY;
      list.style.transform = `translate3d(0,${moveY}px,0)`;
      list.style.webkitTransform = `webkitTranslate3d(0,${moveY}px,0)`;
    },false);
    list.addEventListener('touchend', (event)=>{
      if (!that.lock) {return;}
      list.className = 'list list-back';
      list.style.transform = `translate3d(0,0,0)`;
      list.style.webkitTransform = `webkitTranslate3d(0,0,0)`;
      if (moveY<that.min) {return;}
      that.lock = false;
      that.start+=1;
      that.getData();
    },false);
  }
}
var refresh = new Refresh();
refresh.getData();

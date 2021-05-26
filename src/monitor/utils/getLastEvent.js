let lastEvent;

['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(type=>{
  document.addEventListener(type, (e)=>{
    lastEvent = e;
  }, {
    capture: true,    // 捕获阶段
    passive: true     // 不阻止默认事件
  })
})

export default function() {
  return lastEvent
}
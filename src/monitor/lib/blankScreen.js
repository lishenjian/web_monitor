import Tracker from '../utils/sendLog';
import getSelector from  '../utils/getSelector';

export function blankScreen() {
  let wrapperEl = ['html', 'body', '#container', '.content'];
  let emptyPoints = 0;
  function getSelector(element) {
    if(element.id) {
      return '#' + element.id;
    }else if(element.className) {
      return '.' + element.className.split(' ').filter(item=>!!item).join('.');
    }else {
      return element.nodeName.toLowerCase();
    }
  }
  function isWrapper(element) {
    let selector = getSelector(element);
    if(wrapperEl.indexOf(selector) !== -1) {
      emptyPoints++;
    }
  }
  for(let i = 0; i < 9; i++) {
    let xLineEl = document.elementsFromPoint(window.innerWidth * i/10, window.innerHeight/2);
    let yLineEl = document.elementsFromPoint(window.innerWidth/2, window.innerHeight*i/10)
    isWrapper(xLineEl[0]);
    isWrapper(yLineEl[0]);
  }
  //如果大于 8 个
  if(emptyPoints > 8) {
    let centerEl = document.elementsFromPoint(window.innerWidth/2, window.innerHeight/2)
    Tracker.send({
      kind: 'stability',
      type: 'blank',
      emptyPoints: emptyPoints,
      screen: window.screen.width + 'X' + window.screen.height,
      viewPoint: window.innerWidth+ 'X' + window.innerHeight,
      selector: getSelector(centerEl[0])
    })
  }
}
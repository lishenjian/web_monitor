import Tracker from '../utils/sendLog';
import onload from  '../utils/onload';
import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';

export function timing() {
  let FMP, LCP;
  // 增加一个性能条目的观察者
  new PerformanceObserver((entryList, observer)=>{
    let perfEntries = entryList.getEntries();
    FMP = perfEntries[0];
    observer.disconnect();  //不再观察了
  }).observe({entryTypes: ['element']}); 

  new PerformanceObserver((entryList, observer)=>{
    let perfEntries = entryList.getEntries();
    LCP = perfEntries[0];
    observer.disconnect();  //不再观察了
  }).observe({entryTypes: ['largest-contentful-paint']}); 

  //用户第一次交互
  new PerformanceObserver((entryList, observer)=>{
    let lastEvent = getLastEvent();
    let firstInput = entryList.getEntries()[0];
    console.log('FID', firstInput);
    if(firstInput) {
      //processingStart开始处理的时间，startTime开始点击的时间，差值为处理的延迟
      let inputDelay = firstInput.processingStart - firstInput.startTime;
      let duration = firstInput.duration; //处理的耗时
      if(inputDelay > 0 || duration > 0) {
        Tracker.send({
          kind: "experience",       //用户体验指标
          type: 'firstInputDelay',  //首次输入延迟
          inputDelay: inputDelay,    //延时的时间
          duration: duration,                 //处理的时间
          startTime: firstInput.startTime,
          selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target):''
        })
      }
    }

    observer.disconnect();  //不再观察了
  }).observe({type: 'first-input', buffered: true}); 

  onload(function(){
      setTimeout(() => {
          const {
            fetchStart,
            connectStart,
            connectEnd,
            requestStart,
            responseStart,
            responseEnd,
            domLoading,
            domInteractive,
            domContentLoadedEventStart,
            domContentLoadedEventEnd,
            loadEventStart
          } = performance.timing;
          console.log('fetchStart:',fetchStart);
          console.log('connectStart:',connectStart);
          console.log('connectEnd:',connectEnd);
          console.log('requestStart:',requestStart);
          console.log('responseStart:',responseStart);
          console.log('responseEnd:',responseEnd);
          console.log('domLoading:',domLoading);
          console.log('domInteractive:',domInteractive);
          console.log('domContentLoadedEventStart:',domContentLoadedEventStart);
          console.log('domContentLoadedEventEnd:',domContentLoadedEventEnd);
          console.log('loadEcentStart:',loadEventStart);
          Tracker.send({
              kind: "experience",
              type: 'timing',
              connectTime: connectEnd - connectStart, //连接时间
              ttfbTime: responseStart - requestStart, //首字节获取时间
              respinseTime: responseEnd - responseStart,
              parseDOMTime: loadEventStart - domLoading, //DOM解析时间
              domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
              timeToInteractive: domInteractive - fetchStart, //首次可交互时间
              loadTime: loadEventStart - fetchStart, //完整加载时间
          })

          let FP = performance.getEntriesByName('first-paint')[0];
          let FCP = performance.getEntriesByName('first-contentful-paint')[0];
          
          console.log('FP', FP);
          console.log('FCP', FCP);
          console.log('FMP', FMP);    //首次有意义的绘制，浏览通过 元素 elementtiming 属性确定是否有意义
          console.log('LCP', LCP);
      }, 3000);
  })
}
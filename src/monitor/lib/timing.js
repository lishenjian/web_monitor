import Tracker from '../utils/sendLog';
import onload from  '../utils/onload';

export function timing() {
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
      }, 3000);
  })
}
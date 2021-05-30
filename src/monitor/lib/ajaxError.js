import Tracker from '../utils/sendLog';

export function injectAjax() {
    let XMLHttpRequest = window.XMLHttpRequest;
    let oldOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, async) {
        this.logData = {method, url, async};
        return oldOpen.apply(this, arguments);
    }
    let oldSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(body) {
        if(this.logData) {
            let startTime = Date.now();
            let handler = (type) =>(event)=> {
                console.log(event);
                // debugger
                let duration = Date.now() - startTime;
                let status = this.status;
                let statusText = this.statusText;
                Tracker.send({
                    kind: "stability",               	//大类
                    type: "ajax",                    	//小类
                    errorType: type,        			//错误类型
                    pathname: this.logData.url,         //路径
                    status: status + '_'  + statusText, //状态
                    duration: duration,                 //持续时间
                    response: this.response ? JSON.stringify(this.response): '',                       //响应信息
                    params: body || ''                  //请求参数
                })
            }
            this.addEventListener('load', handler('load'), false);
            this.addEventListener('error', handler('error'), false);
            this.addEventListener('abort', handler('abort'), false);
        }
        return oldSend.apply(this, arguments);
    }
}
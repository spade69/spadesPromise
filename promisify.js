/*
An async library . exposed as API . 
spadesPromise
* Feature 1 based on native JavaScript. adding some ES6 feature (a polyfill way)
* Feature 2 support >=IE8 etc..
* Feature 3 Detect if browser support Promise. If not then use polyfill
* Feature 4 
v 0.1.0 (c) Jason Lin
 */

//AJAX
//XMLHttpRequest 这个类的每个实例都表示一个独立的请求/响应对
//对象属性和方法允许指定请求细节和提取响应数据
var getJSON=function(url){
    var promise=new Promise(function(resolve,reject){
        var request=new XMLHttpRequest();
        request.open("GET",url);//GET has no body but POST has !
        request.setRequestHeader("Accept","application/json");
        request.onreadystatechange=handler;
        request.responseType='json';
        request.send(); 

        function handler(){
            //4 means Done
            if(this.readyState===4&&this.status===200){
                resolve(this.response);
            }else{
                reject(new Error(this.statusText));
            }
        }
    });

    return promise;
}
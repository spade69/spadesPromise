/*
An async library . exposed as API . 
spadesPromise
* Feature 1 based on native JavaScript. adding some ES6 feature (a polyfill way)
* Feature 2 support >=IE8 etc..
* Feature 3 Detect if browser support Promise. If not then use polyfill
* Feature 4 
v 0.1.0 (c) Jason Lin
 */

/*************AJAX**************************************************************
***********************************************************************************/
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

/*************Array.prototype.map**************************************************
***********************************************************************************/
//Polyfill for browser that dosen't support Array.prototype.map
if(!Array.prototype.map){
    Array.prototype.map=function(cb,context){
        var T,A,K;
        if(this==null){
            throw new TypeError("this is null or not defined");
        }

        //让O存储当调用这个map函数所指向的对象!
        var O=Object(this);

        //len存储(数组)长度。
        var len=O.length;//>>>0
        if(typeof cb!=='function'){
            throw new TypeError(cb+'is not a function');
        }
        //if context was supplied , let T be contxt or be undefined
        if(arguments.length>1)
            T=context
        //let A be new array  and length is this Array
        A=new Array(len);

        K=0;

        while(K<len){
            var kVal,mappedVal;
            if(K in O){
                //kVal 存储调用O[k]的结果。
                kVal=O[K];
                //调用回调函数的结果。
                mappedVal=cb.call(T,kVal,K,O);

                A[K]=mappedVal;
            }
             K++;
        }
        //返回新数组
        return A;
    };
}

//adding x to distinguish?  it's module
var map=function(vals,cb){
    if(!map){
        //如果出错，则这个返回的promise就会是reject
        return Promise.all(
            //all返回一个新的Promise当所有mapped 的元素都为resolved
            vals.map(function(val){ 
                return new Promise(function(resolve){
                    cb(val,resolve); 
                });
            })
        );
    }
}                 

/***********************Object.assign****************************************/
//Polyfill for browser that doesn't support ES5 Object.assign
//我们使用这个函数来合并对象 helper 函数
var combine=Object.assign(obj1,obj2);
if(typeof Object.assign!='function'){
    Object.assign=function(target,varArgs){//length of function is 2
        if(target==null){ //类型错误 
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to=Object(target);
        for(var index=1;index<arguments.length;index++){
            var nextSource=arguments[index];
            if(nextSource!=null){//跳过 undefined 或者 null
                for(var nextKey in nextSource){
                    if(Object.prototype.hasOwnProperty.call(nextSource,nextKey)){
                        to[nextKey]=nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

/**CRUD的promisify！！！for Mongoose *********************
********************************************************/


//Test coverage测试覆盖率
exports.parseAsync=function(input,cb){
    setTimeout(function(){
        var result;
        try{
            result=JSON.parse(input);
        }catch(e){
            return cb(e);
        }
        cb(null,result);
    },10);
}
exports.getJSON=getJSON;
exports.map=map;
// Anonymous function
(function () {

    // MaePaySoh returns new Library object that hold the function. 
    var MaePaySoh = function (appkey) {
        return new Library(appkey);
    };
     
    
    var Library = function (appkey) {

        this.appkey=appkey;
        this.method="GET";

        this.url="http://api.maepaysoh.org/";
        this.async=false;
        
        this.onError=function(req){

        };
        this.onCancel=function(req){

        };
        

        this.xhr = new XMLHttpRequest();
        this.xhr.responseType = "json";
        
        this.xhr.addEventListener("error", this.onError, false);
        this.xhr.addEventListener("abort", this.onCancel, false);
        this.token=localStorage.getItem(this.appkey);
        var lib=this;
        this.generateToken=function(callback){
                if(lib.token===null){
                    lib.xhr.onload=function(req){
                    if(typeof req.srcElement.response._meta.status!=='undefined' && req.srcElement.response._meta.status==='ok'){
                        lib.token=req.srcElement.response.data.token;
                        console.log('token generated:'+lib.token);
                        localStorage.setItem(lib.appkey, lib.token);
                        callback();
                    }
                };

                lib.xhr.open('POST', lib.url+'token/generate');
                var formData = new FormData();
                formData.append('api_key', lib.appkey);
                lib.xhr.send(formData);
            }
            else{
                callback();
            }
            
        }
        
        this.request=function(options){
            if(typeof options.endpoint==='undefined')
                throw new Error('No endpoint defined!');
            
            var constructParams=function(params){
                url = Object.keys(params).map(function(k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
                }).join('&');
                return url;
            };

            var send=function(options){
                lib.xhr.onload=options.onComplete;
                
                var url=lib.url+options.endpoint+'?token='+lib.token;
                
                if(typeof options.params!=='undefined'){
                    url=lib.url+options.endpoint+'?token='+lib.token+'&'+constructParams(options.params)
                }
                
                lib.xhr.open(lib.method,url);
                lib.xhr.send();
            };


            if(lib.token===null){
                this.generateToken(function(){
                    send(options)
                });
            }
            else{
                send(options);
            }

        };
        return this;        
    };
    

    // Assign our MaePaySoh object to global window object.
    if(!window.MaePaySoh) {
        window.MaePaySoh = MaePaySoh;
    }

})();
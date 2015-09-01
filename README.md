# MaePaySoh Javascript SDK
Javascript SDK to access MaePaySoh API

Include the SDK
`<script src="MaePaySoh.js"></script>`

Call the endpoint like example below
```
var mps=MaePaySoh('6ca7ce5f2112c6733d295991dc55649aa0610ae5'); // pass API Key here
mps.request({
				endpoint:'candidate/list',
				onComplete:function(req){
					console.log(req.srcElement.response);
				}
			});
```

You can pass options to request method with parameters below
```
{
    endpoint:'candidate/list', //endpoint path
    onComplete:function(req){
        // your callback function here
        },
    params:{
      //put parameters that needed by endpoint here
      _with:'party',
      gender:'male'
    }
```

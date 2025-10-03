let consultar = () =>{
fetch('https://api.thingspeak.com/channels/2987035/feeds.json?api_key=DR3CKV912GFROVC2&results=2')
    .then(Response => Response.json())
    .then(data =>{
        console.log(data);
        
    }) 



}; 

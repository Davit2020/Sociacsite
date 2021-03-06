document.addEventListener("DOMContentLoaded",()=>{
        if(localStorage.getItem("accessToken")){
       
             fetch("/", {
                 method: "POST",
                 headers: {
                   "content-type": "application/json",
                   Authorization: localStorage.getItem("accessToken")
                 }
               }).then(res=>res.json())
               .then(data=>{
     
                    if(data.error){
                        alert(data.error)
                        loginFunction()
                        return
                    }
                    
                   let {userInfo,onlineUsers}= data
                 
                   homeFunction(userInfo,onlineUsers);
                   onlineFunction(userInfo);
               })
     }else{
       loginFunction()
     }
})
    
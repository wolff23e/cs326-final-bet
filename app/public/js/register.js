import { postData } from './utility.js';

function login(){
    (async () => {
        let pass = document.getElementById("username").value;
        let userName = document.getElementById("password").value;
        const data={'username': userName,'password':pass}
        
        const resp = await postData(getUrl('user/login'), data);
        const jsonResponse=await resp.json();
        console.log(JSON.stringify(jsonResponse));
        if(jsonResponse["success"] !== true) {
            document.getElementById("userorpassinc").style.visibility = "visible";
        }

        })();
}
$("#loginsubmit").on("click", login);

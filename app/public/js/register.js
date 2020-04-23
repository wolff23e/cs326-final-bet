import { postData } from './utility.js';

function login(){
    (async () => {
        let pass = document.getElementById("username").value;
        let userName = document.getElementById("password").value;
        const data={'username': userName,'password':pass}
        const newURL = url + "/user" + userName + "/login";
        const resp = await postData(newURL, data);
        console.log(resp);
        if(resp.success!=true){
            document.getElementById("userorpassinc").style.visibility = "visible";
        }

        })();
}
$("#loginsubmit").on("click", login);

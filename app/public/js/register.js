import { postData } from './utility.js';

export function login(){
    (async () => {
        let pass = document.getElementById("username").value;
        let userName = document.getElementById("password").value;
        console.log(userName);
        const data={'username': userName,'password':pass}
        const j = await resp.json();
        if (j['result'] !== 'error') {
            document.getElementById("output").innerHTML = "101: <b>" + userName + ", " + counterName + " created.</b>";
        } else {
            document.getElementById("output").innerHTML = "100: " + userName + ", " + counterName + " not found.</b>";
        }
        })();
}
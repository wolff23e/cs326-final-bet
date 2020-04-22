async function postData(url, data) {
    const resp = await fetch(url,
                             {
                                 method: 'POST',
                                 mode: 'cors',
                                 cache: 'no-cache',
                                 credentials: 'same-origin',
                                 headers: {
                                     'Content-Type': 'application/json'
                                 },
                                 redirect: 'follow',
                                 body: JSON.stringify(data)
                             });
    return resp;
}
function login(){
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
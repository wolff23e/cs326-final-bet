import { postData, getUrl } from './utility.js';

function showError(errorText) {
    $("#login-error").html(errorText);
    $("#login-error").removeClass("invisible");
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function login(){
    (async () => {
        let email = $("#login-email").val();
        let password = $("#login-password").val();

        if (!email || !new RegExp(emailRegex).test(email)) {
            showError("Please enter valid email");
            return;
        }

        if (!password || password.length < 8 || password.length > 40) {
            showError("Password must be atleast 8 characters and less than 40");
            return;
        }

        const data = { username: email, password };
        
        const resp = await postData(getUrl('user/login'), data);
        const jsonResponse = await resp.json();

        console.log(JSON.stringify(jsonResponse));

        if (jsonResponse["success"] !== true) {
            showError("Email or password is incorrect");
        } else {
            const jwt = jsonResponse["jwt"];
            // save jwt in localStorage
            $("#close-login-modal").click();
        }

    })();
}

$(document).on("click", '#login-submit', login);

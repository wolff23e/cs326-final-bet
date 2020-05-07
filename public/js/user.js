import { postData, getUrl } from './utility.js';

// Check if logged in and set UI accordingly

function updateLoginUI () {
    const jwt = window.localStorage.getItem("jwt");
    if (jwt) {
        console.log("logged in!");
        $("#nav-register").hide();
        $("#nav-login").hide();
        $("#nav-logout").show();
    } else {
        console.log("Not logged in!");
        $("#nav-register").show();
        $("#nav-login").show();
        $("#nav-logout").hide();
    }
}

window.updateLoginUI = updateLoginUI;

// Logout

function logout () {
    window.localStorage.removeItem("jwt");
    updateLoginUI();
}

window.logout = logout;


// Login

function showLoginError(errorText) {
    $("#login-error").html(errorText);
    $("#login-error").removeClass("invisible");
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function login(){
    (async () => {
        let email = $("#login-email").val();
        let password = $("#login-password").val();

        if (!email || !new RegExp(emailRegex).test(email)) {
            showLoginError("Please enter valid email");
            return;
        }

        if (!password || password.length < 8 || password.length > 40) {
            showLoginError("Password must be atleast 8 characters and less than 40");
            return;
        }

        const data = { email, password };
        
        const resp = await postData(getUrl('user/login'), data);
        const jsonResponse = await resp.json();

        console.log(JSON.stringify(jsonResponse));

        if (jsonResponse["success"] !== true) {
            showLoginError(jsonResponse["error"]);
        } else {
            const jwt = jsonResponse["jwt"];
            
            // store in localStorage
            window.localStorage.setItem("jwt", jwt);

            $("#login-email").html("");
            $("#login-password").html("");
    
            $("#close-login-modal").click();

            updateLoginUI();
            window.location.href="index.html"
        }

    })();
}

$(document).on("click", '#login-submit', login);

// Registration


function showRegisStatus(errorText, isErr = true) {
    const status = $("#regis-status");
    status.html(errorText);
    status.removeClass("invisible");
    if (!isErr) {
        status.removeClass("text-danger");
    }
}

function register(){
    (async () => {
        let email = $("#regis-email").val();

        let firstname = $("#regis-first-n").val();
        let lastname = $("#regis-last-n").val();
        let school = $("#regis-school").val();

        let passwordOne = $("#regis-pass").val();
        let passwordTwo = $("#regis-con-pass").val();

        if (!email || !new RegExp(emailRegex).test(email)) {
            showRegisStatus("Please enter valid email");
            return;
        }

        if (!passwordOne || passwordOne.length < 8 || passwordOne.length > 40) {
            showRegisStatus("Password must be atleast 8 characters and less than 40");
            return;
        }

        if (!passwordTwo || passwordOne !== passwordTwo) {
            showRegisStatus("Passwords do not match");
            return;
        }

        if (!firstname || !lastname) {
            showRegisStatus("First name or last name is not valid");
            return;
        }

        if (!school) {
            showRegisStatus("School not valid");
            return;
        }

        const data = { 
            email,
            firstname,
            lastname,
            school,
            password: passwordOne,
        };
        
        console.log("request data:" + JSON.stringify(data));

        const resp = await postData(getUrl('user/register'), data);
        const jsonResponse = await resp.json();

        console.log("response data:" + JSON.stringify(jsonResponse));

        if (jsonResponse["success"] !== true) {
            showRegisStatus(jsonResponse["error"]);
        } else {
            showRegisStatus("Registration successful! Please sign in.", false);
        }

    })();
}

$(document).on("click", '#regis-submit', register);
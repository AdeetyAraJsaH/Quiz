const inner_container = document.getElementById("inner-container")
const signIn = document.getElementById("signIn-btn");
const signUp = document.getElementById("signUp-btn");
const email1 = document.getElementById("email-1");
const password = document.getElementById("password");
const signIn_form = document.getElementById("signIn-form");
const signUp_form = document.getElementById("signUp-form");
const email2 = document.getElementById("email-2");
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const forgot_password = document.getElementById('forgot-password');
// const forgot_password_slide=document.getElementsByClassName('forgot-password-slide');

signUp_form.addEventListener('click', e => {
    inner_container.style.transform = "rotateY(-180deg)";
    // inner_container.style.boxShadow = "10px -8px rgb(240, 212, 110)";
});

signIn_form.addEventListener('click', e => {
    inner_container.style.transform = "rotateY(0deg)";
    // inner_container.style.boxShadow = "-10px -8px rgb(240, 212, 110)";
    
});

var a = [];
a = JSON.parse(localStorage.getItem('all_users')) ? JSON.parse(localStorage.getItem('all_users')) : [];
console.log(a);
const hash = Object.fromEntries(
    a.map(e => [e.email, e.password]));
// console.log(hash[email1.value]);
signIn.addEventListener('click', e => {
    var isLogin = true;
    if (hash[email1.value] && atob(hash[email1.value]) === password.value) {
        window.location.assign('/');
    } else {
        alert("Login Failed !!!");
    }
    console.log("test" + atob(hash[email1.value]))
    email1.value = "";
    password.value = "";
});


email2.addEventListener('keyup', e => {
    if (email2.checkValidity()) {
        var check_email = "[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com)";
        var regE = new RegExp(check_email);
        var res = regE.test(email2.value);
        if (res) {
            password1.disabled = false;
            password2.disabled = false;
        } else {
            password1.disabled = true;
            password2.disabled = true;
        }
    }
    if (hash[email2.value]) {
        alert('email exists.')
        email2.value = '';
    }
})
password1.disabled = true;
password2.disabled = true;
signUp.disabled = true;
password2.addEventListener('keyup', e => {
    if (password1.value === password2.value) {
        signUp.disabled = false;
    } else {
        signUp.disabled = true;
    }
})
signUp.addEventListener('click', e => {

    var eml = email2.value;
    var pass = password1.value;

    var curr_user = {
        email: eml,
        password: btoa(pass)
    };
    a.push(curr_user);

    localStorage.setItem('all_users', JSON.stringify(a));
    window.location.assign('/');
    console.log(a);
});






//Handles login requests
const handleLogin = e => {
    e.preventDefault();

    if ($("#email").val() == '') {
        //TODO: Implement error feedback
        console.log("Email is required")
        return false;
    }

    if ($("#pass").val() == '') {
        //TODO: Implement error feedback
        console.log("Password is required")
        return false;
    }

    sendAjax($("#loginForm").attr("method"), $("#loginForm").attr("action"), $("#loginForm").serialize(), (result, status, xhr) => {
        window.location = result.redirect;
    });

    return false;
}

const LoginForm = (props) => {
    return (
        <form id="loginForm" name="loginForm" onSubmit={handleLogin} action="/login" method="POST" className="mainForm">

            <div className="fields">
                {/* <input className="field" id="email" type="text" name="email" value={email} onChange={e => setEmail(email)} onBlur={() => checkEmail(email)} /> */}
                <input className="field" id="email" type="text" name="email" placeholder="Email" />
                <input className="field" id="pass" type="password" name="pass" placeholder="Password" />

            </div>

            <input id="signupCsrf" type="hidden" name="_csrf" value={props.csrf} />
            <button id="loginButton" type="submit">Login</button>
            <p>Don't have an account? <a href="./signup">Sign Up</a></p>
        </form>
    )
}

const setup = function (csrf) {
    ReactDOM.render(
        // <LoginForm />, document.querySelector('#login')
        <LoginForm csrf={csrf} />, document.querySelector('#login')
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
      setup(result.csrfToken);
    });
  };

$(document).ready(function (){
    getToken();
});
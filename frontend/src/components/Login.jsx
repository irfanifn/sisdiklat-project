import React from "react";

function Login() {
  return (
    <div className="login-container">
      <h1 className="form-title">Login</h1>
      <form action="#" className="login-form">
        <div className="input-wrapper">
          <input
            type="mail"
            placeholder="Email"
            className="input-field"
            required
          />
          <span class="material-symbols-rounded">mail</span>
        </div>

        <div className="input-wrapper">
          <input
            type="number"
            placeholder="NIP"
            className="input-field"
            required
          />
          <span className="material-symbols-rounded">numbers</span>
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;

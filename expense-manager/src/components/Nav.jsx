import { useState } from "react";

function NavBar({
  page,
  setPage,
  onLogout,
  isLoggedIn,
  onUsernameChange,
  onPasswordChange,
  onLogin,
  errorStatus,
  setSuccessStatus,
}) {
  const [navLinkOpen, navLinkToggle] = useState(false);
  const handleClick = () => {
    navLinkToggle(!navLinkOpen);
  };

  function navTo(e, target) {
    e.preventDefault();
    const url = "/" + target;
    window.history.pushState({}, "", url);
    setPage(target);
    setSuccessStatus(false);
  }

  function errorPage() {
    return (
      <div className="error-panel">
        {errorStatus}

        <a
          href="#"
          onClick={(e) => {
            navLinkToggle(!navLinkOpen);
            navTo(e, "#");
            onLogout();
          }}
        >
          login back
        </a>
      </div>
    );
  }

  function Login() {
    return (
      <div className="login-main-container">
        {errorStatus && <div className="error-panel">{errorPage()}</div>}

        {!errorStatus && (
          <div>
            <h2 className="login-form-container-header">Login</h2>
            <form
              className="login-form-container"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="text"
                onChange={(e) => {
                  onUsernameChange(e);
                }}
                placeholder="Enter Username"
                name="username"
              ></input>
              <br />
              <input
                type="password"
                onChange={(e) => {
                  onPasswordChange(e);
                }}
                placeholder="Enter Password"
                name="password"
              ></input>
              <br />
              <button
                className=""
                onClick={(e) => {
                  onLogin();
                  navLinkToggle(!navLinkOpen);
                  navTo(e, "#Dashboard");
                }}
              >
                {" "}
                Login{" "}
              </button>
            </form>{" "}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="">
      <div className=""></div>
      <nav className="">
        <div className="">
          {!isLoggedIn && (
            <div className="">
              <div className=""></div>
              {Login()}
            </div>
          )}
          {isLoggedIn && page != "#" && (
            <div className="dashboard-container nav-pills mb-5 justify-content-center align-items-center nav nav-pills">
              <button
                aria-label="menu button"
                onClick={handleClick}
                className=""
              >
                &#9776;
              </button>
              <div>
                <ul className={navLinkOpen ? "open" : ""}>
                  <div className="nav-item">
                    <li className="list-group-item">
                      <a
                        href="#Dashboard"
                        className="nav-link"
                        onClick={(e) => {
                          navLinkToggle(!navLinkOpen);
                          navTo(e, "#Dashboard");
                        }}
                      >
                        Dashboard
                      </a>
                    </li>
                  </div>
                  <div className="nav-item">
                    <li className="list-group-item">
                      <a
                        href="#NewExpense"
                        className="nav-link"
                        onClick={(e) => {
                          navLinkToggle(!navLinkOpen);
                          navTo(e, "#NewExpense");
                        }}
                      >
                        Add Expenses
                      </a>
                    </li>
                  </div>
                  <div className="nav-item">
                    <li className="list-group-item">
                      <a
                        href="#ViewExpenses"
                        className="nav-link"
                        onClick={(e) => {
                          navLinkToggle(!navLinkOpen);
                          navTo(e, "#ViewExpenses");
                        }}
                      >
                        Check Expenses
                      </a>
                    </li>
                  </div>
                  <div className="nav-item">
                    <li className="list-group-item">
                      <a
                        href="#"
                        className="nav-link"
                        onClick={(e) => {
                          navLinkToggle(!navLinkOpen);
                          navTo(e, "#");
                          onLogout();
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
export default NavBar;

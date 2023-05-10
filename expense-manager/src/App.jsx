import {
  fetchAddExpense,
  fetchDeleteExpense,
  fetchUpdateExpense,
  fetchExpense,
  fetchSession,
  fetchLogin,
  fetchLogout,
} from "./services";
import "./styles/Loginstyle.css";
import "./styles/AddExpenseStyle.css";
import "./styles/DashboardStyle.css";
import "./styles/NavStyle.css";
import "./styles/ViewExpenseStyle.css";
import "./styles/ViewSingleExpenseStyle.css";
import "./styles/App.css";
import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Expenses from "./components/ViewExpenses";
import AddNewExpense from "./components/AddNewExpense";
import Dashboard from "./components/Dashboard";
import logo from "./styles/Logo2.jpg";

function App() {
  const [page, setPage] = useState(document.location.hash || "#");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [successStatus, setSuccessStatus] = useState(false);
  const [expenseData, setExpenseData] = useState({});
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);

  useEffect(() => {
    checkForSession();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      populateExpenses();
    }
  }, [isLoggedIn]);

  function checkForSession() {
    fetchSession()
      .then((userInfo) => {
        renderOnLogin(userInfo);
      })
      .catch((err) => {
        setPage("#Login");
        setIsLoggedIn(false);
      });
  }

  const displayErrorMessages = {
    networkError: "Trouble connecting to the network.  Please try again",
    default: "Something went wrong.  Please try again",
    authMissing: "UnAuthorized! Please login again",
    authInsufficient: "Invalid username. Please try some other",
    requiredUsername: "Username required. Please enter username.",
    requiredPassword:
      "Password required. Please enter username and password again.",
  };

  function checkSession() {
    fetchSession()
      .then((userInfo) => {
        populateExpenses();
        setErrorStatus("");
      })
      .catch((error) => {
        renderStatus(error);
        setUsername("");
        setPassword("");
      });
  }
  function populateExpenses() {
    fetchExpense()
      .then((expenses) => {
        setExpenseData(expenses);

        setErrorStatus("");
      })
      .catch((error) => {
        renderStatus(error);
      });
  }

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  function renderOnLogin(expenses) {
    setExpenseData(expenses);
    setIsLoggedIn(true);
    setErrorStatus("");
    setPage("#Dashboard");
  }
  function onLogin() {
    fetchLogin({ username, password })
      .then((userinfo) => {
        renderOnLogin(userinfo);
      })
      .catch((err) => {
        renderStatus(err);
      });
  }

  const onLogout = () => {
    fetchLogout()
      .then(() => {
        setIsLoggedIn(false);
        setUsername("");
        setPassword("");
        setErrorStatus("");
      })
      .catch((error) => {
        renderStatus(error);
        setIsLoggedIn(false);
      });
  };

  function renderStatus(message) {
    if (!message) {
      setErrorStatus("");
      return;
    }
    const key = message?.error ? message.error : "default";
    const msg = displayErrorMessages[key] || displayErrorMessages.default;
    setErrorStatus(msg);
    setIsLoggedIn(false);
    setPage("#");
  }

  function addExpense(
    expenseCategory,
    expenseDescription,
    expenseAmount,
    expenseDate
  ) {
    fetchAddExpense(
      expenseCategory.toLowerCase(),
      expenseDescription,
      expenseAmount,
      expenseDate
    )
      .then((expense) => {
        populateExpenses();
        setErrorStatus("");
        setSuccessStatus(true);
      })
      .catch((error) => {
        renderStatus(error);
        setUsername("");
        setPassword("");
      });
  }

  function updateExpense(
    index,
    expenseDescription,
    expenseAmount,
    expenseDate
  ) {
    const tempData = { expenseDescription, expenseAmount, expenseDate };
    fetchUpdateExpense(index, tempData)
      .then((expense) => {
        populateExpenses();
        setErrorStatus("");
      })
      .catch((error) => {
        renderStatus(error);
        setUsername("");
        setPassword("");
      });
  }

  function removeExpense(index) {
    fetchDeleteExpense(index)
      .then(populateExpenses())
      .catch((error) => {
        renderStatus(error);
        setUsername("");
        setPassword("");
      });
  }

  return (
    <div className="">
      <div className="logo-div-container">
        <img className="logo-container" src={logo} alt="Logo" />
      </div>
      <h1 className="logo-header">Expense Manager</h1>
      <Nav
        page={page}
        setPage={setPage}
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
        onLogin={onLogin}
        errorStatus={errorStatus}
        setSuccessStatus={setSuccessStatus}
      />
      {page === "#Dashboard" && (
        <Dashboard username={username} expenseData={expenseData} />
      )}
      {page === "#ViewExpenses" && (
        <Expenses
          expenseData={expenseData}
          updateExpense={updateExpense}
          removeExpense={removeExpense}
          errorStatus={errorStatus}
          checkSession={checkSession}
        />
      )}
      {page === "#NewExpense" && (
        <AddNewExpense
          addExpense={addExpense}
          errorStatus={errorStatus}
          successStatus={successStatus}
        />
      )}
    </div>
  );
}

export default App;

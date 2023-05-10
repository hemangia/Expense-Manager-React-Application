const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4000;

const expenseData = require("./expenseData");

const sessions = require("./sessions");
const users = require("./users");

app.use(cookieParser());
app.use(express.static("./build"));
app.use(express.json());

// Sessions
app.get("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  const password = sid ? sessions.getSessionPassword(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "authMissing" });
    return;
  }
  res.json({ username, password });
});

app.post("/api/session", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username) {
    res.status(400).json({ error: "requiredUsername" });
    return;
  }
  if (!password) {
    res.status(400).json({ error: "requiredPassword" });
    return;
  }
  if (username.toLowerCase() === "dog") {
    res.status(403).json({ error: "authInsufficient" });
    return;
  }
  const sid = sessions.addSession(username, password);
  const existingUserData = users.getUserData(username);
  if (!existingUserData) {
    users.addUserData(username, expenseData.buildExpenseDetails());
  }
  res.cookie("sid", sid);
  res.json(users.getUserData(username).getUserExpense());
});

app.delete("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (sid) {
    res.clearCookie("sid");
  }
  if (username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }
  res.json({ username });
});

app.get("/api/expenses", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "authMissing" });
    return;
  }

  res.json(users.getUserData(username).getUserExpense());
});

app.post("/api/expenses", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "authMissing" });
    return;
  }
  const expenseDescription = req.body.expenseDescription;
  const expenseAmount = req.body.expenseAmount;
  const expenseCategory = req.body.expenseCategory;
  const expenseDate = req.body.expenseDate;

  if (!expenseDescription) {
    res.status(400).json({ error: "requiredQuestion" });
    return;
  }
  if (!expenseAmount) {
    res.status(400).json({ error: "requiredAnswer" });
    return;
  }
  if (!expenseDate) {
    res.status(400).json({ error: "requiredAnswer" });
    return;
  }
  const userExpenses = users.getUserData(username);
  const id = userExpenses.addExpense(
    expenseCategory,
    expenseDescription,
    expenseAmount,
    expenseDate
  );
  res.json(userExpenses.getExpense(id));
});

app.get("/api/expenses/:id", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "authMissing" });
    return;
  }
  const userExpense = users.getUserData(username);
  const { id } = req.params;
  if (!userExpense.contains(id)) {
    res
      .status(404)
      .json({ error: `noSuchId`, message: `No expense with id ${id}` });
    return;
  }
  res.json(userExpense.getExpense(id));
});

app.patch("/api/expenses/:id", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "authMissing" });
    return;
  }
  const { id } = req.params;
  const { expenseDescription, expenseAmount, expenseDate } = req.body;
  const userExpense = users.getUserData(username);
  if (!userExpense.contains(id)) {
    res
      .status(404)
      .json({ error: `noSuchId`, message: `No expense with id ${id}` });
    return;
  }
  userExpense.updateExpense(id, {
    expenseDescription,
    expenseAmount,
    expenseDate,
  });
  res.json(userExpense.getExpense(id));
});

app.delete("/api/expenses/:id", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { id } = req.params;
  const userExpense = users.getUserData(username);
  const exists = userExpense.contains(id);
  if (exists) {
    userExpense.deleteExpense(id);
  }
  res.json({
    message: exists ? `expense ${id} deleted` : `expense ${id} did not exist`,
  });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

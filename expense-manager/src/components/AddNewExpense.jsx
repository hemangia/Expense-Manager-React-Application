import { useState } from "react";

function AddNewExpense({ addExpense, errorStatus, successStatus }) {
  const [newExpenseDescription, setNewExpenseDescription] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [newExpenseDate, setNewExpenseDate] = useState("");
  const [newExpenseCategory, setNewExpenseCategory] = useState("");
  const [isAddDisabled, setIsAddDisabled] = useState(true);
  const [isExpenseDescriptionDisabled, setIsExpenseDescriptionDisabled] =
    useState(true);
  const [isAmountDisabled, setIsAmountDisabled] = useState(true);

  function handleExpenseCategoryChange(e) {
    setNewExpenseCategory(e.target.value);
    if (newExpenseCategory) {
      setIsExpenseDescriptionDisabled(false);
    } else {
      setIsExpenseDescriptionDisabled(false);
    }
  }

  function handleExpenseDescriptionChange(e) {
    setNewExpenseDescription(e.target.value);
    if (newExpenseDescription) {
      setIsAmountDisabled(false);
    } else {
      setIsAmountDisabled(false);
    }
  }

  function handleExpenseAmountChange(e) {
    setNewExpenseAmount(e.target.value);
    if (newExpenseAmount) {
      setIsAddDisabled(false);
    } else {
      setIsAddDisabled(false);
    }
  }

  function onClickAdd(e) {
    if (
      !newExpenseCategory ||
      !newExpenseDescription ||
      !newExpenseAmount ||
      !newExpenseDate
    ) {
      return;
    }
    setNewExpenseDescription("");
    setNewExpenseAmount("");
    setNewExpenseCategory("");
    setNewExpenseDate("");
    setIsAddDisabled(true);
    setIsAmountDisabled(true);
    setIsExpenseDescriptionDisabled(true);
    addExpense(
      newExpenseCategory,
      newExpenseDescription,
      newExpenseAmount,
      newExpenseDate
    );
  }

  return (
    <div className="add-exp-main-container">
      <h3>Create a New expense</h3>
      {errorStatus && <div className="error-panel">{errorStatus}</div>}
      {successStatus && (
        <div className="success-panel">Expense Added successfully!</div>
      )}
      <form className="add-expense-form" onSubmit={(e) => e.preventDefault()}>
        <div className="add-expense-container">
          <div className="add-expense-container">
            <label htmlFor="expenseCategory">Enter the expense category</label>
            <input
              type="text"
              value={newExpenseCategory}
              onChange={handleExpenseCategoryChange}
              name="expenseCategory"
              className=""
              placeholder="Enter the expense category"
              required
            />
          </div>
          <div className="add-expense-container">
            <label htmlFor="expenseDescription">
              Enter expense description:
            </label>
            <input
              type="text"
              value={newExpenseDescription}
              onChange={handleExpenseDescriptionChange}
              name="expenseDescription"
              className=""
              placeholder="Enter expense description"
              disabled={isExpenseDescriptionDisabled}
              required
            />
          </div>
          <div className="add-expense-container">
            <label htmlFor="expenseAmount">Enter Expense Amount:</label>
            <input
              type="text"
              value={newExpenseAmount}
              onChange={handleExpenseAmountChange}
              name="expenseAmount"
              className=""
              placeholder=""
              disabled={isAmountDisabled}
              required
            />
          </div>
          <div className="add-expense-container">
            <label> Date:</label>
            <input
              type="date"
              id="expense-date"
              name="expense-date"
              value={newExpenseDate}
              onChange={(e) => setNewExpenseDate(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="add-expense-action">
          <button
            type="submit"
            className=""
            disabled={isAddDisabled}
            onClick={onClickAdd}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewExpense;

import ViewSingleExpense from "./ViewSingleExpense";
import { useState } from "react";

function Expenses({
  expenseData,
  updateExpense,
  removeExpense,
  errorStatus,
  checkSession,
}) {
  let expenseDataLength = Object.keys(expenseData).length;
  let sortedExpenses = Object.values(expenseData).sort(
    (a, b) => new Date(b.expenseDate) - new Date(a.expenseDate)
  );

  let expenseCategoryList = ["select category"];

  sortedExpenses.forEach((expense) => {
    let category = expense.expenseCategory.toLowerCase();
    if (!expenseCategoryList.includes(category)) {
      expenseCategoryList.push(category);
    }
  });

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    checkSession();
    setSelectedOption(e.target.value);
  };
  function addNewCategory(newExpenseCategory) {
    if (!expenseCategoryList.includes(newExpenseCategory)) {
      expenseCategoryList.push(newExpenseCategory);
    }
  }

  return (
    <div className="view-expense-main-container">
      {!expenseDataLength && (
        <div className="">
          <h4>
            You have no Expenses!
            <br />
            Create a "New" one.
          </h4>
        </div>
      )}
      {expenseDataLength > 0 && (
        <div className="view-expense-container">
          <div className="view-expense-category-container">
            <h2>All the Expenses</h2>
            {errorStatus && <div className="error-panel">{errorStatus}</div>}
            {Object.entries(expenseData).map(([key, value]) =>
              addNewCategory(value.expenseCategory.toLowerCase())
            )}
            <div className="view-expense-category-list">
              <label>Select expense category</label>
              <select value={selectedOption} onChange={handleChange}>
                {expenseCategoryList.map((expenseCategory) => (
                  <option value={expenseCategory}>{expenseCategory}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="view-expenselist-container">
            {selectedOption &&
              selectedOption !== "select" &&
              sortedExpenses.map(
                (expense) =>
                  expense.expenseCategory === selectedOption && (
                    <div className="view-expeselist-item">
                      <ViewSingleExpense
                        index={expense.id}
                        updateExpense={updateExpense}
                        key={expense.id}
                        removeExpense={removeExpense}
                        expenseDescription={expense.expenseDescription}
                        expenseAmount={expense.expenseAmount}
                        expenseDate={expense.expenseDate}
                      />
                    </div>
                  )
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Expenses;

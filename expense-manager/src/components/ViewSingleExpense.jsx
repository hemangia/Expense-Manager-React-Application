import { useState } from "react";

function ViewSingleExpense({
  index,
  expenseDescription,
  expenseAmount,
  expenseDate,
  updateExpense,
  removeExpense,
}) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [possibleExpenseDescription, setPossibleExpenseDescription] =
    useState(expenseDescription);
  const [possibleExpenseAmount, setPossibleExpenseAmount] =
    useState(expenseAmount);

  const [possibleExpenseDate, setPossibleExpenseDate] = useState(expenseDate);

  return (
    <div>
      {!showEditForm && (
        <div data-id={index} className="view-single-expense-container">
          <div className="single-expense-container">
            <div className="expense-sigle-item">
              <div className="expense-sigle-item-desc">
                <h4 className="">{expenseDescription}</h4>
                <p className="">$ {expenseAmount}</p>
                <p className="">{expenseDate}</p>
              </div>
              <div className="expense-sigle-item-action">
                <button
                  onClick={() => {
                    setShowEditForm(true);
                  }}
                  className=""
                >
                  edit
                </button>
                <button
                  onClick={() => {
                    removeExpense(index);
                  }}
                  className=""
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditForm && (
        <div className="edit-exp-main-container">
          <form
            className="edit-expense-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="edit-expense-container">
              <div className="edit-expense-item-container">
                <label>Description</label>
                <input
                  type="text"
                  value={possibleExpenseDescription}
                  onChange={(e) =>
                    setPossibleExpenseDescription(e.target.value)
                  }
                  name="description"
                  className=""
                  placeholder="Enter Expense Detail"
                />
              </div>
              <div className="edit-expense-item-container">
                <label>Amount</label>

                <input
                  type="text"
                  value={possibleExpenseAmount}
                  onChange={(e) => setPossibleExpenseAmount(e.target.value)}
                  name="amount"
                  className=""
                  placeholder="Enter Expense Amount"
                />
              </div>

              <div className="edit-expense-item-container">
                <label>Date</label>
                <input
                  type="date"
                  name="expDate"
                  value={possibleExpenseDate}
                  className=""
                  onChange={(e) => setPossibleExpenseDate(e.target.value)}
                />
              </div>
            </div>
            <div className="edit-expense-action-container">
              <button
                onClick={() => {
                  setShowEditForm(false);
                  updateExpense(
                    index,
                    possibleExpenseDescription,
                    possibleExpenseAmount,
                    possibleExpenseDate
                  );
                  setPossibleExpenseAmount(possibleExpenseAmount);
                  setPossibleExpenseDescription(possibleExpenseDescription);
                  setPossibleExpenseDate(possibleExpenseDate);
                }}
                type="button"
                className=""
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowEditForm(false);
                  setPossibleExpenseAmount(expenseAmount);
                  setPossibleExpenseDescription(expenseDescription);
                  setPossibleExpenseDate(expenseDate);
                }}
                type="submit"
                className=""
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ViewSingleExpense;

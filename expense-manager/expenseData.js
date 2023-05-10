function buildExpenseDetails() {
  const id1 = 0;
  const id2 = 1;
  const id3 = 2;
  const id4 = 3;
  const id5 = 4;
  const id6 = 5;
  const id7 = 6;
  const id8 = 7;
  const id9 = 8;
  const id10 = 9;

  const expenseDetailsObject = {};
  const expenseDetailsList = {
    [id1]: {
      id: id1,
      expenseCategory: "food",
      expenseDescription: "Dinner Subway",
      expenseAmount: "35",
      expenseDate: "2023-01-10",
    },
    [id2]: {
      id: id2,
      expenseCategory: "household",
      expenseDescription: "Rent",
      expenseAmount: "2000",
      expenseDate: "2023-02-20",
    },
    [id3]: {
      id: id3,
      expenseCategory: "food",
      expenseDescription: "Weekend Restaurant visit",
      expenseAmount: "100",
      expenseDate: "2023-03-30",
    },
    [id4]: {
      id: id4,
      expenseCategory: "household",
      expenseDescription: "WSG Utilities",
      expenseAmount: "100",
      expenseDate: "2023-04-04",
    },
    [id5]: {
      id: id5,
      expenseCategory: "health",
      expenseDescription: "Insurance",
      expenseAmount: "150",
      expenseDate: "2023-04-04",
    },

    [id6]: {
      id: id6,
      expenseCategory: "health",
      expenseDescription: "Medicines",
      expenseAmount: "250",
      expenseDate: "2023-03-04",
    },

    [id7]: {
      id: id7,
      expenseCategory: "transportation",
      expenseDescription: "Car Maintenance",
      expenseAmount: "250",
      expenseDate: "2023-01-04",
    },

    [id8]: {
      id: id8,
      expenseCategory: "transportation",
      expenseDescription: "Car Insurance",
      expenseAmount: "150",
      expenseDate: "2023-02-04",
    },
  };

  expenseDetailsObject.contains = function contains(id) {
    return !!expenseDetailsList[id];
  };

  expenseDetailsObject.addExpense = function addExpense(
    expenseCategory,
    expenseDescription,
    expenseAmount,
    expenseDate
  ) {
    const id = Object.keys(expenseDetailsList).length;
    expenseDetailsList[id] = {
      id,
      expenseCategory,
      expenseDescription,
      expenseAmount,
      expenseDate,
    };
    return id;
  };

  expenseDetailsObject.getExpense = function getExpense(id) {
    return expenseDetailsList[id];
  };

  expenseDetailsObject.getUserExpense = function getUserExpense() {
    return expenseDetailsList;
  };
  expenseDetailsObject.updateExpense = function updateExpense(id, expenseData) {
    expenseDetailsList[id].expenseAmount =
      expenseData.expenseAmount ?? expenseDetailsList[id].expenseAmount;
    expenseDetailsList[id].expenseDescription =
      expenseData.expenseDescription ||
      expenseDetailsList[id].expenseDescription;

    expenseDetailsList[id].expenseDate =
      expenseData.expenseDate || expenseDetailsList[id].expenseDate;
  };

  expenseDetailsObject.deleteExpense = function deleteExpense(id) {
    delete expenseDetailsList[id];
  };

  return expenseDetailsObject;
}

module.exports = {
  buildExpenseDetails: buildExpenseDetails,
};

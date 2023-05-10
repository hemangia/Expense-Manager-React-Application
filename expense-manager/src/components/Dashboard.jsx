import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

function Dashboard({ username, expenseData }) {
  const [chartInstance, setChartInstance] = useState(null);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    if (Object.keys(expenseData).length > 0) {
      const expenseArray = Object.values(expenseData);
      const categories = {};
      let totalAmount = 0; // declare variable
      expenseArray.forEach((expense) => {
        if (expense.expenseCategory in categories) {
          categories[expense.expenseCategory] += parseFloat(
            expense.expenseAmount
          );
        } else {
          categories[expense.expenseCategory] = parseFloat(
            expense.expenseAmount
          );
        }
        totalAmount += parseFloat(expense.expenseAmount); // add to totalAmount
      });

      setTotalExpenseAmount(
        totalAmount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      ); // format as currency string

      function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }

      const categoryLabels = Object.keys(categories).map((category) =>
        toTitleCase(category)
      );

      const categoryAmounts = Object.values(categories);

      const chartData = {
        labels: categoryLabels,
        datasets: [
          {
            data: categoryAmounts,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#8B008B",
              "#00FF7F",
              "#FF69B4",
              "#00BFFF",
              "#FFD700",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#8B008B",
              "#00FF7F",
              "#FF69B4",
              "#00BFFF",
              "#FFD700",
            ],
          },
        ],
      };

      const ctx = document.getElementById("expenseChart").getContext("2d");
      const newChartInstance = new Chart(ctx, {
        type: "pie",
        data: chartData,
        options: {
          plugins: {
            legend: {
              position: "top",
              labels: {
                fontSize: 26,
              },
            },
            title: {
              display: true,
              text: "Expense Categories",
              fontSize: 40,
            },
          },
          layout: {
            padding: 10,
          },
        },
        plugins: [
          {
            id: "my-plugin",
            beforeDraw: function (chart) {
              chart.canvas.parentNode.style.height = "600px";
              chart.canvas.parentNode.style.width = "600px";
            },
          },
        ],
      });
      setChartInstance(newChartInstance);
    }
  }, [expenseData]);

  if (Object.keys(expenseData).length > 0) {
    return (
      <div className="dashboard-page-container">
        <h2>Welcome {username} ! </h2>
        <h3>Total Amount spent : {totalExpenseAmount}</h3>
        <div className="pie-chart-container">
          <canvas id="expenseChart"></canvas>
        </div>
      </div>
    );
  } else {
    return (
      <div className="dashboard-page-container">
        <h2>Welcome {username} ! </h2>
        <h3>No expense data found.</h3>
      </div>
    );
  }
}

export default Dashboard;

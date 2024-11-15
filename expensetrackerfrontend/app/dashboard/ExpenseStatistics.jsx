import { PieChart } from "@mui/x-charts";

const ExpenseStatistics = ({ expenses }) => {
  const categoryTotals = expenses.reduce((acc, expense) => {
    const categories = Array.isArray(expense.category)
      ? expense.category
      : [expense.category];

    categories.forEach((category) => {
      if (acc[category]) {
        acc[category] += expense.amount;
      } else {
        acc[category] = expense.amount;
      }
    });
    return acc;
  }, {});
  const chartData = Object.keys(categoryTotals).map((category) => ({
    label: category,
    value: categoryTotals[category],
  }));
  console.log("this is chart data", chartData);
  return (
    <div>
      <PieChart
        series={[
          {
            data: chartData,
          },
        ]}
        width={600}
        height={400}
      />
    </div>
  );
};

export default ExpenseStatistics;

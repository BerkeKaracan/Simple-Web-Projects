import "./index.css";
import Header from "./components/Header";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import { useEffect, useState } from "react";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem("transactions");
    return savedData ? JSON.parse(savedData) : [];
  });
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id),
    );
  };
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
  return (
    <>
      <Header transactions={transactions}></Header>
      <ExpenseForm addTransaction={addTransaction}></ExpenseForm>
      <ExpenseList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      ></ExpenseList>
    </>
  );
}

export default App;

import React from "react";

export default function Header({ transactions }) {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((price) => price > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts
      .filter((price) => price < 0)
      .reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);
  return (
    <div className="header-container">
      <h2>Expense Tracker</h2>
      <div className="header-container-bttm">
        <h3>Your Balance</h3>
        <p className="balance">${total}</p>
        <div className="summary">
          <div className="income-box">
            <p className="income-text">Income</p>
            <p className="income-balance">${income}</p>
          </div>
          <div className="expenses-box">
            <p className="expences-text">Expences</p>
            <p className="expences-balance">${expense}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function ExpenseList({ transactions, deleteTransaction }) {
  return (
    <div className="espense-list-box">
      <h3>Transactions</h3>
      <ul className="espense-list">
        {transactions.map((transaction) => (
          <li
            className={transaction.amount < 0 ? "minus" : "plus"}
            key={transaction.id}
          >
            {transaction.text} <span>${transaction.amount}</span>
            <button
              className="delete-btn"
              onClick={() => deleteTransaction(transaction.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

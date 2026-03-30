import React, { useState } from "react";

export default function ExpenseForm({ addTransaction }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !amount) return;

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text: text,
      amount: +amount,
    };
    addTransaction(newTransaction);
    setText("");
    setAmount("");
  };
  return (
    <form className="header-espense-form" onSubmit={onSubmit}>
      <h3>Add Transaction</h3>

      <div className="input-area-description">
        <h4>Description</h4>
        <input
          type="text"
          placeholder="Enter description..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="input-area-amount">
        <h4>Amount</h4>
        <input
          type="number"
          placeholder="Enter amount..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <p className="attention-text">Use negative(-) for expenses</p>
      </div>
      <button className="add-transaction-btn">Add Transaction</button>
    </form>
  );
}

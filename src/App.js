import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AddTransactionPage from "./AddTransactionPage";
import TransactionsPage from "./TransactionsPage";

const App = () => {
  const [transactions, setTransactions] = useState([]);

  const AddTransactions = (payload) => {
    setTransactions([...transactions, payload]);
  };

  const removeTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              transactions={transactions}
              setTransactions={setTransactions}
            />
          }
        />
        <Route
          path="/add-transaction"
          element={<AddTransactionPage AddTransactions={AddTransactions} />}
        />
        <Route
          path="/transactions"
          element={
            <TransactionsPage
              transactions={transactions}
              removeTransaction={removeTransaction}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddTransaction from "./AddTransactionPage";
import OverviewComponent from "./OverviewComponent";
import Popup from "./Popup"; // Reusable Popup Component
import TransactionItem from "./TransactionItem"; // Reusable TransactionItem Component

const Tracker = () => {
  const [toggle, setToggle] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [message, setMessage] = useState("");

  const AddTransactions = (payload) => {
    setTransactions([...transactions, payload]);
    setMessage("Transaction added successfully!");
    clearMessage();
  };

  const removeTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
    setMessage("Transaction removed successfully!");
    clearMessage();
  };

  const calculateTransactions = () => {
    const exp = transactions
      .filter((item) => item.transType === "expense")
      .map((item) => item.amount)
      .reduce((acc, curr) => acc + curr, 0);
  
    const inc = transactions
      .filter((item) => item.transType === "income")
      .map((item) => item.amount)
      .reduce((acc, curr) => acc + curr, 0);
  
    setExpense(exp);
    setIncome(inc);
  };

  const clearMessage = () => {
    setTimeout(() => setMessage(""), 3000);
  };

  useEffect(() => {
    calculateTransactions();
  }, [transactions]);

  return (
    <Container>
      <THeading>WebLabMid</THeading>
      <Heading>Expense Tracker</Heading>
      <Popup message={message} /> {/* Reusable Popup Component */}
      <OverviewComponent
        toggle={toggle}
        setToggle={setToggle}
        expense={expense}
        income={income}
      />
      {toggle && (
        <AddTransaction
          setToggle={setToggle}
          AddTransactions={AddTransactions}
        />
      )}
      <TransactionDetails>
        <ExpenseBox isExpense>
          Expense <span>${expense}</span> {/* Changed ₹ to $ */}
        </ExpenseBox>
        <IncomeBox>
          Budget <span>${income}</span> {/* Changed ₹ to $ */}
        </IncomeBox>
      </TransactionDetails>
      <TransactionList>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            removeTransaction={removeTransaction}
          />
        ))}
      </TransactionList>
    </Container>
  );
};

export default Tracker;
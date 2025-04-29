import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #e6e8e9;
  border-radius: 5px;
  background-color: ${(props) => (props.isExpense ? "#ffe6e6" : "#e6ffe6")};
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e60000;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #ff4d4d;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: fadeIn 0.5s, fadeOut 0.5s 2.5s;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;

const TransactionsPage = ({ transactions, removeTransaction }) => {
  const [message, setMessage] = useState(""); // State for popup message

  const handleRemove = (id) => {
    removeTransaction(id);
    setMessage("Transaction removed successfully!");
    clearMessage();
  };

  const clearMessage = () => {
    setTimeout(() => {
      setMessage(""); // Clear the message after 3 seconds
    }, 3000);
  };

  return (
    <Container>
      {message && <Popup>{message}</Popup>} {/* Display the popup */}
      <Title>All Transactions</Title>
      <TransactionList>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            isExpense={transaction.transType === "expense"}
          >
            <span>{transaction.details}</span>
            <span>${transaction.amount}</span>
            <Button onClick={() => handleRemove(transaction.id)}>Remove</Button>
          </TransactionItem>
        ))}
      </TransactionList>
    </Container>
  );
};

export default TransactionsPage;
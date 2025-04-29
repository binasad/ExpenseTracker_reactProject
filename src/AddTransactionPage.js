import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 400px;
  margin: 50px auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #44e610;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3cb50d;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #44e610;
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

const AddTransactionPage = ({ AddTransactions }) => {
  const [transaction, setTransaction] = useState({
    details: "",
    amount: 0,
    transType: "expense",
  });
  const [message, setMessage] = useState(""); // State for popup message

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transaction.details || transaction.amount <= 0) {
      setMessage("Please fill in all fields correctly!");
      clearMessage();
      return;
    }
    AddTransactions({ ...transaction, id: Date.now() });
    setMessage("Transaction added successfully!");
    clearMessage();
    setTransaction({ details: "", amount: 0, transType: "expense" }); // Reset form fields
  };

  const clearMessage = () => {
    setTimeout(() => {
      setMessage(""); // Clear the message after 3 seconds
    }, 3000);
  };

  return (
    <Container>
      {message && <Popup>{message}</Popup>} {/* Display the popup */}
      <Title>Add Transaction</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Details"
          value={transaction.details}
          onChange={(e) =>
            setTransaction({ ...transaction, details: e.target.value })
          }
        />
        <Input
          type="number"
          placeholder="Amount"
          value={transaction.amount}
          onChange={(e) =>
            setTransaction({ ...transaction, amount: parseFloat(e.target.value) })
          }
        />
        <Select
          value={transaction.transType}
          onChange={(e) =>
            setTransaction({ ...transaction, transType: e.target.value })
          }
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </Select>
        <Button type="submit">Add Transaction</Button>
      </Form>
    </Container>
  );
};

export default AddTransactionPage;
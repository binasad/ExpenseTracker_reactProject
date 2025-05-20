import React, { useState } from 'react';
import styled from 'styled-components';
import { useExpenses } from '../context/ExpenseContext';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #0056b3;
  }
`;

const ExpenseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

const ExpenseTracker = () => {
  const { expenses, loading, error, createExpense, removeExpense } = useExpenses();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'food'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExpense({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setFormData({
        description: '',
        amount: '',
        category: 'food'
      });
    } catch (err) {
      console.error('Failed to add expense:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <h1>Expense Tracker</h1>
      
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <Input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
        <Select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
          <option value="entertainment">Entertainment</option>
          <option value="utilities">Utilities</option>
          <option value="other">Other</option>
        </Select>
        <Button type="submit">Add Expense</Button>
      </Form>

      <ExpenseList>
        {expenses.map(expense => (
          <ExpenseItem key={expense.id}>
            <div>
              <h3>{expense.description}</h3>
              <p>Amount: ${expense.amount}</p>
              <p>Category: {expense.category}</p>
            </div>
            <DeleteButton onClick={() => removeExpense(expense.id)}>
              Delete
            </DeleteButton>
          </ExpenseItem>
        ))}
      </ExpenseList>
    </Container>
  );
};

export default ExpenseTracker; 
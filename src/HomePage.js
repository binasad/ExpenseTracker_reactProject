import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 600px;
  margin: 50px auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  margin-bottom: 20px;
  background-color: #44e610;
  border-radius: 5px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3cb50d;
  }
`;

const Heading = styled.h1`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const ExpenseBox = styled.div`
  flex: 1;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 15px;
  background-color: #fff;
  width: 100%;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  & span {
    font-weight: bold;
    font-size: 25px;
    display: block;
    color: ${(props) => (props.isExpense ? "red" : "green")};
  }
`;

const IncomeBox = styled(ExpenseBox)``;

const HomePage = ({ transactions }) => {
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    let exp = 0;
    let inc = 0;

    transactions.forEach((item) => {
      item.transType === "expense"
        ? (exp += item.amount)
        : (inc += item.amount);
    });

    setExpense(exp);
    setIncome(inc);
  }, [transactions]);

  return (
    <Container>
      <Heading>Expense Tracker</Heading>
      <Navbar>
 
 
        <NavLink to="/add-transaction">Add Transaction</NavLink>
        <NavLink to="/transactions">View Transactions</NavLink>
      </Navbar>
      <ExpenseBox isExpense>
        Expense <span>${expense}</span>
      </ExpenseBox>
      <IncomeBox>
        Budget <span>${income}</span>
      </IncomeBox>
    </Container>
  );
};

export default HomePage;
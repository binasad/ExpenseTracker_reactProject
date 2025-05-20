import React, { createContext, useContext, useState, useEffect } from 'react';
import { getExpenses, addExpense, deleteExpense, updateExpense, subscribeToExpenses } from '../services/expenseService';

const ExpenseContext = createContext();

export const useExpenses = () => {
    const context = useContext(ExpenseContext);
    if (!context) {
        throw new Error('useExpenses must be used within an ExpenseProvider');
    }
    return context;
};

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Subscribe to real-time updates
    useEffect(() => {
        const unsubscribe = subscribeToExpenses((updatedExpenses) => {
            setExpenses(updatedExpenses);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Add expense
    const createExpense = async (expenseData) => {
        try {
            const newExpense = await addExpense(expenseData);
            return newExpense;
        } catch (err) {
            setError('Failed to add expense');
            throw err;
        }
    };

    // Delete expense
    const removeExpense = async (id) => {
        try {
            await deleteExpense(id);
        } catch (err) {
            setError('Failed to delete expense');
            throw err;
        }
    };

    // Update expense
    const editExpense = async (id, expenseData) => {
        try {
            const updatedExpense = await updateExpense(id, expenseData);
            return updatedExpense;
        } catch (err) {
            setError('Failed to update expense');
            throw err;
        }
    };

    const value = {
        expenses,
        loading,
        error,
        createExpense,
        removeExpense,
        editExpense
    };

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    );
}; 
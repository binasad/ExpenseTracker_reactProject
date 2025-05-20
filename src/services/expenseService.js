import { 
    ref, 
    push, 
    set, 
    get, 
    remove, 
    update,
    query,
    orderByChild,
    onValue
} from 'firebase/database';
import { database } from '../config/firebase';

const EXPENSES_REF = 'expenses';

// Get all expenses
export const getExpenses = async () => {
    try {
        const expensesRef = ref(database, EXPENSES_REF);
        const snapshot = await get(expensesRef);
        if (snapshot.exists()) {
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            return expenses.sort((a, b) => b.date - a.date);
        }
        return [];
    } catch (error) {
        console.error('Error getting expenses:', error);
        throw error;
    }
};

// Add new expense
export const addExpense = async (expenseData) => {
    try {
        const expensesRef = ref(database, EXPENSES_REF);
        const newExpenseRef = push(expensesRef);
        const newExpense = {
            ...expenseData,
            date: Date.now()
        };
        await set(newExpenseRef, newExpense);
        return { id: newExpenseRef.key, ...newExpense };
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
};

// Delete expense
export const deleteExpense = async (id) => {
    try {
        const expenseRef = ref(database, `${EXPENSES_REF}/${id}`);
        await remove(expenseRef);
        return id;
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
};

// Update expense
export const updateExpense = async (id, expenseData) => {
    try {
        const expenseRef = ref(database, `${EXPENSES_REF}/${id}`);
        await update(expenseRef, expenseData);
        return { id, ...expenseData };
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
};

// Subscribe to expenses changes
export const subscribeToExpenses = (callback) => {
    const expensesRef = ref(database, EXPENSES_REF);
    return onValue(expensesRef, (snapshot) => {
        const expenses = [];
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
        }
        callback(expenses.sort((a, b) => b.date - a.date));
    });
}; 
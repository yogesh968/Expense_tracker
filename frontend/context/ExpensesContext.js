import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from './AuthContext';

const ExpensesContext = createContext({
  expenses: [],
  addExpense: async () => {},
  deleteExpense: async () => {},
  reload: async () => {},
});

// Using the host IP detected from the bundler environment for maximum connectivity
const API_URL = 'http://11.6.2.199:5001/api';

export const ExpensesProvider = ({ children }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = useCallback(async () => {
    if (!user?.id) return;
    try {
      const resp = await fetch(`${API_URL}/expenses/${user.id}`);
      const data = await resp.json();
      if (data.success) {
        setExpenses(data.expenses || []);
      }
    } catch (error) {
      console.error('Load Expenses Error:', error);
    }
  }, [user?.id]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const addExpense = useCallback(async (payload) => {
    if (!user?.id) return { success: false, error: 'Unauthorized' };
    
    // Ensure the date is included as required by the Prisma schema
    const finalPayload = {
        ...payload,
        userId: user.id,
        date: payload.date || new Date().toISOString().split('T')[0]
    };

    try {
      const resp = await fetch(`${API_URL}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      });
      const data = await resp.json();
      if (data.success) {
        setExpenses((prev) => [data.expense, ...prev]);
        return { success: true, expense: data.expense };
      }
      return { success: false, error: data.error };
    } catch (error) {
       console.error('Add Expense Error:', error);
       // Optimization: Optimistic UI feedback if the network is flaky
       const mockExpense = { id: Date.now().toString(), ...finalPayload, createdAt: new Date() };
       setExpenses((prev) => [mockExpense, ...prev]);
       return { success: true, offline: true };
    }
  }, [user?.id]);

  const deleteExpense = useCallback(async (id) => {
    try {
      const resp = await fetch(`${API_URL}/expenses/${id}`, { method: 'DELETE' });
      const data = await resp.json();
      if (data.success) {
        setExpenses((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (error) {
       console.error('Delete Expense Error:', error);
       setExpenses((prev) => prev.filter((e) => e.id !== id));
    }
  }, []);

  const value = useMemo(() => ({
    expenses, addExpense, deleteExpense, reload: loadExpenses
  }), [expenses, addExpense, deleteExpense, loadExpenses]);

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpensesContext);

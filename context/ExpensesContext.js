import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import 'react-native-get-random-values';
import { getExpenses, saveExpenses } from '../utils/storage';
import { startOfMonth } from '../utils/dateRange';
import { v4 as uuidv4 } from 'uuid';

const ExpensesContext = createContext({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  reload: () => {},
});

const seed = [
  { id: '1', title: 'Pizza', amount: 200, category: 'Food', date: new Date().toISOString().slice(0,10) },
  { id: '2', title: 'Taxi', amount: 350, category: 'Travel', date: new Date().toISOString().slice(0,10) },
  { id: '3', title: 'Electricity Bill', amount: 1200, category: 'Bills', date: new Date().toISOString().slice(0,10) },
  { id: '4', title: 'T-shirt', amount: 899, category: 'Shopping', date: new Date().toISOString().slice(0,10) },
];

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getExpenses();
      if (!data || data.length === 0) {
        setExpenses(seed);
        await saveExpenses(seed);
      } else {
        setExpenses(data);
      }
    })();
  }, []);

  const persist = async (list) => {
    setExpenses(list);
    await saveExpenses(list);
  };

  const addExpense = async (payload) => {
    const newItem = { id: uuidv4(), ...payload };
    await persist([newItem, ...expenses]);
  };

  const updateExpense = async (id, updates) => {
    const list = expenses.map((e) => (e.id === id ? { ...e, ...updates } : e));
    await persist(list);
  };

  const deleteExpense = async (id) => {
    const list = expenses.filter((e) => e.id !== id);
    await persist(list);
  };

  const value = useMemo(() => ({ expenses, addExpense, updateExpense, deleteExpense, reload: async () => setExpenses(await getExpenses()) }), [expenses]);

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};

export const useExpenses = () => useContext(ExpensesContext);

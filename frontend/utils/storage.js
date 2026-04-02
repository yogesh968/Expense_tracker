import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'expenses';

export async function getExpenses() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function saveExpenses(list) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  } catch (e) {}
}

export async function clearExpenses() {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (e) {}
}

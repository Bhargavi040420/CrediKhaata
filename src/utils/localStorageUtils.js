// src/utils/localStorageUtils.js

const STORAGE_KEY = 'crediKhaataCustomers';

export const getStoredCustomers = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCustomers = (customers) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
};

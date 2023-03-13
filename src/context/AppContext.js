import React, { createContext, useReducer } from "react";
import App from "../App";

export const AppReducer = (state, action) => {
  const new_expense = [];
  switch (action.type) {
    case "ADD_QUANTITY":
      let updatedqty = false;
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          expense.quantity = expense.quantity + action.payload.quantity;
          updatedqty = true;
        }
        new_expense.push(expense);
        return true;
      });
      state.expenses = new_expense;
      action.type = "DONE";
      return {
        ...state,
      };
    case "REQ_QUANTITY":
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          expense.quantity = expense.quantity - action.payload.quantity;
        }
        expense.quantity = expense.quantity < 0 ? 0 : expense.quantity;
        new_expense.push(expense);
        return true;
      });
      state.expenses = new_expense;
      action.type = "DONE";
      return {
        ...state,
      };
    case "DELETE_ITEM":
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          expense.quantity = 0;
        }
        new_expense.push(expense);
        return true;
      });
      state.expenses = new_expense;
      action.type = "DONE";
      return {
        ...state,
      };
    case "CHG_LOCATION":
      action.type = "DONE";
      state.Location = action.payload;
      return {
        ...state,
      };
    default:
      return state;
  }
};

// 1. Sets the initial state when the app loads
const initialState = {
  expenses: [
    { id: "Shirt", name: "Shirt", quantity: 0, unitprice: 500 },
    { id: "Jeans", name: "Jeans", quantity: 0, unitprice: 300 },
    { id: "Dress", name: "Dress", quantity: 0, unitprice: 400 },
    { id: "Dinner set", name: "Dinner set", quantity: 0, unitprice: 600 },
    { id: "Bags", name: "Bags", quantity: 0, unitprice: 200 },
  ],
  Location: "£",
};

// 2. Creates the Context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provirder component - wraps the component we want to give access to the state
// accept the children, which are the nested(wrapped) components
export const AppProvider = ({ children }) => {
  // 4. Sets up the app state. takes a reducer, and an initial state
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const totalExpenses = state.expenses.reduce((total, item) => {
    return (total = total + item.unitprice * item.quantity);
  }, 0);
  state.CartValue = totalExpenses;

  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        CartValue: state.CartValue,
        dispatch,
        Location: state.Location,
      }}>
      {children}
    </AppContext.Provider>
  );
};

import { useContext, createContext } from "react";

export const DateContext = createContext();
export const LocationContext = createContext();

export function useDate() {
  return useContext(DateContext);
}

export function useLocation() {
  return useContext(LocationContext);
}

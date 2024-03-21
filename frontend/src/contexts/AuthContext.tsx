import { ReactNode, createContext, useState } from "react";
import { User } from "../models/User";

export interface IAuthContext {
  users: User[];
  updateUsers: (info: User[]) => void;
  currentUser: User | null;
  updateCurrentUser: (info: User | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
  users: [],
  updateUsers: () => {},
  currentUser: null,
  updateCurrentUser: () => {},
});

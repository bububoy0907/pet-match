import { createContext, useContext, useReducer } from "react";
import AuthContext from "./auth-context";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { userId: currentUserId } = useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: null,
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        const otherUserId = action.payload._id;
        return {
          user: action.payload,
          chatId:
  currentUserId > otherUserId
    ? currentUserId + otherUserId
    : otherUserId + currentUserId,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext };

import { createContext, useContext } from "react";

export const fundsContext = createContext({
    fundsFamily: "",
    funds: []
})

export const useFundsContext = () => {
    return useContext(fundsContext)
}

export const FundsContextProvider = fundsContext.Provider

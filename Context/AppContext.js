import { useState, useEffect, createContext } from "react";
import { languageOptions, dictionaryList } from '../languages';

export const AppContext = createContext({
    userLanguage: 'en',
    dictionary: dictionaryList.en
});

export const AppContextProvider = (props) => {
    const [products,setProducts] = useState([]);
    const [totalPages_,setTotalPages_] = useState(1);
    const [currentPage,setCurrentPage] = useState(1);
    const [userLanguage, setUserLanguage] = useState();
    useEffect(() => {
        const defaultLanguage = window.localStorage.getItem('rcml-lang');
        setUserLanguage(defaultLanguage || 'en');
    }, []);
    
    useEffect(() => {
        window.localStorage.setItem('rcml-lang', userLanguage);
    }, [userLanguage]);
    
    const provider = {
        products, 
        setProducts,
        totalPages_,
        setTotalPages_, 
        currentPage,
        setCurrentPage,
        userLanguage,
        dictionary: dictionaryList[userLanguage],
        userLanguageChange: selected => {
            const newLanguage = languageOptions[selected] ? selected : 'en'
            setUserLanguage(newLanguage);
        }
    }

    return (
        <AppContext.Provider value={provider}>
            {props.children}
        </AppContext.Provider>
    )
}
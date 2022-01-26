import { createContext, useState } from "react";

const LanguageContext = createContext();
const initialLanguage = 'esp';



const translations = {
  esp: {
    headerTitle: "Emprendedores en español"
  },
  eng: {
    headerTitle: "Entrepeneur in english"
  }
  
} 


const initialText = translations.esp;

const LanguageProvider = ({children}) => {

  const [language, setLanguage] = useState (initialLanguage);
  const [texts, setTexts] = useState(initialText)


  const handleLanguage = (e) => {

       
    if (e.target.value === "") {
        setLanguage ("esp")
        setTexts (translations.esp);
    }
    else {
        setLanguage ("eng");
        setTexts (translations.eng);
    }

  }

   const data = {texts, handleLanguage};

    return <LanguageContext.Provider value= {data}>{children}</LanguageContext.Provider>
}

export {LanguageProvider};
export default LanguageContext;




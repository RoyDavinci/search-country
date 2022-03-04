import React from "react";
import { useState } from "react";
import { useContext } from "react";

const DisplayContext = React.createContext();

const DisplayProvider = ({ children }) => {
	const [dark, setDark] = useState(false);

	const handledDisplay = () => {
		setDark(!dark);
	};

	return (
		<DisplayContext.Provider value={{ dark, handledDisplay }}>
			{children}
		</DisplayContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(DisplayContext);
};

export { DisplayContext, DisplayProvider };

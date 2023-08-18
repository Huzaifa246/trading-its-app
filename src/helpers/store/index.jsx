import React, { createContext, useContext, useState } from 'react';

const GraphValuesContext = createContext();

export function useGraphValues() {
    return useContext(GraphValuesContext);
}

export function GraphValuesProvider({ children }) {
    const [graphValues, setGraphValues] = useState([]);

    return (
        <GraphValuesContext.Provider value={{ graphValues, setGraphValues }}>
            {children}
        </GraphValuesContext.Provider>
    );
}

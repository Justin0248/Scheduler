import { useState } from "react";

export function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    const transition  = function(newMode, replace = false) {
    setMode(newMode); 
    if (replace) {
        setHistory(prev => [...prev.slice(0, -1), newMode]);
        }
        else {
    setHistory([...history, newMode])
        }
    };
    const back = function() {
        if (history.length > 1) {
          const newHistory = [...history];
          newHistory.pop();
          setMode(newHistory[newHistory.length - 1]);
          setHistory(newHistory);
        }
      };
    return { mode, transition, back  };
};
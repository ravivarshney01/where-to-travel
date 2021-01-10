import { useState } from "react";

const useSuggestions = (data) => {
  const [suggestions, setSuggestions] = useState([]);

  const refreshSuggestions = (q) => {
    if (q.length > 0) {
      const filteredSuggestions = data.filter((i) =>
        i.toLowerCase().startsWith(q.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  return [suggestions, refreshSuggestions];
};

export default useSuggestions;

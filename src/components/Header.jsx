import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";

const Header = ({ word, setWord, darkTheme }) => {
  const appTheme = createTheme({
    palette: {
      primary: {
        main: darkTheme ? "#fff" : "#1976d2",
      },
      mode: darkTheme ? "dark" : "light",
    },
  });

  const [inputValue, setInputValue] = useState(word);

  useEffect(() => {
    setInputValue(word);
  }, [word]);

  // Debounced setter
  const debouncedSetWord = useCallback(
    debounce(val => {
      setWord(val.trim());
    }, 400),
    [setWord]
  );

  // Call debounced setter when inputValue changes
  useEffect(() => {
    if (inputValue) {
      debouncedSetWord(inputValue);
    } else {
      setWord("");
    }
    return () => {
      debouncedSetWord.cancel();
    };
  }, [inputValue, debouncedSetWord, setWord]);

  const handleClear = () => {
    setInputValue("");
    setWord("");
    debouncedSetWord.cancel();
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      debouncedSetWord.cancel();
      setWord(inputValue.trim());
    }
  };

  return (
    <div className="header flex flex-col items-center w-full py-4 px-2 md:px-0 transition-colors duration-500">
      <h1
        className={`text-3xl md:text-4xl uppercase font-display font-bold tracking-wider my-5 ${
          darkTheme ? "text-white" : "text-gray-900"
        } transition-colors duration-500`}
      >
        {word || "Word Search"}
      </h1>
      <div className="inputs w-full flex flex-col md:flex-row justify-center items-center gap-4">
        <ThemeProvider theme={appTheme}>
          <div className="w-full md:w-64">
            <TextField
              className="search"
              label="Search a word"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a word..."
              fullWidth
              size="small"
              slotProps={{
                input: {
                  "aria-label": "search word",
                  endAdornment: inputValue && (
                    <button
                      aria-label="Clear"
                      onClick={handleClear}
                      className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                      tabIndex={-1}
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                      }}
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  ),
                  style: {
                    color: darkTheme ? "#fff" : "#222",
                    background: darkTheme ? "#222" : "#fff",
                    borderRadius: 8,
                    transition: "background 0.5s, color 0.5s",
                  },
                },
                inputLabel: {
                  style: {
                    color: darkTheme ? "#aaa" : "#555",
                    transition: "color 0.5s",
                  },
                },
              }}
            />
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;

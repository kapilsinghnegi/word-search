import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Container, FormControlLabel, styled, Switch } from "@mui/material";
import Header from "./components/Header";
import Definitions from "./components/Definitions";
import Footer from "./components/Footer";

const App = () => {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [error, setError] = useState("");
  const [darkTheme, setDarkTheme] = useState(() => {
    const saved = localStorage.getItem("darkTheme");
    return saved !== null ? saved === "true" : true;
  });
  const controllerRef = useRef();

  const dictionaryApi = async () => {
    if (!word) {
      setMeanings([]);
      setError("");
      return;
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setError("");
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
        { signal: controller.signal }
      );
      setMeanings(data.data);
    } catch (error) {
      if (axios.isCancel(error) || error.name === "AbortError") return;
      setMeanings([]);
      setError("No definitions found. Please try another word.");
      console.error("Error fetching definitions:", error);
    } finally {
      controllerRef.current = null;
    }
  };

  useEffect(() => {
    if (word.trim()) {
      dictionaryApi();
    }
  }, [word]);

  useEffect(() => {
    localStorage.setItem("darkTheme", darkTheme);
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  const ThemeSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "gold"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#aab4be",
          ...theme.applyStyles("dark", {
            backgroundColor: "#8796A5",
          }),
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#001e3c",
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "gold"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      ...theme.applyStyles("dark", {
        backgroundColor: "#003892",
      }),
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "#aab4be",
      borderRadius: 20 / 2,
      ...theme.applyStyles("dark", {
        backgroundColor: "#8796A5",
      }),
    },
  }));

  return (
    <div
      className={`min-h-screen flex flex-col w-full bg-gradient-to-tr from-gray-100 to-blue-100 text-gray-900 ${
        darkTheme
          ? "dark:text-gray-200 dark:from-gray-800 dark:to-gray-900"
          : ""
      } transition-colors duration-500`}
    >
      <div className="absolute top-0 right-0 p-4 z-10">
        <FormControlLabel
          control={
            <ThemeSwitch
              sx={{ m: 1 }}
              checked={darkTheme}
              onChange={() => setDarkTheme(prev => !prev)}
              slotProps={{ input: { "aria-label": "toggle dark mode" } }}
            />
          }
        />
      </div>
      <Container maxWidth="md" className="flex-grow flex flex-col pt-8 pb-4">
        <Header word={word} setWord={setWord} darkTheme={darkTheme} />
        {error && (
          <div className="w-full flex justify-center mt-6">
            <span className="text-red-500 text-lg transition-colors duration-500">
              {error}
            </span>
          </div>
        )}
        {meanings && meanings.length > 0 && (
          <Definitions word={word} meanings={meanings} darkTheme={darkTheme} />
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default App;

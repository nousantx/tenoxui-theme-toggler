import { useState, useLayoutEffect } from "react";
import tenoxui, { use, makeStyles } from "tenoxui";
import property from "@tenoxui/property";

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState(true);

  const themeState = theme ? "tc-#f2f3f4 bg-#191b1d" : "bg-#f2f3f4 tc-#191b1d";

  useLayoutEffect(() => {
    use({
      property: [property]
    });

    makeStyles({
      ".wrapper": `w-100vw h-100vh d-flex flex-parent-center position-relative tr-prop-[color, background-color] tr-time-0.15s ${themeState}`
    });

    tenoxui();
  }, [theme]);

  const darkMode = () => {
    setTheme(!theme);
  };

  const checkVibrate = count => {
    if (navigator.vibrate && [33, 66, 100].includes(count)) {
      navigator.vibrate(200);
    }
  };

  const handleSectionClick = () => {
    setCount(prevCount => {
      const newCount = prevCount === 100 ? 1 : prevCount + 1;
      checkVibrate(newCount);
      return newCount;
    });
  };

  const resetCount = e => {
    e.stopPropagation();
    setCount(0);
  };

  return (
    <section className="wrapper" onClick={handleSectionClick}>
      <h1 className="fs-5rem">{count}</h1>

      <button
        className="position-absolute box-40px bg-#a7fbdd t-1rem l-1rem br-6px border-none"
        onClick={e => {
          e.stopPropagation();
          darkMode();
        }}
      ></button>

      <button
        className="position-absolute box-40px bg-#fca57a t-1rem l-72px br-6px border-none"
        onClick={resetCount}
      ></button>
    </section>
  );
}

export default App;

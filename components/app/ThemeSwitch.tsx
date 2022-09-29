import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

interface ThemeProps {
  theme: string;
  setTheme: Function;
}
function ThemeSwitch(props: ThemeProps) {
  console.log(props.theme);
  const [toggled, setToggled] = useState(false);

  const handleThemeChange = () => {
    if (props.theme != "dark") {
      props.setTheme("dark");
      setToggled(!toggled);
    } else {
      props.setTheme("light");
      setToggled(!toggled);
    }
    console.log(props.theme);
  };
  return (
    <div className="theme-btn" placeholder="blur" onClick={handleThemeChange}>
      <div className="theme-circle"></div>
    </div>
  );
}

export default ThemeSwitch;

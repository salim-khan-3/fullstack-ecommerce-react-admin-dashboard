import React, { use, useContext, useEffect } from "react";
import { MyContext } from "../../App";

const Login = () => {
  const { isHideSidebarAndNavbar, setIsHideSidebarAndNavbar } =
    useContext(MyContext);

  useEffect(() => {
    setIsHideSidebarAndNavbar(isHideSidebarAndNavbar);
    return () => {
      setIsHideSidebarAndNavbar(false);
    };
  }, [setIsHideSidebarAndNavbar]);

  return (
    <div>
      <h1>login page</h1>
    </div>
  );
};

export default Login;

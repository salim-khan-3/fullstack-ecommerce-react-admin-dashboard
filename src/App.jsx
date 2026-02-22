import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Header/Navbar";
import Sidebar from "./layouts/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import { createContext, useState } from "react";


const MyContext = createContext();

function App() {

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);

    const values = {
      isToggleSidebar,
      setIsToggleSidebar
    };
  return (
    <BrowserRouter>
    <MyContext.Provider value={values}>
      <Navbar></Navbar>
      <div className="flex ">
        <div className="w-[420px] shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard></Dashboard>}></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          </Routes>
        </div>
      </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

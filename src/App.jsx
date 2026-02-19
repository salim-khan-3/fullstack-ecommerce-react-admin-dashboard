import Navbar from "./layouts/Header/Navbar"
import Sidebar from "./layouts/Sidebar/Sidebar"
import Dashboard from "./pages/Dashboard/Dashboard"


function App() {


  return (
    <div>
      <Navbar></Navbar>
      <main>
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-3">
            <Sidebar></Sidebar>
          </div>
          <div className="col-span-9">
            <Dashboard></Dashboard>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

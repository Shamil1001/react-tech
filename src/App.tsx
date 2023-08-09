// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "@/pages/register/register";
import Login from "@/pages/login/login";
import WeekTable from "@/pages/week_table/week_table";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/week_table" element={<WeekTable />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

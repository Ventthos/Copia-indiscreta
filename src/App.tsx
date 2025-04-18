import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { OrdersPage } from './pages/Orders';
import './styles/App.css';
import { UserContextProvider } from "./context/UserContext";
import { RapidColectaRouter } from "./router/Router";

function App() {

  return (
    <UserContextProvider>
      <Router>
        <RapidColectaRouter/>
      </Router>
    </UserContextProvider>
    
  )
}

export default App

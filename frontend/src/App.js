
import { Outlet } from 'react-router-dom'; 
import './App.css';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default App;

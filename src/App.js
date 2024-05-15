import './App.css';
import HostComp from './Components/HostComp';
import { Routes, Route } from 'react-router-dom';
import FormComp from './Components/FormComp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HostComp />} />
        <Route path="/searchpage" element={<FormComp />} />
      </Routes>

    </div>
  );
}
export default App;
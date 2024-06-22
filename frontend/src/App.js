
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import  AddCommunity  from './components/AddCommunity.js';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <HomePage/> } > </Route>
        <Route path='/add' element={ <AddCommunity/> }> </Route>
      </Routes>
    </div>
  );
}

export default App;

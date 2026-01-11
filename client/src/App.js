
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Home';
import Joinpage from './pages/join';
import RoomPage from './pages/Room';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/join' element={<Joinpage />}></Route>
        <Route path='/room/:roomId' element={<RoomPage />}></Route>

      </Routes>

    </div>
  );
}

export default App;



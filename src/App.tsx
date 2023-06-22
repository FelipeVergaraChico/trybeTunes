import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Search from './components/search';
import Album from './components/album';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
      <Route path="/album/:id" element={ <Album /> } />
    </Routes>
  );
}

export default App;

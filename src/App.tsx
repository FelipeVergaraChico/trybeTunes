import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Search from './components/search';
import Album from './components/album';
import Layout from './components/Layout';
import Favorites from './components/Favorites/Favorites';
import Profile from './Profile/Profile';
import EditProfile from './components/EditProfile/EditProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/edit-profile" element={ <EditProfile /> } />
      </Route>
    </Routes>
  );
}

export default App;

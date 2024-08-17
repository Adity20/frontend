import React, { useState } from 'react';
import Auth from './components/Auth';
import Chat from './components/Chat';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {user ? <Chat /> : <Auth setUser={setUser} />}
    </div>
  );
}

export default App;
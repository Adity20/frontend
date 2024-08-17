import React, { useState } from 'react';
import Auth from './components/Auth';
import Chat from './components/Chat';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {user ? <Chat /> : <Auth setUser={setUser} />}
    </div>
  );
}

export default App;
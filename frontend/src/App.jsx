import React, { useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>Hello from React</h1>
    </div>
  );
}

export default App;

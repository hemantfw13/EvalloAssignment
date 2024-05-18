import React from 'react';
import CalendarComponent from './components/Calendar';

function App() {
  const handleAuthClick = () => {
    window.location.href = 'http://localhost:8080/auth/google';
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleAuthClick}>Sync with Google Calendar</button>
        <CalendarComponent />
      </header>
    </div>
  );
}

export default App;

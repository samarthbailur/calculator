import React from 'react';
import './App.css';
import Calculator from  './Component/Calculator';

function App() {
  return (
    <div className="App" style={{background : 'linear-gradient(to top,rgb(181,160,246),rgb(129,220,255))',height : '100vh'}}>
      <Calculator />
    </div>
  );
}

export default App;

import React from 'react';
import './App.css'
import useAxios from 'axios-hooks'
function App() {
  const [{ data }] = useAxios(
      'http://localhost:3001/images'
  )

  return (
    <div>
      {
        data && data.map(i => {
          return <img src={`http://localhost:3001${i.path}`} />
        })
      }
    </div>
  );
}

export default App;

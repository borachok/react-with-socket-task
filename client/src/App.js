import { useState, useEffect} from 'react';
import { io } from 'socket.io-client'

import './App.css';


function App() {

  const socket = io("http://localhost:3002");
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      socket.emit('start');
      socket.on('ticker', function(response) {
        const res = Array.isArray(response) ? response : [response];
        setData(res)
        console.log(res);
      });
    } catch (e){
      socket.emit('disconnect')
    }

    const winner = data.find(el => el.distance === 1000);


  }, [])

  return (
    <div className='App'>
      <div className='container'>
        {data.map(el => <div className='bg horse' style={{width: el.distance}}>{el.name}- {el.distance}</div>)}
      </div>
    </div>
  )};

export default App
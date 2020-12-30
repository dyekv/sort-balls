import './App.css';
import React,{useState,useEffect} from 'react'

const allballs = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9]

const rangeRand = (range) => Math.floor(Math.random() * range)
const selectDefaultBall = () => {
  const range = allballs.length
  if(range === 0 ){return 0}
  const choose = rangeRand(range)
  const selectBall = allballs[choose]
  allballs.splice(choose,1)
  return selectBall
}

function App() {
  const [loading,setLoading] = useState(true)
  const [tubes,settubes] = useState([])
  useEffect(()=>{
    settubes([...Array(11)].map(()=>[...Array(4)].map(()=>selectDefaultBall())))
    setLoading(false)
  },[])
  return (
    <div className="App">
      <div style={{display:'flex'}}>
      {loading ? <p>loading...</p> : tubes.map((tube,idx)=><div className="tube" style={{margin:40}} key={idx}>{tube.map((ball,idx)=><div key={idx}>{ball}</div>)}</div>)}
      </div>
    </div>
  );
}

export default App;

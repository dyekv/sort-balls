import './App.css';
import React,{useState,useEffect} from 'react'

const allballs = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9]
const colors = ['white','tomato','royalblue','orange','gold','lightskyblue','silver','green','pink','blueviolet']

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
  const [tubes,setTubes] = useState([])
  const [picking,setPicking] = useState([])

  const onClickTube = (targetTube)=>{
    if(picking.length === 0){ // 未選択のとき
      console.log(tubes[targetTube])
      const targetBall = tubes[targetTube].findIndex(ball=>ball > 0)
      if(targetBall === -1){return null} // 全部白（空っぽ）
      setPicking([targetTube,targetBall])
      console.log('選択された色は',colors[tubes[targetTube][targetBall]])
    }else{ // 選択されているとき
      const targetSpace = tubes[targetTube].filter(ball=>ball===0).length -1
      console.log(targetSpace)
      if(targetSpace === -1){ // 挿入先が満タンのとき
        setPicking([targetTube,0])
        return null
      } 
      const replaceTubes = tubes.map(tube=>[...tube])
      console.log(replaceTubes)
      if(targetSpace === 3){ // 挿入先が空のとき
        replaceTubes[picking[0]].splice(picking[1],1,0)
        replaceTubes[targetTube].splice(targetSpace,1,tubes[picking[0]][picking[1]])
        setTubes(replaceTubes)
        setPicking([])
        return null
      }
      if(tubes[targetTube][targetSpace+1] === tubes[picking[0]][picking[1]]) // 同じ色の上に置くとき
        replaceTubes[picking[0]].splice(picking[1],1,0)
        replaceTubes[targetTube].splice(targetSpace,1,tubes[picking[0]][picking[1]])
        setTubes(replaceTubes)
        setPicking([])
        return null
      }
  }

  useEffect(()=>{
    setTubes([...Array(11)].map(()=>[...Array(4)].map(()=>selectDefaultBall())))
    setLoading(false)
  },[])

  return (
    <div className="App">
      <div style={{display:'flex'}}>
      {loading ? <p>loading...</p> :tubes.map((tube,idx)=><div className="tube" key={idx} onClick={()=>onClickTube(idx)}>{tube.map((ball,idx)=><div className="ball" style={{backgroundColor:colors[ball]}} key={idx}/>)}</div>)}
      </div>
    </div>
  );
}

export default App;

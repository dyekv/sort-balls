import './App.css';
import React,{useState,useEffect} from 'react'

const originAllballs = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9]
const allballs = []
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

const  App = ()=> {
  const [loading,setLoading] = useState(true)
  const [tubes,setTubes] = useState([])
  const [picking,setPicking] = useState([])
  const [count,setCount] = useState(0)


  const onClickTube = (targetTube)=>{
    if(picking.length === 0){ // 未選択のとき
      console.log('未選択')
      const targetBall = tubes[targetTube].findIndex(ball=>ball > 0)
      if(targetBall === -1){return null} // 全部白（空っぽ）
      setPicking([targetTube,targetBall])
      return null
    }else{ // 選択されているとき
      console.log('選択済み')
      const targetSpace = tubes[targetTube].filter(ball=>ball===0).length -1
      const moveBall = () => {
        const replaceTubes = tubes.map(tube=>[...tube])
        replaceTubes[picking[0]].splice(picking[1],1,0)
        replaceTubes[targetTube].splice(targetSpace,1,tubes[picking[0]][picking[1]])
        setTubes(replaceTubes)
        setPicking([])
        setCount(count=>count+1)
      }
      if(targetSpace === -1){ // 挿入先が満タンのとき
        console.log('宛先満タン')
        setPicking([targetTube,0])
        return null
      }
      if(targetSpace === 3){ // 挿入先が空のとき
        console.log('宛先空っぽ')
        moveBall()
        return null
      }
      if(tubes[targetTube][targetSpace+1] === tubes[picking[0]][picking[1]]){ // 同じ色の上に置くとき
        console.log('宛先同色')
        moveBall()
        return null
      }
      console.log('宛先違う色')
      setPicking([targetTube,0])
    }
  }

  const onReset = () => {
    allballs.push(...originAllballs)
    setPicking([])
    setCount(0)
    setTubes([...Array(11)].map(()=>[...Array(4)].map(()=>selectDefaultBall())))
  }

  const onBack = () => {
    setCount(count => count-1)
  }

  useEffect(()=>{
    onReset()
    setLoading(false)
  },[])

  return (
    <div className="App">
      <h1>sort balls</h1>
      <div className="button-area">
        <button onClick={onReset}>Reset</button>
        <button onClick={onBack} disabled={count === 0}>Back one</button>
      </div>
      <div>{'move count : ' + count}</div>
      <div className="tube-area">
      {loading ? <p>loading...</p> :tubes.map((tube,idx)=><div key={idx}><div 
          className="tube" 
          onClick={()=>onClickTube(idx)}
        >{tube.map((ball,idx)=><div
          className="ball"
          style={{backgroundColor:colors[ball]}}
          key={idx}/>)}
        </div>
          <div className="triangle" style={{borderBottomColor:idx === picking[0] ? 'red' : 'white'}}></div>
        </div>)}
      </div>
      <div>
        create by <a href='https://twitter.com/dyekv1'>@dyekv1</a>
      </div>
    </div>
  );
}

export default App;

function App(){
  const [count,setCount] = useState(0);
  const [item,setIntem] = useState(10);

  const memoshow = useMemo(function test(){
    return count*5;
  },[count])

  return (
    <>  
    <h2>counter is : {count}</h2>
    <h2>Item  is : {item}</h2>
    <h3>{memoshow}</h3><br></br>
    <button onClick={()=> setCount(count+1)}>Increse Counter</button>
    <button onClick={()=> setIntem(item*10)}>Increse Item</button>
    </>
  )
}

export default App;

import { useState, useCallback, useEffect, useRef } from 'react';
function App() {
  const [length, setLenght] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = (useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdeefghijklmnopqrstuvwxyz";
    if(numAllowed){
      str = str + "0123456789";
    }
    if(charAllowed){
      str = str + "!@#$%^&*-_+=[]{}~`";
    }
    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    };
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]));
  
  const copyPasswordToClip = useCallback(() =>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() =>{
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3 text-xl font-medium mb-5'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='text-black outline-none w-full py-1 px-3 bg-white color-gray'
            placeholder='Password'
            readOnly
            ref={passwordRef}
            />
            <button 
            onClick={copyPasswordToClip}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer'>Copy</button>
        </div>
        <div className='div-selection flex justify-around gap-x-2 mb-4 mt-5'>
          <div className='range-div flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={30}
            value={length}
            className='range-inp cursor-pointer'
            onChange={(e) => {setLenght(e.target.value)}}
            />
            <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={()=>{
                setNumAllowed((prev) => !prev);
              }}  
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={()=>{
                setCharAllowed((prev) => !prev);
              }}  
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

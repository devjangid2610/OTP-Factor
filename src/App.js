import React,{useEffect, useRef, useState} from 'react';
import './App.css';

function App() {
 const blankArr = ['','','',''];
 let inputRef = [useRef(),useRef(),useRef(),useRef()]
 const [inputs,setInputs] = useState(blankArr);
 const [missing,setMissing] = useState(blankArr);
 const CODE = '1234';

 useEffect(()=>{
    inputRef[0].current.focus();
 },[])

const handleInputChange = (e,index)=>{
  const val = e.target.value;
  if(!Number(val)){
    return;
  }
  const copyInput = [...inputs];
  copyInput[index] = val;
  setInputs(copyInput);

  if(index<inputs.length-1){
    inputRef[index+1].current.focus();
  }
}

const handleKeyChange = (e,index)=>{
  console.log(e.keyCode,index);
  if(e.keyCode===8){
    const copyInput = [...inputs];
    copyInput[index]='';
    setInputs(copyInput);
    if(index>0){
      inputRef[index-1].current.focus();
    }
  }
}

const handlePaste=(e)=>{
  const data = e.clipboardData.getData('text'); //get paste data 
  if(!Number(data) || data.length!==inputs.length){
    return;
  }

  const pastCode = data.split('');
  setInputs(pastCode);
  inputRef[inputs.length-1].current.focus();
}

const handleSubmit=()=>{
  const missed = inputs.map((item,i)=>{
      if(item==='')
        return i;
  }).filter((item)=>(item || item===0));
  setMissing(missed);

  if(missed.length){
    return;
  }

  const userInput = inputs.join('');
  const isMatch = userInput===CODE;
  const msg = isMatch ? 'Code is Valid' : 'Code is Invalid';
  alert(msg);
}

  return(
    <div className='App'>
      <h1>Two Factor Code Input</h1>
      <div className='input-box'>
          {
            blankArr.map((item,i)=>{
              return <input 
                type='text'
                key={i}
                value={inputs[i]}
                maxLength={1}
                ref={inputRef[i]}
                onChange={(e)=>handleInputChange(e,i)}
                onKeyDown={(e)=>handleKeyChange(e,i)}
                onPaste={handlePaste}
                className={missing.includes(i) ? 'error' : ''}
              />
            })
          }
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <h3>Project Details :</h3>
      <p className='para'>This project entails designing a 4-digit security code input mechanism with two-factor authentication support. Users can input one digit per field, with automatic navigation to the next field. Backspacing at the beginning of a field refocuses the previous one. A submit button below triggers code validation against a hardcoded string, while supporting pasting inputs. Inputs are positioned in a rectangular layout for ease of use.</p>
      
    </div>
  )
}

export default App;
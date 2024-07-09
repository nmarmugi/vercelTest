import { useState } from 'react'
import './App.css'
import Button from './components/Button/Button'

function App() {
  const resetState = [{
    id: 'sasso',
    img: './img/sasso.png'
  },
  {
    id: 'carta',
    img: './img/carta.png'
  },
  {
    id: 'forbice',
    img: './img/forbice.png'
  }]


  const [buttons, setButtons] = useState(resetState)

  const [result, setResult] = useState('');
  const [count , setCount] = useState(0);

  function handleClose() {
    setResult('')
    setButtons(resetState)
  }

  function logicalPARI(buttonPlayer, message) {
    let newArray = buttons.filter(button => (button.id === buttonPlayer));
    const newButton = {id: `${newArray[0].id}Two`, img: newArray[0].img};
    newArray = [...newArray, newButton]
    setButtons(newArray)
    setResult(`${message}`)
  }

  function logicalALL(buttonPlayer, array, index, message) {
    let newArray = buttons.filter(button => (button.id === buttonPlayer));
    const newButton = {id: `${array[index].id}Two`, img: array[index].img};
    newArray = [...newArray, newButton]
    setButtons(newArray)
    setResult(`${message}`)
    if (message === 'HAI VINTO!') {
      setCount(count + 1);
    } else {
      if (count == 0) {
        return;
      }
      setCount(count - 1);
    }
  }

  function handleClick(e) {
    const randomIndex = Math.floor(Math.random() * buttons.length);
    const buttonID = e.target.parentNode.id;
    const randomButton = buttons[randomIndex].id;

    if (buttonID === randomButton) {
      logicalPARI(buttonID, 'PAREGGIO!')
      return;
    }
    if (buttonID === 'carta') {
      if (randomButton === 'sasso') {
        logicalALL(buttonID, resetState, 0, 'HAI VINTO!')
      } else {
        logicalALL(buttonID, resetState, 2, 'HAI PERSO!')
      }
    }
    if (buttonID === 'sasso') {
      if (randomButton === 'forbice') {
        logicalALL(buttonID, resetState, 2, 'HAI VINTO!')
      } else {
        logicalALL(buttonID, resetState, 1, 'HAI PERSO!')
      }
    }
    if (buttonID === 'forbice') {
      if (randomButton === 'carta') {
        logicalALL(buttonID, resetState, 1, 'HAI VINTO!')
      } else {
        logicalALL(buttonID, resetState, 0, 'HAI PERSO!')
      }
    }
  }

  return (
    <>
    <div className='containerButtons'>
      {buttons.map(button => (<Button key={button.id} buttonID={button.id} onClick={handleClick}><img src={button.img} alt="Immagine" /></Button>))}
    </div>
    {result !== '' ? <div className='container'></div> : console.log('GIOCA')}
    <div className='containerScore'>
      <h1 className='score'>SCORE: <span>{count}</span></h1>
      <h2 className='result'>{result}</h2>
      {result !== '' ? <button className='buttonReset' onClick={handleClose}>GIOCA ANCORA!</button> : <p className='message'>..FA' LA TUA SCELTA..</p>}
    </div>
    </>
  )
}

export default App

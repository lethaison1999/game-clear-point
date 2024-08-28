import { useRef, useState } from 'react'
import CricleItem from './components/CricleItem'
import { getRandomCoordinate } from './common/handleCommon'
const App = () => {
  const [arrayItem, setArrayItem] = useState([])
  const [numberItem, setNumberItem] = useState(0)
  const [prevNumber, setPrevNumber] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [time, setTime] = useState(0)
  const [restart, setRestart] = useState(false)

  const timerRef = useRef(null)
  const setTimeRef = useRef(null)

  const handleOnChange = (e) => {
    const value = Number(e.target.value)
    setNumberItem(value)
  }

  const handleClickPlay = () => {
    if (numberItem === 0) return
    timerRef.current = setInterval(() => {
      setTime((prevTime) => parseFloat((prevTime + 0.1).toFixed(1)))
    }, 100)
    const newArrayItem = Array.from({ length: numberItem }, (item, index) => {
      const { x, y } = getRandomCoordinate()
      return {
        id: (index + 1).toString(),
        x,
        y,
        text: (index + 1).toString(),
        color: 'white'
      }
    })
    setArrayItem(newArrayItem)
    setTime(0)
    setRestart(true)
    setGameOver(false)
    setPrevNumber(0)
    setGameWon(false)
  }
  const handleRemove = (itemPrev) => {
    clearTimeout(setTimeRef)
    if (gameOver) return
    const arrSetColor = arrayItem.map((item) => {
      if (item.id === itemPrev.id) {
        return {
          ...item,
          color: 'red'
        }
      }
      return item
    })
    setArrayItem(arrSetColor)

    if (Number(itemPrev.text) === Number(prevNumber) + 1) {
      if (Number(itemPrev.text) === Number(numberItem)) {
        setGameWon(true)
        clearInterval(timerRef.current)
      }
      setTimeRef.current = setTimeout(() => {
        const newArrCoordinate = arrayItem.filter((item) => item.id !== itemPrev.id)
        setPrevNumber(itemPrev.text)
        setArrayItem(newArrCoordinate)
      }, 800)
    } else {
      setGameOver(true)
      clearInterval(timerRef.current)
    }
  }

  const styleColor = !gameWon && !gameOver ? 'black' : gameOver ? 'red' : 'green'

  return (
    <div className="container-game w-[600px] h-[660px] px-[20px] py-[10px] border-[1px] border-black mx-auto my-[0px]">
      <h2 style={{ color: styleColor }} className="font-bold">
        {gameWon ? 'ALL CLEARED' : ''}
        {gameOver ? 'GAME OVER' : ''}
        {!gameOver && !gameWon ? `LET'S IS PLAY` : ''}
      </h2>
      <div className="mt-[5px] flex items-center gap-[50px] ">
        <span>Points: </span>
        <span>
          <input
            onChange={handleOnChange}
            type="text"
            value={numberItem}
            className=" border-[1px] rounded-sm border-black ml-[2px]"
          />
        </span>
      </div>
      <div className="mt-[5px] flex items-center gap-[60px] ">
        <span>Time: </span>
        <span>{time.toFixed(1)}s</span>
      </div>
      <div className="mt-[5px] p-[2px] ">
        {restart === true ? (
          <button
            onClick={handleClickPlay}
            type="button"
            className="border-[1px] border-[#3b3535] px-[20px] py-[1px] rounded-sm bg-[#d3cece]"
          >
            Restart
          </button>
        ) : (
          <button
            onClick={handleClickPlay}
            type="button"
            className="border-[1px] border-[#3b3535] px-[20px] py-[1px] rounded-sm bg-[#d3cece]"
          >
            Play
          </button>
        )}
      </div>
      <div className="mt-[5px] border-[1px] h-[500px]  border-black ">
        <svg width="100%" height="100%" stroke="black" xmlns="http://www.w3.org/2000/svg">
          {arrayItem.map((item) => (
            <CricleItem
              key={item.id}
              item={item}
              x={item.x}
              y={item.y}
              text={item.text}
              color={item.color}
              onClickRemove={handleRemove}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}

export default App

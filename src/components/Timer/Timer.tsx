/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useSelector'
import { getPadTime } from '../../utils/getPadTime'
import Button from '../Button/Button'
import cl from './timer.module.css'

const rootCl = [cl.wrapper]

interface TimerProps {
  getData: (
    allTime: number,
    secInHours: number,
    secMinutes: number,
    seconds: number
  ) => void
  setIsCansel: Dispatch<SetStateAction<boolean>>
  toggleInputs: (isCounting: boolean) => void
  isClick: boolean
}

const Timer = ({ getData, setIsCansel, toggleInputs, isClick }: TimerProps) => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [allTime, setAllTine] = useState(0)
  const [isCounting, setIsCounting] = useState(false)
  const [isShowControls, setIsShowControls] = useState(true)
  const [isZero, setIsZero] = useState(true)
  const [isPlay, setIsPlay] = useState(false)
  const dispatch = useDispatch()

  let ringtone = new Audio('./assets/iphone-1.mp3')

  const { strHours, strMinutes, strSeconds } = useTypedSelector(
    (state) => state.time
  )

  useMemo(() => {
    if (isPlay) {
      ringtone.play()
      ringtone.loop = true
    }
  }, [isPlay])

  useEffect(() => {
    setHours(Number(strHours))
    setMinutes(Number(strMinutes))
    setSeconds(Number(strSeconds))
  }, [strHours, strMinutes, strSeconds])

  const secInHours = hours * 3600
  const secMinutes = minutes * 60

  useEffect(() => {
    setAllTine(secInHours + secMinutes + seconds)
    setIsZero(false)
  }, [hours, minutes, seconds])

  useEffect(() => {
    getData(allTime, secInHours, secMinutes, seconds)
    if (allTime === 0 && isCounting) {
      setIsPlay(true)
      setIsCounting(false)
    }
  }, [allTime])

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting && setAllTine((allTime) => (allTime >= 1 ? allTime - 1 : 0))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [isCounting])

  const calcHours = Math.floor(allTime / 3600)
  const calcMinutes = Math.floor((allTime - calcHours * 3600) / 60)
  const calcSeconds = Math.floor(allTime - calcHours * 3600 - calcMinutes * 60)

  const screenHours = getPadTime(calcHours)
  const screenMinutes = getPadTime(calcMinutes)
  const screenSeconds = getPadTime(calcSeconds)

  const clickHandler = (type: string) => {
    switch (type) {
      case 'Старт':
        setIsCounting(true)
        setIsShowControls(false)
        setIsCansel(false)
        toggleInputs(false)
        break
      case 'Пауза':
        setIsCounting(false)
        break
      case 'Отмена':
        ringtone.pause()
        setIsZero(true)
        setIsPlay(false)
        setIsCansel(true)
        setIsCounting(false)
        setIsShowControls(true)
        toggleInputs(true)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        dispatch({
          type,
        })
        break
    }
  }

  isClick ? rootCl.push(cl.wrapper_hide) : (rootCl.length = 1)

  return (
    <div className={rootCl.join(' ')}>
      {isShowControls && allTime !== 0 ? (
        <div className={cl.wrapper__btns}>
          <Button clickHandler={clickHandler}>Старт</Button>
          <Button clickHandler={clickHandler}>Отмена</Button>
        </div>
      ) : (
        ''
      )}
      {isCounting ? (
        <div className={cl.wrapper__btns_active}>
          <Button clickHandler={clickHandler}>Пауза</Button>
          <Button clickHandler={clickHandler}>Отмена</Button>
        </div>
      ) : !isShowControls ? (
        <div className={cl.wrapper__btns_active}>
          {allTime !== 0 && <Button clickHandler={clickHandler}>Старт</Button>}
          <Button clickHandler={clickHandler}>Отмена</Button>
        </div>
      ) : (
        ''
      )}
      {!isShowControls && (
        <div className={cl.time}>
          <span>{screenHours}</span>:<span>{screenMinutes}</span>:
          <span>{screenSeconds}</span>
        </div>
      )}
    </div>
  )
}

export default Timer

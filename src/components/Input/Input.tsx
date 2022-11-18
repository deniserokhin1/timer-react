/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useOutSide } from '../../hooks/useOutSide'
import { initialState, reducer } from '../../hooks/useReducer'
import { getPadTime } from '../../utils/getPadTime'
import cl from './Input.module.css'

interface InputProps {
  isCancel: boolean
  setIsCansel: Dispatch<SetStateAction<boolean>>
  setIsClick: Dispatch<SetStateAction<boolean>>
  type: string
}

const rootCl = [cl.list]

const Input = ({ isCancel, setIsCansel, setIsClick, type }: InputProps) => {
  const [value, setValue] = useState('00')
  const [arrayOfTime, setArrayOfTime] = useState<string[]>([])
  const dispatch = useDispatch()
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsCansel(false)
    setIsShow(!isShow)
    setIsClick(!isShow)
    const target = e.target as HTMLUListElement
    if (target.textContent) {
      setValue(target.textContent)
      dispatch({
        type,
        payload: target.textContent,
      })
    }
  }

  // const arrayOfTime: string[] = []

  useEffect(() => {
    document.addEventListener('click', () => {
      setIsClick(false)
    })
    printTime(type)
  }, [])

  const { isShow, ref, setIsShow } = useOutSide(false)

  isShow ? rootCl.push(cl.list__active) : (rootCl.length = 1)

  useEffect(() => {
    if (isCancel) {
      setValue('00')
    }
  }, [isCancel])

  const printTime = (type: string) => {
    switch (type) {
      case 'HOURS':
        for (let i = 0; i <= 23; i++) {
          setArrayOfTime((arrayOfTime) => [...arrayOfTime, getPadTime(i)])
        }
        break
      case 'MINUTES':
        for (let i = 0; i <= 59; i++) {
          setArrayOfTime((arrayOfTime) => [...arrayOfTime, getPadTime(i)])
        }
        break
      case 'SECONDS':
        for (let i = 0; i <= 59; i++) {
          setArrayOfTime((arrayOfTime) => [...arrayOfTime, getPadTime(i)])
        }
        break
      default:
        break
    }
  }

  return (
    <div className={cl.text} ref={ref} onClick={clickHandler}>
      <span>{value}</span>
      <div>
        <ul className={rootCl.join(' ')}>
          {arrayOfTime.map((item) => (
            <li key={item} className={cl.item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Input

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react'
import { Progress } from 'antd'
import './styles/styles.css'
import 'antd/dist/antd.css'
import Timer from './components/Timer/Timer'
import cl from './components/Input/Input.module.css'
import Input from './components/Input/Input'
import { Provider } from "react-redux";
import { store } from './store'

const App = () => {
  const [alltTime, setAllTime] = useState(0)
  const [leftTime, setLeftTime] = useState(0)
  const [leftPercent, setLeftPercent] = useState(0)
  const [isCansel, setIsCansel] = useState(false)
  const [isShowInputs, setIsSHowInputs] = useState(true)
  const [isClick, setIsClick] = useState(false)

  const toggleInputs = (isShow: boolean) => {
    setIsSHowInputs(isShow)
  }

  const getTime = (value: string) => {}

  const getData = (
    leftTime: number,
    hours: number,
    minutes: number,
    seconds: number
  ) => {
    setLeftTime(leftTime)
    setAllTime(hours + minutes + seconds)
  }

  useMemo(() => {
    setLeftPercent((leftTime * 100) / alltTime)
  }, [leftTime])

  return (
    <Provider store={store}>
    <div className="div">
      <Progress
        className="progress"
        percent={leftPercent}
        width={700}
        strokeWidth={1.5}
        type="circle"
        gapDegree={0}
        showInfo={false}
        status={'normal'}
        style={{ color: 'white' }}
        strokeColor={'#ff8502'}
        trailColor={'#727272af'}
      />
      <Timer
        getData={getData}
        setIsCansel={setIsCansel}
        toggleInputs={toggleInputs}
        isClick={isClick}
      />
      {isShowInputs && (
        <div className={cl.wrapper__input}>
          <Input
            isCancel={isCansel}
            setIsCansel={setIsCansel}
            setIsClick={setIsClick}
            type='HOURS'
          />
          <Input
            isCancel={isCansel}
            setIsCansel={setIsCansel}
            setIsClick={setIsClick}
            type='MINUTES'
          />
          <Input
            isCancel={isCansel}
            setIsCansel={setIsCansel}
            setIsClick={setIsClick}
            type='SECONDS'
          />
        </div>
      )}
    </div>
    </Provider>
  )
}

export default App

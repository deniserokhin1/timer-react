import React, { PropsWithChildren } from 'react'
import cl from './Button.module.css'

interface ButtonProps {
  clickHandler: (type: string) => void
}

const Button = ({
  children,
  clickHandler,
}: PropsWithChildren<ButtonProps>) => {
  const clickonButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetType = e.target as HTMLButtonElement
    if (targetType.textContent) {
      clickHandler(targetType.textContent)
    }
  }
  return (
    <button className={cl.btn} onClick={clickonButton}>
      {children}
    </button>
  )
}

export default Button

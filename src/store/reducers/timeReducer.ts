export const HOURS = 'HOURS'
export const MINUTES = 'MINUTES'
export const SECONDS = 'SECONDS'

interface IAction {
  type: string
  payload: string
}

interface IState {
  strHours: string
  strMinutes: string
  strSeconds: string
}

export const initialState = {
  strHours: '00',
  strMinutes: '00',
  strSeconds: '00',
}

export const timeReducer = (state = initialState, action: IAction): IState => {
  switch (action.type) {
    case HOURS:
      return { ...state, strHours: action.payload }
    case MINUTES:
      return { ...state, strMinutes: action.payload }
    case SECONDS:
      return { ...state, strSeconds: action.payload }
    case 'Отмена':
      return { ...state, strHours: '00', strMinutes: '00', strSeconds: '00' }
    default:
      return state
  }
}

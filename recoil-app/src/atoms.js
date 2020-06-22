
import { atom } from 'recoil'

export const dispatcherState = atom({
    key: "dispatcherState",
    default: undefined
  })

export const valueSetsState = atom({
    key: 'valueSetsState',
    default: {'34206005': 'hello!'}
})

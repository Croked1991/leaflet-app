import { store } from './../redux/index';
import { TypedUseSelectorHook, useSelector } from 'react-redux'


export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
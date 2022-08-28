import { store } from "./../redux/index";
import { useDispatch } from "react-redux"


export const useAppDispatch: () => typeof store.dispatch = useDispatch
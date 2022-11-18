import {
    Dispatch,
    RefObject,
    SetStateAction,
    useEffect,
    useRef,
    useState,
  } from "react";
  
  type TypeOut = {
    ref: RefObject<HTMLDivElement>;
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
  };
  
  export const useOutSide = (initialVisibla: boolean): TypeOut => {
    const [isShow, setIsShow] = useState(initialVisibla);
    const ref = useRef<HTMLDivElement>(null);
  
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsShow(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }, []);
  
    return { ref, isShow, setIsShow };
  };
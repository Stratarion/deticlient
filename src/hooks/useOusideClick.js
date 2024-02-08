import { useEffect } from "react";

/**
 * Hook ловит клик мыши вне заданно элемента DOOM
 */
export function useOutsideAlerter(ref, cb) {
  useEffect(() => {
    /**
     * Срабатывает при клики мимо рефы срабатывает колбэк cb
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Чистка слушателя при размаунте компонента
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
}
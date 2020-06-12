import { useState, useEffect } from 'react'

export default function useDebounce(value, delay) {
  const [ debouncedValue, setDebouncedValue ] = useState(value)

  useEffect(() => {
    let handler

    if (!value) {
      setDebouncedValue(value)
    } else {
      handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
    }

    return () => {
      clearTimeout(handler)
    }
  }, [ value, delay ])

  return debouncedValue
}

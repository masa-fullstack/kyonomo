import React from 'react'

export const useClickOutside = (ref, callback, isActive) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target) && isActive) {
      callback()
    }
  }
  React.useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

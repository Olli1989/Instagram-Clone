import { useEffect, useState, useRef } from 'react'

function useHover(){
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)

  function enter(){
    setHovered(true)
  }

  function leave(){
    setHovered(false)
  }

  useEffect(()=>{
    const refHover = ref.current
    refHover.addEventListener('mouseenter', enter)
    refHover.addEventListener('mouseleave', leave)

    return () => {
      refHover.removeEventListener('mouseenter', enter)
      refHover.removeEventListener('mouseleave', leave)
    }
  },[])

  return [hovered, ref]

}

export default useHover
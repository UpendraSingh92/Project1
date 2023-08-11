
import React from 'react'

export const HighlightText = ({texts}) => {
  return (
    <span 
    className='text-transparent bg-clip-text  bg-gradient-to-b from-[#007ecd] from-10% via-[#00c2e0] via-30% to-[#50C878] to-90%'>
    {texts}
    </span>
  )
}

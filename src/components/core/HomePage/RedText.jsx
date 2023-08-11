
import React from 'react'

export const RedText = ({texts}) => {
  return (
    <span 
    className='text-transparent bg-clip-text  bg-gradient-to-br from-[#ff0101] from-10% via-[#ff00b7] via-50% to-[#d82cff] to-50%'>
    {texts}
    </span>
  )
}

import React, { useState } from 'react';
import useHover from '../../hooks/use-hover'
import ProfileImageModal from './modal'

export default function Image({photo , username}){
  const [hovered,ref] = useHover()
  const [open, setOpen] = useState(false)

  return (
    <div 
      className="relative"
      ref={ref}
    >

      <img 
          src={photo.imageSrc} 
          alt={photo.caption} 
          className={`cursor-pointer ${hovered ? "opacity-50" : ""}`}
          onClick={()=>{setOpen(prevState => !prevState)}}
      />  
      
      {hovered && 
        <div className="w-full top-0 p-4 font-bold absolute flex justify-between">
          <p>Comments: {photo.comments.length}</p>
          <p>Likes: {photo.likes.length}</p> 
        </div> 
      } 

      <ProfileImageModal username={username} content={photo} open={open} onClose={() => setOpen(false)} />
                 
    </div>
  )
}


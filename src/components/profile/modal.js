import { createPortal } from "react-dom"
import React, { useRef } from "react";

import Actions from "../post/actions"
import Comments from "../post/comments"
import Header from "../post/header"
import Footer from '../post/footer';
import Image from "../post/image"

export default function ProfileImageModal({open, onClose, content, username}) {
  const commentInput = useRef(null)

  const handleFocus = () => commentInput.current.focus();

  //<Image className="object-scale-down" src={content.imageSrc} caption={content.caption} />

  return (
    open ?
      createPortal(
        <div className="fixed top-0 left-0 bg-gray-500 bg-opacity-75 h-screen w-screen flex items-start justify-between p-4">
          <div className="relative flex justify-center items-center max-w-6xl w-11/12 h-full">
              <div className="absolute top-0 left-0 w-1/2 h-full">
                <img className="w-full h-full object-cover" src={content.imageSrc} />
              </div>
                
              
              <div className="bg-white h-full w-1/2 ml-auto">
              <Header username={username} />
                <Footer username={username} caption={content.caption} />
                
                <Actions
                  docId={content.docId}
                  totalLikes={content.likes.length}
                  likedPhoto={content.userLikedPhoto}
                  handleFocus={handleFocus}
                />
                <Comments
                  docId={content.docId}
                  comments={content.comments}
                  posted={content.dateCreated}
                  commentInput={commentInput}
                />
              </div>

          </div>

          <button className="w-1/12 text-white text-4xl" onClick={onClose}>&times;</button>
        </div>
        ,document.body
      )
    :
    null
  )
}
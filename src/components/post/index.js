import React, { useRef } from "react";

import Actions from "./actions"
import Comments from "./comments"
import Header from "./header"
import Footer from './footer';
import Image from "./image"

export default function Post({ content }) {
  const commentInput = useRef(null)

  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded col-span-4 border bg-white mb-16">
        <Header username={content.username} />
        <Image src={content.imageSrc} caption={content.caption} />
        <Actions
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus}
            />
        <Footer username={content.username} caption={content.caption} />
    </div>
  )
}
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Image from './image'

// future task 2): add a lightbox where you can add comments!

export default function Photos({ photos, username }) {

  return (
      <div className="h-16 border-t border-gray mt-12 pt-4">
        <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
          {!photos ? (
              <>
              {[...new Array(9)].map((_, index) => (
                  <Skeleton key={index} count={1} width={320} height={400} />
              ))}
          </>
          ) : photos.length > 0 ? (
              photos.map((photo, i) => (
                  <Image 
                    key={photo.docId}
                    photo={photo}
                    username={username}
                  />
                  
              ))
          ) : <p className="text-center text-2xl col-span-3">No Photos Yet</p>}
        </div>
      </div>
  );
} 
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../lib/firebase"

export async function doesUsernameExist(username) {

  const result = await getDocs(query(collection(db, "users"), where("username","==",username)))
  
  if(result.empty){
    return false
  }
    
  return true
  
}

export async function getUserByUserId(userId){
  const result = await getDocs(query(collection(db, "users"), where("userId","==",userId)))

  const user = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }))

  return user
}

export async function getUserFollowedPhotos(userId, followingUserIds) {
  const result = await getDocs(query(collection(db, "photos"), where("userId","in",followingUserIds)))

  const userFollowedPhotos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
        let userLikedPhoto = false;
        if (photo.likes.includes(userId)) {
            userLikedPhoto = true;
        }
        const user = await getUserByUserId(photo.userId);
        const username = user[0].username;
        return { username, ...photo, userLikedPhoto };
    })
  )

  return photosWithUserDetails;

}




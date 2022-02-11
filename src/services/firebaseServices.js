import { collection, query, where, getDocs, limit, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


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

export async function getSuggestedProfiles(userId) {
  const userRef = query(collection(db, "users"))
  const result = await getDocs(userRef, limit(10))

  const [{ following }] = await getUserByUserId(userId);
        
  return result.docs
      .map((user) => ({ ...user.data(), docId: user.id }))
      .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));

}

export async function updateUserFollowing(docId, profileId, isFollowingProfile) {
  const followingRef = doc(db, "users", docId);

  await updateDoc(followingRef, {
    following: isFollowingProfile ? arrayRemove(profileId) : arrayUnion(profileId)
  });     
}

export async function updateFollowedUserFollowers(docId, followingUserId, isFollowingProfile) {
  const followedRef = doc(db, "users", docId);
  
  await updateDoc(followedRef, {
    following: isFollowingProfile ? arrayRemove(followingUserId) : arrayUnion(followingUserId)
  }); 
}



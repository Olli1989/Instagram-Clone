import { collection, query, where, getDocs, limit, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { db } from "../lib/firebase"

export async function isUserFollowingProfile(activeUsername, profileUserId) {
  const result = await getDocs(query(collection(db, "users"), where("username","==",activeUsername), where("following","array-contains",profileUserId)))
      
  const [response = {}] = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
  }));
  
  return !!response.fullName;
}

export async function doesUsernameExist(username) {

  const result = await getDocs(query(collection(db, "users"), where("username","==",username)))
  
  return result.docs.map((user) => user.data().length > 0);
  
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
    followers: isFollowingProfile ? arrayRemove(followingUserId) : arrayUnion(followingUserId)
  }); 
}

export async function getUserByUsername(username) {
  const result = await getDocs(query(collection(db, "users"), where("username","==",username)))

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user.length > 0 ? user : false; 
}

export async function getUserIdByUsername(username) {
  const result = await getDocs(query(collection(db, "users"), where("username","==",username)))
  
  const [{ userId = null }] = result.docs.map((item) => ({
      ...item.data(),
  }));

  return userId
}

export async function getUserPhotosByUsername(username){
  const userId = await getUserIdByUsername(username);
  const result = await getDocs(query(collection(db, "photos"), where("userId","==",userId)))

  const photos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return photos
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileId,
  followingUserId
) {
  await updateUserFollowing(activeUserDocId, profileId, isFollowingProfile);
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}


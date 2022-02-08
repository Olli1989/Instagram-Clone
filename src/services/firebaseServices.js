import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../lib/firebase"

export async function doesUsernameExist(username) {

  const result = await getDocs(query(collection(db, "users"), where("username","==",username)))
  
  if(result.empty){
    return false
  }
    
  return true
  
}



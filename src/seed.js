import { collection, addDoc } from "firebase/firestore"; 

export async function seedDatabase(db) {
  const users = [
    {
      userId: '0bYPBPYqAXcii7LJHCozznuBifd2',
      username: 'oliver1',
      fullName: 'oliver',
      emailAddress: 'oliver@gmx.at',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['0bYPBPYqAXcii7LJHCozznuBifd2'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['0bYPBPYqAXcii7LJHCozznuBifd2'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['0bYPBPYqAXcii7LJHCozznuBifd2'],
      dateCreated: Date.now()
    }
  ];

  for (let k = 0; k < users.length; k++) {
    try {
      const docRef = await addDoc(collection(db, "users"),users[k])
      console.log("Document written with ID: ", docRef)
    } catch(e) {
      console.error("Error adding document: ",e)
    }
    
  }

  for (let i = 1; i <= 5; ++i) {
    try {
      const docRef2 = await addDoc(collection(db, "photos"),{
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      })
      console.log("Document written with ID: ", docRef2)
    } catch (e) {
      console.error("Error adding document: ",e)
    }
   
  }
}


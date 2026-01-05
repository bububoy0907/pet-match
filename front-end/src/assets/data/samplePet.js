import petImage from '../assets/pets/sampleDog.jpg';

export const samplePet = [
  {
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'Male',
    description: 'Friendly and energetic.',
    hobbies: ['Running', 'Fetching', 'Swimming'],
    image: petImage,
    posts: [
      { type: 'image', url: petImage },
      { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
  },
];

import petImage from '../assets/pets/sampleDog.jpg';

export const sampleShop = {
  name: 'Happy Pets',
  chatUrl: '/chatbox',
  comments: [
    { user: 'Alice', text: 'Great service!', stars: 5 },
    { user: 'Bob', text: 'Loved the puppy!', stars: 4 },
  ],
  pets: [
    {
      name: 'Buddy',
      image: petImage,
    },
  ],
};

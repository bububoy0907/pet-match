// src/context/pet-context.js
import { createContext, useState } from "react";
import pet1 from '../assets/pets/sampleDog.jpg';
import pet2 from '../assets/pets/Example_Gold1_image1.jpg';
import pet3 from '../assets/pets/sampleCat.jpg';
import pet4 from '../assets/pets/Example_dog2.jpg';
import pet5 from '../assets/pets/Example_cat2.jpg';
import pet6 from '../assets/pets/Example_dog3.jpg';
import pet7 from '../assets/pets/Example_cat3.jpg';
import pet8 from '../assets/pets/Example_cat4.jpg';
import pet9 from '../assets/pets/Example_dog6.jpg';
import pet10 from '../assets/pets/Example_cat5.jpg';
import pet11 from '../assets/pets/Example_cat6.jpg';
import pet12 from '../assets/pets/Example_dog4.jpg';
import pet13 from '../assets/pets/Example_dog5.jpg';
import pet14 from '../assets/pets/Example_dog7.jpg';
import pet15 from '../assets/pets/Example_dog8.jpg';
import pet16 from '../assets/pets/Example_cat7.jpg';
import pet17 from '../assets/pets/Example_cat8.jpg';
import pet18 from '../assets/pets/Example_cat9.jpg';
import pet19 from '../assets/pets/Example_dog9.jpg';
/* ---------- paste your hard‑coded pet list here ---------- */
  const rawPets = [
    { name: "KiKi", breed: "Siamese", age: 2, gender: "Female", vaccineStatus: "Vaccinated", sellType: "Adopt", species: "Cat", image: pet17 },
    { name: "Charlie", breed: "Border Collie", age: 3, gender: "Male", vaccineStatus: "Vaccinated", sellType: "Adopt", species: "Dog", image: pet12 },
    { name: "Neko", breed: "Japanese Bobtail", age: 2, gender: "Male", vaccineStatus: "Not Vaccinated", sellType: "Buy", species: "Cat", image: pet8 },
    { name: "Mimi", breed: "Persian Cat", age: 1, gender: "Female", vaccineStatus: "Not Vaccinated", sellType: "Buy", species: "Cat", image: pet3 },
    { name: "Buddy", breed: "Golden Retriever", age: 1, gender: "Male", vaccineStatus: "Vaccinated", sellType: "Buy", species: "Dog", image: pet2 },
    { name: "Max", breed: "Poodle", age: 2, gender: "Male", vaccineStatus: "Vaccinated", sellType: "Buy", species: "Dog", image: pet4 },
    { name: "Luna", breed: "British Shorthair", age: 3, gender: "Female", vaccineStatus: "Vaccinated", sellType: "Adopt", species: "Cat", image: pet10 },
    { name: "Pepper", breed: "Schnauzer", age: 2, gender: "Male", vaccineStatus: "Partially Vaccinated", sellType: "Buy", species: "Dog", image: pet14 },
    { name: "Coco", breed: "Maltese", age: 1, gender: "Female", vaccineStatus: "Not Vaccinated", sellType: "Adopt", species: "Dog", image: pet15 },
    { name: "Miso", breed: "Scottish Fold", age: 1, gender: "Female", vaccineStatus: "Vaccinated", sellType: "Buy", species: "Cat", image: pet7 },
    { name: "Ginger", breed: "Exotic Shorthair", age: 3, gender: "Male", vaccineStatus: "Vaccinated", sellType: "Adopt", species: "Cat", image: pet11 },
    { name: "Whiskers", breed: "Shiba Inu", age: 2, gender: "Male", vaccineStatus: "Not Vaccinated", sellType: "Buy", species: "Dog", image: pet1 },
    { name: "Nala", breed: "Labrador Retriever", age: 4, gender: "Female", vaccineStatus: "Vaccinated", sellType: "Buy", species: "Dog", image: pet6 },
    { name: "Mochi", breed: "Maine Coon", age: 3, gender: "Male", vaccineStatus: "Partially Vaccinated", sellType: "Adopt", species: "Cat", image: pet5 },
    { name: "Pudding", breed: "Russian Blue", age: 2, gender: "Female", vaccineStatus: "Vaccinated", sellType: "Buy", species: "Cat", image: pet16 },
    { name: "Trixie", breed: "Beagle", age: 2, gender: "Female", vaccineStatus: "Vaccinated", sellType: "Buy", species: "Dog", image: pet19 },
    { name: "Finn", breed: "Shiba Inu", age: 1, gender: "Male", vaccineStatus: "Not Vaccinated", sellType: "Adopt", species: "Dog", image: pet9 },
    { name: "Bruh", breed: "Sphynx", age: 3, gender: "Male", vaccineStatus: "Partially Vaccinated", sellType: "Buy", species: "Cat", image: pet18 },
    { name: "Toby", breed: "Husky", age: 2, gender: "Male", vaccineStatus: "Vaccinated", sellType: "Buy", species: "Dog", image: pet13 },
  ];

/* (optional) shuffle once so order is random on first load */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const PetContext = createContext({
  pets: [],
  addPet: () => {},
  blogs: [],
  addBlog: () => {},
});

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState(() => shuffle(rawPets));
  const [blogs, setBlogs] = useState([]);

  const addPet = (petObj) => setPets((p) => [...p, petObj]);
  const addBlog = (blogObj) => setBlogs((b) => [...b, blogObj]);

  return (
    <PetContext.Provider value={{ pets, addPet, blogs, addBlog }}>
      {children}
    </PetContext.Provider>
  );
};

export default PetContext;

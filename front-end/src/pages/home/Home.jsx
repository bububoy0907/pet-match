import React, { useState, useRef, useEffect, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PetContext from "../../context/pet-context.js";
// SAMPLE images & icons
import pet1 from '../../assets/pets/sampleDog.jpg';
import pet2 from '../../assets/pets/Example_Gold1_image1.jpg';
import pet3 from '../../assets/pets/sampleCat.jpg';
import pet4 from '../../assets/pets/Example_dog2.jpg';
import pet5 from '../../assets/pets/Example_cat2.jpg';
import pet6 from '../../assets/pets/Example_dog3.jpg';
import pet7 from '../../assets/pets/Example_cat3.jpg';
import pet8 from '../../assets/pets/Example_cat4.jpg';
import pet9 from '../../assets/pets/Example_dog6.jpg';
import pet10 from '../../assets/pets/Example_cat5.jpg';
import pet11 from '../../assets/pets/Example_cat6.jpg';
import pet12 from '../../assets/pets/Example_dog4.jpg';
import pet13 from '../../assets/pets/Example_dog5.jpg';
import pet14 from '../../assets/pets/Example_dog7.jpg';
import pet15 from '../../assets/pets/Example_dog8.jpg';
import pet16 from '../../assets/pets/Example_cat7.jpg';
import pet17 from '../../assets/pets/Example_cat8.jpg';
import pet18 from '../../assets/pets/Example_cat9.jpg';
import pet19 from '../../assets/pets/Example_dog9.jpg';
import Header from '../../components/Header';

import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  /************************************
   * PET DATA
   ************************************/
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
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  const { pets } = useContext(PetContext);
  const [currentIndex, setCurrentIndex] = useState(
    Number(localStorage.getItem('petCardIndex') || 0)
  );

  /************************************
   * HEADER MENU
   ************************************/
  // Menu ref for “click outside”

  /************************************
   * FILTER STATE
   ************************************/
  const [petType, setPetType] = useState('');
  const [breed, setBreed] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [gender, setGender] = useState('');
  const [vaccineStatus, setVaccineStatus] = useState('');
  const [sellType, setSellType] = useState('');

  // Only one filter open at a time
  const [filterOpen, setFilterOpen] = useState({
    petType: false,
    breed: false,
    age: false,
    gender: false,
    vaccine: false,
    sellType: false,
  });

  // Filter ref for “click outside”
  const filterRef = useRef(null);

  // ── build filtered list every time Pet Type / Breed changes ──
  const filteredPets = useMemo(() => {
    return pets.filter(p =>
      (!petType || p.species === petType) &&
      (!breed   || p.breed === breed)
    );
  }, [pets, petType, breed]);
  useEffect(() => {
    if (filteredPets.length && currentIndex >= filteredPets.length) {
      setCurrentIndex(0);
    }
  }, [filteredPets, currentIndex]);
  // if currentIndex exceeds new list ⇒ snap to 0
  useEffect(() => {
    if (currentIndex >= filteredPets.length) setCurrentIndex(0);
  }, [filteredPets, currentIndex]);

  useEffect(() => {
    localStorage.setItem('petCardIndex', currentIndex);
  }, [currentIndex]);
  /************************************
   * DRAG / SWIPE
   ************************************/
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  /************************************
   * CLICK OUTSIDE -> close menu/filter
   ************************************/


  // =========== Conditionally Render UI ===========
  if (filteredPets.length === 0) {
    return (
      <div className={`home-container ${isDragging ? 'no-select' : ''}`}>
        <Header />
        <FilterRow
          petType={petType} setPetType={setPetType}
          breed={breed} setBreed={setBreed}
          ageRange={ageRange} setAgeRange={setAgeRange}
          gender={gender} setGender={setGender}
          vaccineStatus={vaccineStatus} setVaccineStatus={setVaccineStatus}
          sellType={sellType} setSellType={setSellType}
          filterOpen={filterOpen} setFilterOpen={setFilterOpen}
          filterRef={filterRef}
        />
        <h2 className="no-more-pets">No pets match your filter.</h2>
      </div>
    );
  }

  // =========== Accessing the Current Pet ===========
  const safeIndex  = filteredPets.length ? currentIndex % filteredPets.length : 0;
  const currentPet = filteredPets[safeIndex];

  // =========== Swipe Events ===========
  const maxSwipeDistance = 150; // limit how far card can drag
  const onPointerDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    const clampedDelta = Math.max(Math.min(delta, maxSwipeDistance), -maxSwipeDistance);
    setCurrentX(clampedDelta);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    if (currentX < -threshold) {
      handleLike();
    } else if (currentX > threshold) {
      handleDislike();
    } else {
      setCurrentX(0);
    }
  };

  const handleLike = () => {
    animateSwipe(-300, () => {
      navigate(`/pet/${currentPet.name}`);
    });
  };

  const handleDislike = () => {
    animateSwipe(300, () => {
      setCurrentIndex(prev => (prev + 1) % filteredPets.length);
      setCurrentX(0);
    });
  };

  const animateSwipe = (distance, callback) => {
    setCurrentX(distance);
    setTimeout(() => callback(), 300);
  };

  // =========== Render Main Content ===========
  return (
    <div className={`home-container ${isDragging ? 'no-select' : ''}`}>
      <Header />

      <FilterRow
        petType={petType} setPetType={setPetType}
        breed={breed} setBreed={setBreed}
        ageRange={ageRange} setAgeRange={setAgeRange}
        gender={gender} setGender={setGender}
        vaccineStatus={vaccineStatus} setVaccineStatus={setVaccineStatus}
        sellType={sellType} setSellType={setSellType}
        filterOpen={filterOpen} setFilterOpen={setFilterOpen}
        filterRef={filterRef}
      />

      <div className="card-and-buttons" style={{ position: 'relative' }}>
      {isDragging && (
              <div
                className={`swipe-hover-box ${currentX < 0 ? 'left' : 'right'}`}
              >
                <div className="hover-message">
                  {currentX < 0 ? "I like it! It's cute ❤️" : "Next please 👋"}
                </div>
              </div>
            )}
        <div
          className={`pet-card ${isDragging ? 'dragging' : ''}`}
          style={{
            transform: `translateX(${currentX}px)`,
            transition: isDragging ? 'none' : '0.3s ease-out',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >

            <div className="pet-card-bg">
              <img
                src={currentPet.image}
                alt={currentPet.name}
                className="pet-card-img"
                draggable={false}
              />
            <div className="pet-info-overlay">
              <h2 className="pet-name">{currentPet.name}</h2>
              <div className="pet-info-grid">
                <div className="pet-info-item">
                  <span className="label">🐾 Breed:</span> {currentPet.breed}
                </div>
                <div className="pet-info-item">
                  <span className="label">🎂 Age:</span> {currentPet.age} year(s)
                </div>
                <div className="pet-info-item">
                  <span className="label">⚧ Gender:</span> {currentPet.gender}
                </div>
                <div className="pet-info-item">
                  <span className="label">💉 Vaccine:</span> {currentPet.vaccineStatus}
                </div>
                <div className="pet-info-item">
                  <span className="label">🏷 Sell Type:</span> <span className="highlight">{currentPet.sellType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isDragging && (
          <>
            <div className="swipe-side-button left">
              <button onClick={handleLike}>Like 👍<br/>(👈Swipe left)</button>
            </div>          
            <div className="swipe-side-button right">
              <button onClick={handleDislike}>👎 Dislike<br/>(Swipe right👉)</button>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

/*******************************************************
 * HEADER COMPONENT (MENU)
 *******************************************************/


/*******************************************************
 * FILTER COMPONENTS
 *******************************************************/
const petTypeOptions = ['Dog', 'Cat'];
const dogBreedOptions = [
'Golden Retriever','Poodle','Schnauzer','Maltese','Beagle','Shiba Inu','Labrador Retriever','Husky','Border Collie'
];
const catBreedOptions = [
  'Persian','Siamese','Maine Coon','British Shorthair','Ragdoll','Scottish Fold','Exotic Shorthair','Russian Blue','Sphynx','Japanese Bobtail'
];
const ageOptions = ['Below 1', '1-4', '5-10', 'Above 10'];
const genderOptions = ['Male', 'Female'];
const vaccineOptions = ['Partially Vaccinated', 'Vaccinated', 'Not Vaccinated'];
const sellTypeOptions = ['Adopt', 'Buy'];

const FilterRow = ({
  petType, setPetType,
  breed, setBreed,
  ageRange, setAgeRange,
  gender, setGender,
  vaccineStatus, setVaccineStatus,
  sellType, setSellType,
  filterOpen, setFilterOpen,
  filterRef,
}) => {
  // Only one open => reset all to false, toggle the clicked one
  const toggleDropdown = (filterName) => {
    setFilterOpen((prev) => {
      const newState = {
        petType: false,
        breed: false,
        age: false,
        gender: false,
        vaccine: false,
        sellType: false,
      };
      newState[filterName] = !prev[filterName];
      return newState;
    });
  };

  // If user chose Dog or Cat => relevant breed list
  const breedList = petType === 'Dog'
    ? dogBreedOptions
    : petType === 'Cat'
      ? catBreedOptions
      : [];

  return (
    <div className="filter-row" ref={filterRef}>
      <FilterDropdown
        label="Pet Type"
        value={petType}
        open={filterOpen.petType}
        onToggle={() => toggleDropdown('petType')}
      >
        {/* (None) item to reset */}
        <div
          onClick={() => {
            setPetType('');
            setBreed('');
            toggleDropdown('petType');
          }}
        >
          (None)
        </div>
        {petTypeOptions.map((type) => (
          <div
            key={type}
            onClick={() => {
              setPetType(type);
              setBreed('');
              toggleDropdown('petType');
            }}
          >
            {type}
          </div>
        ))}
      </FilterDropdown>

      {/* BREED if petType is chosen */}
      {petType && (
        <FilterDropdown
          label="Breed"
          value={breed}
          open={filterOpen.breed}
          onToggle={() => toggleDropdown('breed')}
        >
          <div
            onClick={() => {
              setBreed('');
              toggleDropdown('breed');
            }}
          >
            (None)
          </div>
          {breedList.map((b) => (
            <div
              key={b}
              onClick={() => {
                setBreed(b);
                toggleDropdown('breed');
              }}
            >
              {b}
            </div>
          ))}
        </FilterDropdown>
      )}

      <FilterDropdown
        label="Age"
        value={ageRange}
        open={filterOpen.age}
        onToggle={() => toggleDropdown('age')}
      >
        <div
          onClick={() => {
            setAgeRange('');
            toggleDropdown('age');
          }}
        >
          (None)
        </div>
        {ageOptions.map((a) => (
          <div
            key={a}
            onClick={() => {
              setAgeRange(a);
              toggleDropdown('age');
            }}
          >
            {a}
          </div>
        ))}
      </FilterDropdown>

      <FilterDropdown
        label="Gender"
        value={gender}
        open={filterOpen.gender}
        onToggle={() => toggleDropdown('gender')}
      >
        <div
          onClick={() => {
            setGender('');
            toggleDropdown('gender');
          }}
        >
          (None)
        </div>
        {genderOptions.map((g) => (
          <div
            key={g}
            onClick={() => {
              setGender(g);
              toggleDropdown('gender');
            }}
          >
            {g}
          </div>
        ))}
      </FilterDropdown>

      <FilterDropdown
        label="Vaccine"
        value={vaccineStatus}
        open={filterOpen.vaccine}
        onToggle={() => toggleDropdown('vaccine')}
      >
        <div
          onClick={() => {
            setVaccineStatus('');
            toggleDropdown('vaccine');
          }}
        >
          (None)
        </div>
        {vaccineOptions.map((v) => (
          <div
            key={v}
            onClick={() => {
              setVaccineStatus(v);
              toggleDropdown('vaccine');
            }}
          >
            {v}
          </div>
        ))}
      </FilterDropdown>

      <FilterDropdown
        label="Sell Type"
        value={sellType}
        open={filterOpen.sellType}
        onToggle={() => toggleDropdown('sellType')}
      >
        <div
          onClick={() => {
            setSellType('');
            toggleDropdown('sellType');
          }}
        >
          (None)
        </div>
        {sellTypeOptions.map((s) => (
          <div
            key={s}
            onClick={() => {
              setSellType(s);
              toggleDropdown('sellType');
            }}
          >
            {s}
          </div>
        ))}
      </FilterDropdown>
      <button
          className="reset-btn"
          onClick={() => {
            setPetType('');
            setBreed('');
            setAgeRange('');
            setGender('');
            setVaccineStatus('');
            setSellType('');
            setFilterOpen({
              petType: false,
              breed: false,
              age: false,
              gender: false,
              vaccine: false,
              sellType: false,
            });
          }}
        >
          Reset Filters
        </button>
    </div>
  );
};

/*******************************************************
 * FilterDropdown COMPONENT
 * Reusable wrapper for each filter
 *******************************************************/
const FilterDropdown = ({ label, value, open, onToggle, children }) => {
  return (
    <div className="filter-dropdown">
      <button className="filter-btn" onClick={onToggle}>
        <span className="filter-label">{label}:</span>{" "}
        <span className="filter-value">{value || 'Select'}</span>
      </button>
      <div className={`filter-dropdown-content ${open ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Home;

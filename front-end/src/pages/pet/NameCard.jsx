import React from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from "../../context/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import './NameCard.css';
import Header from '../../components/Header';
import petImage from '../../assets/pets/sampleDog.jpg';
import img1 from '../../assets/pets/Example_Gold1_image1.jpg';
import img2 from '../../assets/pets/Example_Gold1_image2.jpg';
import img3 from '../../assets/pets/Example_Gold1_image3.jpg';
import img4 from '../../assets/pets/Example_Gold1_image4.jpg';
import img5 from '../../assets/pets/Example_Gold1_image5.jpg';

const samplePet = [
  {
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 1,
    gender: 'Male',
    sellType: 'Buy',
    vaccineStatus: 'Vaccinated',
    description: 'Meet Buddy, a lively 1-year-old Golden Retriever who brings sunshine to every day. From sunrise to sunset, Buddy’s tail is wagging with excitement! His mornings start with a brisk run around the park, chasing leaves and greeting every passerby with a cheerful bark. Later in the day, you\'ll find him splashing joyfully in the backyard pool or playing endless games of fetch with his favorite tennis ball. In the evenings, he loves curling up by the sofa, watching YouTube Shorts of other dogs, or just getting belly rubs after a long, fun-filled day. Whether he\'s dashing through open fields or striking poses for his daily photo updates, Buddy’s enthusiasm and affection never fail to brighten the mood.',
    hobbies: ['Running', 'Fetching', 'Sleeping'],
    image: petImage,
    posts: [
      { type: 'image', url: img1 },
      { type: 'image', url: img2 },
      { type: 'image', url: img3 },
      { type: 'image', url: img4 },
      { type: 'image', url: img5 },
      { type: 'youtube', url: 'https://www.youtube.com/embed/475EYV2nSPY' }, // Example short
    ],
  },
];
const sampleShop = {
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

const NameCard = () => {
  const { petName } = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const pet = samplePet.find((p) => p.name === petName); // ✅ Now valid
  
  if (!pet) {
    return (
      <>
        <Header />
        <div style={{ padding: '2rem' }}>
          <h2>Pet Name Card Not Created Yet!</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="namecard">
        <h1 className="pet-blog-title">Pet Blog: {pet.name}</h1>

        <div className="media-slider">
          {pet.posts.map((post, index) => {
            if (post.type === 'image') {
              return (
                <div className="media-slide" key={index}>
                  <img src={post.url} alt={`Pet media ${index}`} />
                </div>
              );
            } else if (post.type === 'video') {
              return (
                <div className="media-slide" key={index}>
                  <video controls>
                    <source src={post.url} type="video/mp4" />
                  </video>
                </div>
              );
            } else if (post.type === 'youtube') {
              return (
                <div className="media-slide" key={index}>
                  <iframe
                    src={post.url}
                    title={`YouTube ${index}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                    style={{ width: '100%', height: '100%' }}
                  ></iframe>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="pet-info-section">
          <p><strong>🐾 Breed:</strong> {pet.breed}</p>
          <p><strong>🎂 Age:</strong> {pet.age}</p>
          <p><strong>🚻 Gender:</strong> {pet.gender}</p>
          <p><strong>🛒 Sell Type:</strong> {pet.sellType}</p>
          <p><strong>💉 Vaccine Status:</strong> {pet.vaccineStatus}</p>
          <p><strong>😊 Personality:</strong> Friendly, Energetic</p>

          <div className="description-box">
            <strong>📖 Description:</strong>
            <p>{pet.description}</p>
          </div>

          <p><strong>🎯 Hobbies:</strong> {pet.hobbies.join(', ')}</p>
        </div>

        <div className="button-container">
          <button onClick={() => navigate('/petshop', { state: { shop: sampleShop } })}>
            Visit Pet Shop's Blog Page
          </button>
          <button
            onClick={() => {
              if (!auth?.isLoggedIn) {
                alert("Please login to contact the pet shop.");
                navigate("/account");
              } else {
                navigate("/chatbox");
              }
            }}
          >
            📩 Contact Pet Shop
          </button>
        </div>
      </div>
    </>
  );
};

export default NameCard;

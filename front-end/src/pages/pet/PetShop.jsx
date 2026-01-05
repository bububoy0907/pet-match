import React, { useState } from "react";
import AuthContext from "../../context/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./PetShop.css";
import Header from '../../components/Header';
import shopLogo from '../../assets/shops/pet-shop1-logo.jpg';
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
const PetShop = () => {
  const shop = {
    name: "Golden Tails Pet Shop",
    logo: shopLogo,
    chatUrl: "/chatbox",
    description: `Golden Tails Pet Shop has been serving the Hong Kong community since 2012, providing carefully raised and vaccinated pets from reputable local breeders. 
Located in Mong Kok, we pride ourselves on offering loving companions to responsible families. Our team is passionate about animal welfare and educates new owners on best care practices. 
We also offer grooming and pet nutrition services, and our in-store staff includes certified animal care professionals.`,
    pets: [
      { name: "Buddy", image: pet2 },
      { name: "Whiskers", image: pet1 },
      { name: "Mimi", image: pet3 },
      { name: "Max", image: pet4 },
      { name: "Mochi", image: pet5 },
      { name: "Nala", image: pet6 },
      { name: "Miso", image: pet7 },
      { name: "Neko", image: pet8 },
      { name: "Finn", image: pet9 },
      { name: "Luna", image: pet10 },
      { name: "Ginger", image: pet11 },
      { name: "Charlie", image: pet12 },
      { name: "Toby", image: pet13 },
      { name: "Pepper", image: pet14 },
      { name: "Coco", image: pet15 },
      { name: "Pudding", image: pet16 },
      { name: "KiKi", image: pet17 },
      { name: "Bruh", image: pet18 },
      { name: "Trixie", image: pet19 },
    ],
    comments: [
      {
        user: "jenny.lam",
        text: "Super friendly staff and my cat is adorable! Definitely recommend.",
        stars: 5,
      },
      {
        user: "kevin_ho",
        text: "Clean environment and professional advice, but wait time was a bit long.",
        stars: 4,
      },
      {
        user: "wingchan88",
        text: "Great selection of puppies and a lot of help with grooming tips.",
        stars: 5,
      },
      {
        user: "sylvia.hk",
        text: "Appreciate their ethical sourcing and care for animals.",
        stars: 5,
      },
    ],
  };
  
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ All hooks go here first
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(shop?.comments || []);
  const [showRatingWarning, setShowRatingWarning] = useState(false);
  // ✅ Now you can safely conditionally render
  if (!shop) {
    return (
      <>
        <Header />
        <div className="pet-shop" style={{ padding: "2rem" }}>
          <h2>Pet Shop not found</h2>
        </div>
      </>
    );
  }

  const handleRating = (star) => {
    setRating(star);
  };

  return (
    <>
      <Header />
      <div className="pet-shop">
        <div className="shop-header">
          <div className="shop-title-with-logo">
            <img
              src={shopLogo}
              alt="Pet Shop Logo"
              className="shop-logo"
            />
            <h1>{shop.name}</h1>
          </div>
          <div className="shop-business-info">
              <p>🕒 <strong>Office Hours:</strong> Mon - Sun, 10:00 AM - 8:00 PM</p>
              <p>📍 <strong>Location:</strong> Shop 3A, G/F, Mong Kok Centre, 43 Argyle Street, Kowloon</p>
              <p>📞 <strong>Contact:</strong> +852 2345 6789</p>
            </div>
            <button
              className="contact-btn"
              onClick={() => {
                if (!auth?.isLoggedIn) {
                  alert("Please login to contact the pet shop.");
                  navigate("/account");
                } else {
                  navigate(shop.chatUrl);
                }
              }}
            >
              📩 Contact Pet Shop
            </button>
        </div>
  
        <div className="shop-description-box">
          <p>{shop.description}</p>
        </div>
  
        <h2>Available Pets</h2>
        <div className="pet-grid-scroll">
          {shop.pets.map((pet, index) => (
            <div key={index} className="pet">
              <img
                src={pet.image}
                alt={pet.name}
                onClick={() => navigate(`/pet/${pet.name}`)}
              />
              <p onClick={() => navigate(`/pet/${pet.name}`)}>{pet.name}</p>
            </div>
          ))}
        </div>
  
        <h2>Comments</h2>
        {comments.length > 0 && (
          <p className="overall-rating">
            Overall Rating: {(comments.reduce((sum, c) => sum + c.stars, 0) / comments.length).toFixed(1)} ⭐
          </p>
        )}
        <div className="comments-section">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>
                <strong>{comment.user}:</strong> {comment.text} ⭐ {comment.stars}
              </p>
            </div>
          ))}
  
          <div className="rating-section">
            <p>Rate this shop:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => handleRating(star)}>
                {star <= rating ? "⭐" : "☆"}
              </span>
            ))}
          </div>
  
          {showRatingWarning && (
            <p className="rating-warning">Please select at least 1 star before submitting.</p>
          )}
  
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
          ></textarea>
  
          <button
            onClick={() => {
              if (!auth?.username) {
                alert("You must be logged in to submit a comment.");
                return;
              }
              if (rating === 0) {
                setShowRatingWarning(true);
                return;
              }

              setShowRatingWarning(false);

              if (comment.trim()) {
                setComments([
                  ...comments,
                  {
                    user: auth.username,
                    text: comment,
                    stars: rating,
                  },
                ]);
                setComment("");
                setRating(0);
              }
            }}
          >
            Submit Comment
          </button>
        </div>
      </div>
    </>
  );
};

export default PetShop;

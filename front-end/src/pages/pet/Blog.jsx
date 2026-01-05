import "./Blog.css";
import React from "react";
import { useParams } from "react-router-dom";
//import { samplePet, sampleShop } from "../data"; 
import Header from "../../components/Header";
import petImage from '../../assets/pets/sampleDog.jpg';

const samplePet = [
  {
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'Male',
    description: 'Friendly and energetic.',
    hobbies: ['Running', 'Fetching', 'Swimming'],
    image: petImage,
    posts: [
      { type: 'image', url: petImage, text: "Milo exploring the outdoors!" },
      { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', text: "Milo's swimming adventure!" },
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


const Blog = () => {
  const { petName, postId } = useParams(); 
  const pet = samplePet.find((p) => p.name===petName);

  if (!pet || postId >= pet.posts.length) {
    return <h2>Post not found</h2>; 
  }
  const postData = pet.posts[Number(postId)];
  const petShopName = sampleShop.name;

  return (
    <>
    <Header />
    <div className="blog-page">
      {/* Pet Shop Name */}
      <div className="blog-header">
        <h3>{petShopName}</h3>
      </div>

      {/* Post Media */}
      <div className="post-media">
        {postData.type === "image" && <img src={postData.url} alt="Post" />}
        {postData.type === "video" && <video src={postData.url} controls />}
      </div>

      {/* Like, Comment, Share Icons */}
      <div className="post-icons">
        <span>❤️</span>
        <span>💬</span>
        <span>📤</span>
      </div>

      {/* Post Text */}
      <div className="post-text">
        <p><strong>{petShopName}: </strong>{postData.text}</p>
      </div>
    </div>
    </>
  );
};

export default Blog;
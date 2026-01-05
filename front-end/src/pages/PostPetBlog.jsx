import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PetContext from "../context/pet-context";
import Header from "../components/Header";
import "./PostPetBlog.css"; // 🎨 Separate file

export default function PostPetBlog() {
  const { pets, addBlog } = useContext(PetContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    petName: "",
    breed: "",
    age: "",
    gender: "Male",
    sellType: "Buy",
    vaccineStatus: "Not Vaccinated",
    personality: "",
    description: "",
    hobbies: "",
    media: [],
    mediaInput: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addMedia = () => {
    if (form.mediaInput.trim() !== "") {
      setForm({
        ...form,
        media: [...form.media, form.mediaInput.trim()],
        mediaInput: "",
      });
    }
  };

  const handlePublish = () => {
    const required = [
      "petName",
      "breed",
      "age",
      "gender",
      "sellType",
      "vaccineStatus",
      "personality",
      "description",
      "hobbies",
    ];

    for (let key of required) {
      if (!form[key] || form[key].toString().trim() === "") {
        alert(`Please fill in "${key}"`);
        return;
      }
    }

    if (!form.media.length) {
      alert("Please add at least one image or video.");
      return;
    }

    const linkedPet = pets.find((p) => p.name === form.petName);
    if (!linkedPet) {
      if (!window.confirm("No pet card with that name. Publish anyway?")) return;
    }

    addBlog({ ...form, date: new Date().toISOString() });
    alert("Blog posted!");
    navigate("/petshop");
  };

  return (
    <>
      <Header />
      <div className="post-blog-container">
      <h1 className="page-title">Create Pet Blog Post</h1>

<div className="blog-preview">
  <div className="blog-preview-header">
    <h2>Pet Blog: {form.petName || "[Pet Name]"}</h2>
  </div>

  {/* Media slider preview */}
  <div className="media-slider">
    {form.media.map((url, i) => (
      url.includes("youtube") ? (
        <div className="media-slide" key={i}>
          <iframe src={url} title={`yt-${i}`} frameBorder="0" allowFullScreen></iframe>
        </div>
      ) : (
        <div className="media-slide" key={i}>
          <img src={url} alt={`media-${i}`} />
        </div>
      )
    ))}
    {/* Add Media */}
    <div className="media-slide media-add">
      <label>Add Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setForm({ ...form, media: [...form.media, reader.result] });
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <label>Add video link</label>
      <input
        placeholder="Add video link"
        value={form.mediaInput}
        onChange={(e) => setForm({ ...form, mediaInput: e.target.value })}
        onKeyDown={(e) => e.key === "Enter" && addMedia()}
      />
      <button onClick={addMedia}>Add</button>
    </div>
  </div>

  <div className="pet-info">
    <label>Pet Name</label>
    <input name="petName" value={form.petName} onChange={handleChange} placeholder="Pet Name" />
    <label>Breed</label>
    <input name="breed" value={form.breed} onChange={handleChange} placeholder="Breed" />
    <label>Age</label>
    <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" />
    <label>Gender</label>
<select name="gender" value={form.gender} onChange={handleChange}>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>

<label>Sell Type</label>
<select name="sellType" value={form.sellType} onChange={handleChange}>
  <option value="">Select Sell Type</option>
  <option value="Adopt">Adopt</option>
  <option value="Buy">Buy</option>
</select>

<label>Vaccine Status</label>
<select name="vaccineStatus" value={form.vaccineStatus} onChange={handleChange}>
  <option value="">Select Vaccine Status</option>
  <option value="Vaccinated">Vaccinated</option>
  <option value="Partially Vaccinated">Partially Vaccinated</option>
  <option value="Not Vaccinated">Not Vaccinated</option>
</select>
    <label>Personality</label>
    <textarea name="personality" value={form.personality} onChange={handleChange} placeholder="Personality" />
    <label>Description</label>
    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
    <label>Hobbies</label>
    <textarea name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="Hobbies" />
  </div>
</div>

<button className="publish-btn" onClick={handlePublish}>📤 Publish Blog Post</button>

      </div>
    </>
  );
}

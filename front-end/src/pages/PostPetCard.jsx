import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PetContext from "../context/pet-context";
import Header from "../components/Header";
import "./PostPetCard.css";               // ← NEW css just for this page

export default function PostPetCard() {
  const { addPet } = useContext(PetContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "Male",
    vaccineStatus: "Not Vaccinated",
    sellType: "Buy",
    species: "Dog",
    image: null,
  });

  /* — handlers — */
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const pickImg = (e) => setForm({ ...form, image: e.target.files[0] });

  const publish = () => {
    if (!form.image) return alert("Please choose an image.");
    if (!window.confirm("Publish this pet card?")) return;

    const imgURL = URL.createObjectURL(form.image);
    addPet({ ...form, image: imgURL, age: Number(form.age) });
    navigate("/");
  };

  const imgPreview = form.image && URL.createObjectURL(form.image);

  /* — UI — */
  return (
    <>
      <Header />
      <div className="post-card-page">
        <h2>Post Pet Card</h2>

        <div className="pet-card-upload">
          {/* image / placeholder */}
          <label className="card-image-drop">
            {imgPreview ? (
              <img src={imgPreview} alt="preview" />
            ) : (
              <span className="img-placeholder">Click to upload image</span>
            )}
            <input type="file" accept="image/*" hidden onChange={pickImg} />
          </label>

          {/* overlay with inputs */}
          <div className="card-info-overlay">
            <input
              className="big-input"
              name="name"
              placeholder="Pet Name"
              value={form.name}
              onChange={change}
              required
            />

            <div className="info-grid">
              <input
                name="breed"
                placeholder="Breed"
                value={form.breed}
                onChange={change}
                required
              />
              <input
                name="age"
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={change}
                required
              />
              <select name="gender" value={form.gender} onChange={change}>
                <option>Male</option>
                <option>Female</option>
              </select>
              <select
                name="vaccineStatus"
                value={form.vaccineStatus}
                onChange={change}
              >
                <option>Vaccinated</option>
                <option>Partially Vaccinated</option>
                <option>Not Vaccinated</option>
              </select>
              <select name="sellType" value={form.sellType} onChange={change}>
                <option>Buy</option>
                <option>Adopt</option>
              </select>
              <select name="species" value={form.species} onChange={change}>
                <option>Dog</option>
                <option>Cat</option>
              </select>
            </div>
          </div>
        </div>

        <button className="publish-btn" onClick={publish}>
          Upload Card
        </button>
      </div>
    </>
  );
}

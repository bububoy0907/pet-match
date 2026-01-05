const router = require('express').Router();
const Pet = require('../models/Pets');
const verifyToken = require('../middlewares/verifyToken');

// Get all pets
router.get('/', async (req, res) => {
  const pets = await Pet.find().populate('petShop', 'username');
  res.json(pets);
});

// Add new pet
router.post('/', verifyToken, async (req, res) => {
  const pet = new Pet({ ...req.body, petShop: req.userId });
  await pet.save();
  res.status(201).json(pet);
});

module.exports = router;

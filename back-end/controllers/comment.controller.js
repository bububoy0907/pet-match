router.get('/petshops/:id', async (req, res) => {
    try {
      const petShop = await User.findById(req.params.id);
      const pets = await Pet.find({ petShop: req.params.id });
      const comments = await Comment.find({ petShop: req.params.id });
      res.json({ petShop, pets, comments });
    } catch (err) {
      res.status(500).json({ message: 'Shop not found' });
    }
  });
  
  router.get('/pets/:id', async (req, res) => {
    try {
      const pet = await Pet.findById(req.params.id)
        .populate('petShop')
        .populate('blogPost');
      res.json(pet);
    } catch (err) {
      res.status(500).json({ message: 'Pet not found' });
    }
  });
  
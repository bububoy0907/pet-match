const mongoose = require('mongoose');
const User = require('./models/User');
const Pet = require('./models/Pets');
const BlogPost = require('./models/BlogPost');
const Comment = require('./models/Comments');
const Message = require('./models/Message');
const bcrypt = require('bcrypt');

const runSeeder = async () => {
  try {
    console.log('🌱 Seeding database...');
    await User.deleteMany({});
    await Pet.deleteMany({});
    await BlogPost.deleteMany({});
    await Comment.deleteMany({});
    await Message.deleteMany({});
    const hashedPassword = await bcrypt.hash('12345678', 10);

    const petShop = await User.create({
      username: 'happyPets',
      password: hashedPassword,
      email: 'shop@happypets.com',
      accountType: 'business',
      bio: 'We sell happy dogs!'
    });

    const user = await User.create({
      username: 'johnDoe',
      password: hashedPassword,
      email: 'john@gmail.com',
      dateOfBirth: '1990-01-01',
      accountType: 'customer'
    });

    const pet = await Pet.create({
      name: 'Buddy',
      age: 3,
      gender: 'Male',
      vaccineStatus: 'Vaccinated',
      sellType: 'Adopt',
      sellingStatus: 'Currently Selling',
      species: 'Dog',
      breed: 'Golden Retriever',
      petShop: petShop._id
    });

    const blogPost = await BlogPost.create({
      petShop: petShop._id,
      pet: pet._id,
      title: 'Meet Buddy!',
      content: 'Buddy is a healthy dog looking for a loving home.',
      images: ['https://example.com/buddy.jpg']
    });

    pet.blogPost = blogPost._id;
    await pet.save();

    await Comment.create({
      user: user._id,
      petShop: petShop._id,
      rating: 5,
      content: 'Great service!'
    });

    await Message.create({
      sender: user._id,
      receiver: petShop._id,
      content: 'Is Buddy still available?'
    });

    console.log('✅ Seed complete!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
  }
};

// ✅ Export the seeding function
module.exports = runSeeder;

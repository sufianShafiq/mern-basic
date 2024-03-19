// Importing necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Initializing Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const uri = 'mongodb+srv://sufianshafique:gatA5QQ6kMWRCde3@cluster0.vwhhttn.mongodb.net/?retryWrites=true&w=majority';

// Connecting to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// model
const itemSchema = new mongoose.Schema({
name: String,
price: Number
});

const Item = mongoose.model('items', itemSchema);

// Routes
app.get('/', async (req, res) => {
    try {
      const items = await Item.find({});
      console.log(items); // Add this line to print the items to the console
      res.json(items);
    } catch (err) {
      console.error(err); // Add this line to print the error to the console
      res.status(500).json({ message: err.message });
    }
});

// Get by ID endpoint
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: 'Cannot find item' });
    }
    res.json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Insert endpoint
app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update endpoint
app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete endpoint
app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const Data = require('../models/Data');

let addCounter = 0;
let updateCounter = 0;

exports.getAllData = async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addData = async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const newData = new Data({ name, age, email });
    await newData.save();
    
    addCounter++; // Increment the addCounter when addData is called
    
    res.status(201).json({ message: 'Data added successfully', addCount: addCounter });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email } = req.body;
    const updatedAt = new Date(); // Update the updatedAt field
    
    await Data.findByIdAndUpdate(id, { name, age, email, updatedAt });

    updateCounter++; // Increment the updateCounter when updateData is called
    
    res.json({ message: 'Data updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCount = async (req, res) => {
  try {
    const addCount = addCounter;
    const updateCount = updateCounter;
    
    res.json({ addCount, updateCount });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

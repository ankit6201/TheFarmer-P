const Field = require('../models/Field');

// get All Fields For Loged-in User
// access  Private

exports.getFields = async (req,res)=>{
    const fields = await Field.find({user:req.user.id});
    res.status(200).json(fields);
}

exports.createField = async (req, res) => {
  const { name, area, location } = req.body;

  if (!name || !area) {
    return res.status(400).json({ message: 'Please add all required fields' });
  }

  const field = await Field.create({
    name,
    area,
    location,
    user: req.user.id,
  });

  res.status(201).json(field);
};


// Update Field
// Route PUT / api/fields/:id
//  access  Private

exports.updateField = async(req,res)=>{
   try {
     const field = await Field.findById(req.params.id)
 
     if (!field) {
        return res.status(404).json({message:"Field Not Found"})
     }
     // Make Sure User Owns the fields 
      if (field.user.toString() !==req.user.id) {
         res.status(401).json({
             message:"User Not Authorized"
         })
      }
      const { name, area, location } = req.body;
 
   if (name) field.name = name;
   if (area) field.area = area;
   if (location) field.location = location;
 
   const updatedField = await field.save();
      res.status(200).json(updatedField);
   } catch (error) {
      res.status(500).json({error:error.message})
   }
}

// @desc    Delete field
// @route   DELETE /api/fields/:id
// @access  Private

exports.deleteField = async (req,res)=>{
    try {
        const field = await Field.findById(req.params.id)
    
        if (!field) {
            return res.status(404).json({message:'Field is Not Found'})
        }
    
        if (field.user.toString !== req.user.id) {
            res.status(401).json({message:"User not authorized"});
        }
        await field.deleteOne()
    
        res.status(200).json({message:"Field Remove"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
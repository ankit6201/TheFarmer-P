const Crop = require('../models/Crop');

// @desc  Get all crops for logged-in user \
// @route Get  api/crops
// @access private

exports.getCrops = async (req,res)=>{
    const crops =  await Crop.find({user:req.user.id}).populate('field');
    res.status(200).json(crops);
}

// @desc    Create new crop
// @route   POST /api/crops
// @access  Private

exports.createCrop = async (req, res) => {
  const { name, variety, sowingDate, harvestDate, field } = req.body;

  if (!name || !field) {
    return res.status(400).json({ message: 'Please add crop name and field' });
  }

  const crop = await Crop.create({
    name,
    variety,
    sowingDate,
    harvestDate,
    field,
    user: req.user.id,
  });

  res.status(201).json(crop);
};



// @desc    Update crop part
// @route   PUT /api/crops/:id 
// @access  Private

exports.updateCrop = async (req,res)=>{
    try {
        const crop = await Crop.findById(req.params.id);
       
        if (!crop) {
            res.status(404).json({message:"Crop Not Found"})
        }
        
        if (crop.user.toString() !== req.user.id) {
            res.status(400).json({message:"You are Not Authorized"});
        }
        crop.set(req.body)
        const updatedCrop = await crop.save()
        res.status(200).json(updatedCrop)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

// @desc    Delete crop
// @route   DELETE /api/crops/:id
// @access  Private

exports.deleteCrop = async (req,res)=>{
    const crop = Crop.findById(req.params.id)

    if (!crop) {
        res.status(201).json({message:" Crop  Not Found"})
    }

    if (crop.user.toString() !== req.user.id) {
        res.status(404).json({message:"user not Authorized"})
    }

    await crop.deleteOne()

    res.status(200).json({
        message:"Crop Deleted"
    })
}


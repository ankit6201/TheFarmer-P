const Task = require('../models/Task')

// @desc   Get all tasks for logged-in user
// @route   GET /api/tasks
// @access  Private
exports.getTask = async(req,res)=>{
    try {
        const tasks = await Task.find({user:req.user.id})
        .populate('field')
        .populate('crop');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

// @desc Create new task
// @route  POST /api/tasks
// @access Private

exports.createTask = async(req,res)=>{
    const {title,description,date,status,field,crop} = req.body;

     if (!title || !date || !field) {
        return res.status(400).json({message:"Please add Title, Date, and Field"})
     }
      const task = await Task.create({
        title,
        description,
        date,
        status,
        field,
        crop,
        user:req.user.id,
      });

      res.
status(200).json({task})
}

// @desc Udate task
// route PUT /api/tasks/:id
// access Private

exports.updateTask = async(req,res)=>{
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            message:"not found the this Task"
        })
    }

    if (task.user.toString()!== req.user.id) {
       return res.status(401).json({
            message:"User Not Authorized"
        })
    }

    task.set(req.body)
    const updatedTask = await task.save();
    res.status(200).json(updatedTask)
}

// @desc Delete Task 
// @route delete api/tasks/:id
// @access private

exports.deleteTask = async (req,res)=>{
  const task = await Task.findById(req.params.id)
  if (!task) {
   return res.status(404).json({
        message:"This Task is Not Available"
    })
  }
  if (task.user.toString() !== req.user.id) {
        return res.status(401).json({message:"user Not authorized"})
    }
    await task.deleteOne();

    res.status(200).json({message:"Task Removed"})
}
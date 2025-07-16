const express = require('express')

const router =  express.Router()
const {getCrops,createCrop,updateCrop,deleteCrop} = require('../controllers/cropController')

const {protect} =require('../middleware/authMiddleware')

router.route('/')
.get(protect,getCrops)
.post(protect,createCrop);

router.route('/:id')
.put(protect,updateCrop)
.delete(protect,deleteCrop)

module.exports = router;
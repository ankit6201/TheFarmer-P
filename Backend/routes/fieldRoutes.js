const express = require('express')
const router = express.Router();
const {
     getFields,
     createField,
     updateField,
     deleteField
    } = require('../controllers/fieldController')

    const {protect} =  require('../middleware/authMiddleware')

    router.route('/')
    .get(protect,getFields)
    .post(protect,createField);

    router.route('/:id')
    .put(protect,updateField)
    .delete(protect,deleteField);

    module.exports = router;


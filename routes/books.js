const express = require('express');
const router = express.Router();
const controllers = require('../controllers/books');

router.get('/', controllers.findAll);
router.get('/:id', controllers.findById);
router.post('/', controllers.add);
router.put('/:id', controllers.edit);
router.delete('/:id', controllers.delete);

module.exports = router;

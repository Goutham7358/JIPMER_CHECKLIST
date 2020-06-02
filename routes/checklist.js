const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklist');

router.get('/', checklistController.getChecklist);
router.post('/', checklistController.postChecklist);
router.get('/add-point',checklistController.getAddPoint);
router.post('/add-point', checklistController.postAddPoint);

module.exports = router;
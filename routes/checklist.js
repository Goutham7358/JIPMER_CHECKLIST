const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklist');
const settingsController = require('../controllers/settings');

router.get('/', checklistController.getChecklist);
router.post('/', checklistController.postChecklist);
router.get('/add-point',checklistController.getAddPoint);
router.post('/add-point', checklistController.postAddPoint);
router.get('/settings', settingsController.getSettings);
router.post('/settings-delete', settingsController.deleteItem);

module.exports = router;
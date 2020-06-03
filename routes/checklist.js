const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklist');
const settingsController = require('../controllers/settings');

router.get('/', checklistController.getChecklist);
router.post('/', checklistController.postChecklist);
router.get('/add-point',checklistController.getAddPoint);
router.post('/add-point', checklistController.postAddPoint);
router.get('/settings', settingsController.getSettings);
router.post('/settings-edit', settingsController.postEditPoint);
router.get('/settings-edit/:editItem', settingsController.getEditPoint);
router.post('/settings-delete', settingsController.deleteItem);
router.post('/settings-move', settingsController.moveHandler);
router.get('/download');

module.exports = router;
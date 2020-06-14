const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklist');
const settingsController = require('../controllers/settings');
const isAuth = require('../middleware/isAuth');

router.get('/', checklistController.getChecklist);
router.post('/', checklistController.postChecklist);
router.get('/add-point', isAuth,checklistController.getAddPoint);
router.post('/add-point', isAuth, checklistController.postAddPoint);
router.get('/settings', isAuth, settingsController.getSettings);
router.post('/settings-edit', isAuth, settingsController.postEditPoint);
router.get('/settings-edit/:editItem', isAuth, settingsController.getEditPoint);
router.post('/settings-delete', isAuth, settingsController.deleteItem);
router.post('/settings-move',  isAuth, settingsController.moveHandler);
router.get('/download');

module.exports = router;
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index.js');

router.get('/users',        controllers['users.all'].GET);
router.get('/users/view',   controllers['users.view'].GET);
router.post('/users',       controllers['users.create'].POST);
router.get('/users/:id',    controllers['users.byId'].GET);
router.put('/users/:id',    controllers['users.update'].PUT);
router.delete('/users/:id', controllers['users.delete'].DELETE);

module.exports = router;
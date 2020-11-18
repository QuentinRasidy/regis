/*****ATTENTION: dans ce fichier l'ordre à une importance (lecture ce fait du haut vers le bas)*/
const path = require('path');

const express = require('express');

const regisController = require('../controllers/camera');

const router = express.Router();

router.get('/', regisController.getIndex);
router.get('/scenario', regisController.getScenario);

// router.get('/products', regisController.getProducts);

router.get('/zoom/:ip', regisController.zoom); //route dynamique en fonction de l'id
router.get('/dezoom/:ip', regisController.dezoom);
router.post('/zoomExtremum', regisController.zoomExtremum);
router.get('/left/:ip', regisController.left);
router.get('/right/:ip', regisController.right);
router.get('/up/:ip', regisController.up);
router.get('/down/:ip', regisController.down);
router.get('/center/:ip', regisController.center);
router.post('/preset', regisController.setPreset);
router.post('/savePreset', regisController.savePreset);
router.post('/setMainVideoSource', regisController.setMainVideoSource);
router.post('/setShareSource', regisController.setShareSource);
router.get('/stopShare', regisController.stopSharing);
router.post('/setInOut', regisController.setInOutKrammer);
router.post('/saveConfig', regisController.saveConfig);
router.post('/startScenario', regisController.startScenario);


// router.get('/cart', regisController.getCart);

// router.post('/cart-delete-item', regisController.postCartDelete);

// router.post('/cart', regisController.postCart);

// router.get('/orders', regisController.getOrders);

// router.get('/checkout', regisController.getCheckout);

module.exports = router;

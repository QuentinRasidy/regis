const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/copy-product', adminController.copyProduct);

router.post('/delete-product', adminController.postDeleteProduct);

router.post('/addDemo', adminController.addDemo);

router.post('/delete-demo', adminController.deleteDemo);

router.post('/change-name-demo', adminController.changeNameDemo);

router.post('/move-to-demo', adminController.moveToDemo);

router.post('/change-order-scene-of-demo', adminController.changeOrderOfScene);

router.get('/setting', adminController.getRegisSetting);

module.exports = router;

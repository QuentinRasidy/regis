const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
//router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
//router.get('/products', adminController.getProducts);

// /admin/add-product => POST
//router.post('/add-product', adminController.postAddProduct);

// /admin/edit-product/(id produit) => GET
router.get('/edit-product/:productId', adminController.getEditProduct); // ne pas oublier le ?edit=true dans l'url du navigateur (mis dans la vue product)

router.post('/edit-product', adminController.postEditProduct);

router.post('/copy-product', adminController.copyProduct);

router.post('/delete-product', adminController.postDeleteProduct);

router.post('/addDemo', adminController.addDemo);

router.post('/delete-demo', adminController.deleteDemo);

router.post('/change-name-demo', adminController.changeNameDemo);

router.post('/move-to-demo', adminController.moveToDemo);

router.post('/change-order-scene-of-demo', adminController.changeOrderOfScene);

module.exports = router;

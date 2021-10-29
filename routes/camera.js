/*****ATTENTION: dans ce fichier l'ordre à une importance (lecture ce fait du haut vers le bas)*/
const path = require('path');

const express = require('express');

const regisController = require('../controllers/camera');

const bodyParser = require('body-parser')

const jsonParser = bodyParser.json() //a utiliser en cas de requete POST avec de la data JSON coté client

const router = express.Router();

router.get('/', regisController.getDemo);
router.get('/scenario', regisController.getScenario);
router.get('/advanced', regisController.getAdvanced);
router.post('/updateCamera', regisController.updateCamera);
router.post('/updateCodecInfo', regisController.updateCodecInfo);
router.get('/zoom/:ip', regisController.zoom); //route dynamique en fonction de l'id
router.get('/dezoom/:ip', regisController.dezoom);
router.get('/stopZoom/:ip', regisController.stopZoom);
router.post('/zoomExtremum', regisController.zoomExtremum);
router.get('/left/:ip', regisController.left);
router.get('/right/:ip', regisController.right);
router.get('/stopPanTilt/:ip', regisController.stopPanTilt);
router.get('/up/:ip', regisController.up);
router.get('/down/:ip', regisController.down);
router.get('/center/:ip', regisController.center);
router.post('/preset', regisController.setPreset);
router.post('/savePreset', regisController.savePreset);
router.post('/setMainVideoSource', regisController.setMainVideoSource);
router.post('/setShareSource', regisController.setShareSource);
router.get('/stopShare', regisController.stopSharing);
router.post('/setInOut', regisController.setInOutKrammer);
router.post('/saveConfig', jsonParser, regisController.saveConfig);
router.post('/startScenario', regisController.startScenario);
router.get('/endDemo', regisController.endDemo);
router.post('/call', regisController.call);
router.post('/endCall', regisController.endCall);
router.post('/demo/:id', regisController.getDemoById);
router.post('/get-sort-demo', regisController.getSortDemo);

module.exports = router;

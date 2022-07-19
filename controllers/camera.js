const request = require('request');

const xml2js = require('xml2js');
const parser = new xml2js.Parser({
  attrkey: "ATTR"
});
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/regis', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
);
mongoose.Promise = global.Promise;

const Save = require('../models/save');
const Demo = require('../models/demo');
const Camera = require("../models/camera");
const HdmiMatrix = require("../models/matrix");
const Codec = require("../models/codec");

const appStatus = require('../util/app-status');


/** DEFAULT CODEC INFORMATION */
let codecInfo = {
  ip: "10.1.110.113",
  name: "Kandinsky-Spycam-SX80",
  inputLabels: []
};

Codec.findOne({}, (err, codecDetails) => {
  codecInfo.ip = codecDetails.ip,
  codecInfo.name = codecDetails.name,
  codecInfo.inputLabels = codecDetails.inputLabels
})

exports.zoom = (req, res, next) => {
  console.log("startStop");
  const ip = req.params.ip;
  var options = {
    'method': 'GET',
    'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23Z80&res=1',
    'headers': {}
  };
  request(options, function (error, response) {
    if (error) {
      console.error(error);
      res.status(500).send({
        message: `Cannot request the camera with this ip: ${ip}`
      });
    } else {
      res.json({
        code: "204"
      });
    }
  });
}

exports.dezoom = async (req, res, next) => {
  const ip = req.params.ip;
  var options = {
    'method': 'GET',
    'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23Z20&res=1',
    'headers': {}
  };
  request(options, function (error, response) {
    if (error) {
      console.error(error);
      res.status(500).send({
        message: `Cannot request the camera with the ip: ${ip}`
      });
    } else {
      res.json({
        code: "204"
      });
    }
  });
}

exports.stopZoom = (req, res, next) => {
  console.log("zoomStop");
  const ip = req.params.ip;
  var options = {
    'method': 'GET',
    'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23Z50&res=1',
    'headers': {}
  };
  request(options, function (error, response) {
    if (error) {
      console.error(error);
      res.status(500).send({
        message: `Cannot request the camera with this ip: ${ip}`
      });
    } else {
      res.json({
        code: "204"
      });
    }
  });
}

exports.zoomExtremum = async (req, res, next) => {
  var ip = req.body.ip;
  var extremum = req.body.extremum;
  var value = "";
  if (extremum == "max") {
    value = "FFF";
  } else if (extremum == "min") {
    value = "555";
  }
  var options = {
    'method': 'GET',
    'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23AXZ' + value + '&res=1',
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  request(options, function (error, response) {
    if (error) {
      console.error(error);
      res.status(500).send({
        message: `Cannot request the camera with this ip: ${ip}`
      });
    } else {
      res.json({
        code: "204"
      });
    }
  });


}

exports.left = async (req, res, next) => {
  const ip = req.params.ip;
  var options = {
    'method': 'GET',
    'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23PTS2050&res=1',
    'headers': {}
  };
  request(options, function (error, response) {
    if (error) {
      console.error(error);
      res.status(500).send({
        message: `Cannot request the camera with the ip: ${ip}`
      });
    } else {
      res.json({
        code: "204"
      });
    }
  });
}

exports.right = async (req, res, next) => {
  const ip = req.params.ip;
  var options = {
    'method': 'GET',
    'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23PTS8050&res=1',
    'headers': {}
  };
  request(options, function (error, response) {
    if (error) {
      console.error(error);
      res.status(500).send({
        message: `Cannot request the camera with the ip: ${ip}`
      });
    } else {
      res.json({
        code: "204"
      });
    }
  });
}

exports.stopPanTilt = async (req, res, next) => {
  const ip = req.params.ip;
  var options = {
    'method': 'GET',
    'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23PTS5050&res=1',
    'headers': {}
  };
  request(options, function (error, response) {
    if (error) {
      console.error(error);
      res.status(500).send({
        message: `Cannot request the camera with the ip: ${ip}`
      });
    } else {
      res.json({
        code: "204"
      });
    }
  });
}

exports.up = async (req, res, next) => {
  const ip = req.params.ip;
  var options = {
    'method': 'GET',
    'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23PTS5080&res=1',
    'headers': {}
  };
  request(options, function (error, response) {
    if (error) {
      console.error(error);
      res.status(500).send({
        message: `Cannot request the camera with the ip: ${ip}`
      });
    } else {
      res.json({
        code: "204"
      });
    }
  });
}

exports.down = async (req, res, next) => {
  const ip = req.params.ip;
  var options = {
    'method': 'GET',
    'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23PTS5020&res=1',
    'headers': {}
  };
  request(options, function (error, response) {
    if (error) {
      console.error(error);
      res.status(500).send({
        message: `Cannot request the camera with the ip: ${ip}`
      });
    } else {
      res.json({
        code: "204"
      });
    }
  });
}

exports.center = (req, res, next) => {
  const ip = req.params.ip;
  var options = {
    'method': 'GET',
    'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23APC80008000&res=1',
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };
  request(options, function (error, response) {
    if (error) {
      console.error(error);
      res.status(500).send({
        message: `Cannot request the camera with the ip: ${ip}`
      });
    } else {
      res.json({
        code: "204"
      });
    }
  });
}

exports.getAdvanced = (req, res, next) => {
  const demoName = (req.query.demoName != undefined) ? req.query.demoName : "";
  Camera.find({}, (err, cameras) => {
    HdmiMatrix.findOne({}, (err, hdmiMatrixInfo) => {
      getKrammerConfig().then(async config => {
        res.render('regis/advanced', {
          appStatus: appStatus.getStatus(),
          cameras: cameras,
          pageTitle: 'Regis',
          hdmiMatrixInfo: hdmiMatrixInfo,
          krammerConfig: config,
          codecInfo: codecInfo,
          sx80Config: await getMainVideoSourceAndshareSource(codecInfo.ip),
          demoList: await getAllDemo(),
          demoName: demoName,
          path: '/'
        });
      })
    });
  });
};

exports.updateCamera = (req, res, next) => {
  const oldCameraIp = req.body.cameraOldIp;
  const newCameraIp = req.body.cameraIp;
  const newCameraName = req.body.cameraName;
  const newCameraDescription = req.body.cameraDescription;

  var obj = {
    ip: newCameraIp,
    description: newCameraDescription,
    name: newCameraName
  }

  Camera.findOneAndUpdate({
      ip: oldCameraIp
    }, obj, {
      useFindAndModify: false
    },
    function (err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log("Camera updated!");
        Save.update({
          'position.ip': oldCameraIp
        }, {
          'position.$.ip': newCameraIp
        }, function (e, r) {
          if (e) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.redirect(req.get('referer'));
          }
        });

      }
    });
};

exports.updateCodecInfo = (req, res, next) => {
  const codecIp = req.body.codecIp;
  const codecName = req.body.codecName;
  const codecInputs = [req.body.labelInput1, req.body.labelInput2, req.body.labelInput3, req.body.labelInput4].map((label, index) => ({
    "number": index + 1,
    "name": label
  }));

  codecInfo.ip = codecIp;
  codecInfo.name = codecName;
  codecInfo.inputLabels = codecInputs;

  Codec.findOneAndUpdate({}, {
    $set: {
      name: codecName,
      ip: codecIp,
      inputLabels: codecInputs
    }
  }, {
    useFindAndModify: false
  }).then(res.redirect(req.get('referer')));

};

exports.updateMatrixInfo = (req, res, next) => {
  const newValues = JSON.parse(req.body.changedValues);

  const inputsLabel = newValues.inputs;
  const outputsLabel = newValues.outputs;


  HdmiMatrix.findOneAndUpdate({}, {
    $set: {
      inputs: inputsLabel,
      outputs: outputsLabel
    }
  }, {
    useFindAndModify: false
  }).then(res.redirect(req.get('referer')));

};

exports.getScenario = (req, res, next) => {
  getSaves().then(save => {
    res.render('regis/scenario', {
      appStatus: appStatus.getStatus(),
      saves: save,
      pageTitle: 'Scene',
      path: '/scenario'
    });
  });
};

exports.getDemo = (req, res, next) => {
  getAllDemo().then(demoDocs => {
    res.render('regis/demo', {
      appStatus: appStatus.getStatus(),
      demoList: demoDocs,
      pageTitle: 'demo',
      path: '/demo'
    });
  });
};

exports.getDemoById = async (req, res, next) => {
  const demoId = req.params.id;
  const edit = (req.query.edit === "true") ? true : false;
  const demo = await Demo.findById(demoId);
  if (!demo) {
    return res.redirect('/');
  }
  const ids = demo.scene;
  const demoName = demo.name;
  Save.find().where('_id').in(ids).exec(async (err, records) => {
    var list = await sortListWithIds(records, ids);
    var allDemo = await getAllDemo();
    res.render('regis/scene-of-demo', {
      appStatus: appStatus.getStatus(),
      saves: list,
      pageTitle: 'Scene',
      path: '/scene-of-demo',
      demoId: demoId,
      demoName: demoName,
      demoList: allDemo,
      edit: edit
    });
  });
};

exports.getSortDemo = async (req, res, next) => {
  const demoId = req.body.demoId;
  const demo = await Demo.findById(demoId);
  if (!demo) {
    return res.redirect('/');
  }
  const ids = demo.scene;
  const demoName = demo.name;
  Save.find().where('_id').in(ids.reverse()).exec(async (err, records) => {
    //mongoose ne renvoi pas les documents dans le meme ordre que ma list de ids
    var list = await sortListWithIds(records, ids);
    res.render('regis/sort-demo', {
      appStatus: appStatus.getStatus(),
      scenes: list,
      pageTitle: 'Sort Scene',
      path: '/sort-demo',
      demoId: demoId,
      demoName: demoName,
      listIdScene: ids
    });
  });
};

exports.setPreset = (req, res, next) => {
  var presetNumber = req.body.preset;
  const ip = req.body.ip;
  setPreset(ip, presetNumber, res);
};

exports.savePreset = (req, res, next) => {
  var presetNumber = req.body.preset;
  const ip = req.body.ip;
  savePreset(ip, presetNumber, res);
};

exports.setMainVideoSource = async (req, res, next) => {
  var source = req.body.mainVideoSource;
  disableAllTally();
  await sleep(500);
  setMainVideoSource(source, codecInfo.ip, res);
}

exports.setShareSource = (req, res, next) => {
  var source = req.body.shareSource;
  var xml =
    "<Command>" +
    "<Presentation>" +
    "<Start>" +
    "<ConnectorId>" + source + "</ConnectorId>" +
    "</Start>" +
    "</Presentation>" +
    "</Command>";

  var options = {
    method: "POST",
    url: "https://" + codecInfo.ip + "/putxml",
    headers: {
      "Content-Type": "text/xml",
      Authorization: "Basic cHJlc2VuY2U6QzFzYzAxMjM="
    },
    body: xml
  };
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; //permet de contourner l'erreur "error self signed certificate"

  request(options, function (error, response, body) {
    if (error) {
      console.log(`ERROR WHEN TRYING TO SET SHARE SOURCE ON DEVICE (${ip}) (see details below)`);
      console.error(error);
      res.send("ko");
    } else {
      res.send("ok");
    }
  });
}

exports.stopSharing = (req, res, next) => {
  stopSharing(codecInfo.ip);
}

exports.setInOutKrammer = (req, res, next) => {
  const output = req.body.output;
  const input = req.body.input;
  setInOut(input, output);
}

exports.saveConfig = async (req, res, next) => {
  const {
    mainVideoSource,
    shareSelection,
    allOutInput,
    configName,
    demoId
  } = req.body;

  getConfigOfAllCam().then((value) => {
    value.forEach(e => console.log(e));
    var save = new Save({
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: configName,
      position: value,
      mainVideoSource: mainVideoSource,
      shareSelection: shareSelection,
      allInputOutput: allOutInput,
      subName: configName + demoId //to avoid duplicate key of scene name into a demo
    });
    Demo.findById(demoId, function (err, demo) {
      if (!demo) { // si lié a aucune demo alors on créer une Demo par défaut
        const date = new Date();
        const currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        var defaultDemo = new Demo({
          name: currentDate,
          scene: [save._id]
        });
        defaultDemo.save(function (err, save) {
          if (err) {
            return console.error(err);
          }
        });
      } else {
        demo.scene.push(save._id);
        demo.save(function (err, save) {
          if (err) return console.error(err);
        });
      }
    });

    save.save(function (err, save) {
      if (err) {
        res.status(401).end('Duplicate Scene Name !');
        return console.error(err);
      }
      console.log(save.name + " saved to REGIS db.");
      res.sendStatus(201);
    });
  }).catch(error => {
    res.status(401).end(`The save has failed\nDetail: ${error.message}`);
  });
}

exports.startScenario = (req, res, next) => {
  const saveId = req.body.saveId;
  Save.findById(saveId, async function (err, save) {
    if (!save) {
      return res.redirect('/');
    }
    const {
      position,
      name,
      mainVideoSource,
      shareSelection,
      allInputOutput
    } = save;

    var promises = [];

    promises.push(setAllInOut(allInputOutput));

    if (shareSelection != "") {
      promises.push(setShareSource(shareSelection, codecInfo.ip));
    } else {
      promises.push(stopSharing(codecInfo.ip, res));
    }

    disableAllTally();
    await sleep(1000);

    promises.push(setMainVideoSource(mainVideoSource, codecInfo.ip));

    //Si GRILLE HDMI ALORS ON NE SET PAS LES CAMERAS
    position.forEach(cam => {
      promises.push(setZoom(cam.ip, cam.zoom));
      promises.push(setPanTiltValue(cam.ip, cam.panTilt.pan, cam.panTilt.tilt));
    });

    Promise.all(promises).then(values => {
      appStatus.setStatus(true);
      res.sendStatus(200);
    }).catch(function (err) {
      console.error(err);
      res.status(500).end(`Something went wrong when trying to load scene... \nDetail: ${err.message}`);
    });

  });
}

exports.endDemo = (req, res, next) => {
  stopSharing(codecInfo.ip);
  disableAllTally();
  appStatus.setStatus(false);
  res.redirect('/');
}

exports.call = (req, res, next) => {
  const webexNumber = req.body.webexNumber;
  console.log(webexNumber);
  callWebexNumber(webexNumber, codecInfo.ip);
  res.status(204).send();
}

exports.endCall = (req, res, next) => {
  console.log("end call");
  disconnectCall(codecInfo.ip);
  res.status(204).send();
}

/************************** FUNCTION **********************************/


function getZoom(ip) {
  return new Promise((resolve, reject) => {
    var options = {
      'method': 'GET',
      'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23AXZ&res=1',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    request(options, function (error, response) {
      if (error) {
        console.log(`ERROR WHEN TRYING TO GET ZOOM INFO ON CAMERA (${ip}) (see details below)`);
        //throw new Error(error);
        reject(error);
      } else {
        console.log(response.body.substr(3))
        resolve(response.body.substr(3));
      }
    });
  });
}

function setZoom(ip, value, res = undefined) {
  return new Promise((resolve, reject) => {
    var options = {
      'method': 'GET',
      'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23AXZ' + value + '&res=1',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    request(options, function (error, response) {
      if (error) {
        console.log(`ERROR WHEN TRYING TO SET ZOOM ON CAMERA (${ip}) (see details below)`);
        reject(error);
      } else {
        resolve('ok');
        console.log('reponse zoom: ' + response.body);
      }
    });
  });

}

function getPanTiltValue(ip) {
  return new Promise((resolve, reject) => {
    var options = {
      'method': 'GET',
      'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23APC&res=1',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    request(options, function (error, response) {
      if (error) {
        console.log(`ERROR WHEN TRYING TO GET PAN/TILT VALUES ON CAMERA (${ip}) (see details below)`);
        //throw new Error(error);
        reject(error);
      } else {
        console.log(response.body.substr(3, 4));
        var values = {
          pan: response.body.substr(3, 4),
          tilt: response.body.substr(7, 4)
        }
        resolve(values);
      }
    });
  });
}

function setPanTiltValue(ip, pan, tilt, res = undefined) {
  return new Promise((resolve, reject) => {
    var options = {
      'method': 'GET',
      'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23APC' + pan + tilt + '&res=1',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    };
    request(options, function (error, response) {
      if (error) {
        console.log(`ERROR WHEN TRYING TO SET PAN/TILT VALUES ON CAMERA (${ip}) (see details below)`);
        reject(error);
      } else {
        console.log(response.body);
        resolve("ok");
      }
    });
  });
}

function getConfigOfAllCam() {
  return new Promise((resolve, reject) => {
    Camera.find({}, (err, cameras) => {
      var position = [];
      var count = cameras.length;
      let completed = 0;
      for (let i = 0; i < count; i++) {
        Promise.all([
          getZoom(cameras[i].ip),
          getPanTiltValue(cameras[i].ip)
        ]).then(values => {
          position.push({
            ip: cameras[i].ip,
            zoom: values[0],
            panTilt: values[1]
          });
          completed++;
          if (completed == count) {
            resolve(position);
          }
        }).catch(function (err) {
          console.error(err);
          reject(err);
        });
      }
    });
  });
}

function setPreset(ip, presetNumber, res) {
  console.log(ip);
  if (presetNumber < 10) {
    presetNumber = "0" + presetNumber;
  }
  var options = {
    'method': 'GET',
    'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23R' + presetNumber + '&res=1',
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  request(options, function (error, response) {
    if (error) {
      console.log(`ERROR WHEN TRYING TO SET PRESET ON CAMERA (${ip}) (see details below)`);
      //throw new Error(error);
    }
    res.send("ok");
    console.log("Send preset OK");
  });
}

function savePreset(ip, presetNumber, res) {
  if (presetNumber < 10) {
    presetNumber = "0" + presetNumber;
  }
  var options = {
    'method': 'GET',
    'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23M' + presetNumber + '&res=1',
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  request(options, function (error, response) {
    if (error) {
      console.log(`ERROR WHEN TRYING TO SAVE PRESET ON CAMERA (${ip}) (see details below)`);
      //throw new Error(error);
    }
    res.send("ok");
    console.log("Save preset OK");
  });
}

function setInOut(input, output) {
  var options = {
    'method': 'POST',
    'url': process.env["KRAMER_URL"]+':'+process.env["KRAMER_PORT"]+'/setInOut',
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "input": input,
      "output": output
    })

  };
  request(options, function (error, response) {
    if (error) {
      console.log(`ERROR WHEN TRYING TO SET INPUT/OUTPUT ON KRAMER MATRIX (see details below)`);
      //throw new Error(error);
    }
    console.log(response.body);
  });
}

/**
 * Function qui permet de configurer tous les input/ouput de krammer en un appel HTTP
 * @param {*} stringInOut exemple :"1>1,2>2,5>3,8>4,8>5,8>6,7>7,6>8" où INPUT>OUTPUT
 * @param {responde Object} res : optionnal parameter to responde
 */
function setAllInOut(stringInOut, res = undefined) {
  return new Promise((resolve, reject) => {
    var options = {
      'method': 'POST',
      'url': process.env["KRAMER_URL"]+':'+process.env["KRAMER_PORT"]+'/setAllInOut',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "allConfigString": stringInOut
      })
    };
    request(options, function (error, response) {
      if (error) {
        console.log(`ERROR WHEN TRYING TO SET MULTIPLE INPUT/OUTPUT ON KRAMER MATRIX (see details below)`);
        reject(error);
      } else {
        resolve("ok");
      }
      console.log(response.body);
    });
  });
}

function getKrammerConfig() {
  return new Promise(resolve => {
    var options = {
      'method': 'GET',
      'url': process.env["KRAMER_URL"]+':'+process.env["KRAMER_PORT"]+'/actualConfig',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    request(options, function (error, response) {
      if (error) {
        console.error(error);
        resolve([]);
      } else {
        resolve(JSON.parse(response.body));
      }
    });
  });
}

function getSaves() {
  return Save.find({}, (err, docs) => {
    if (!err) {
      return new Promise((resolve) => {
        resolve(docs);
      });
    }
    throw err;
  });
}

function getAllDemo() {
  return Demo.find({}, (err, docs) => {
    if (!err) {
      return new Promise((resolve) => {
        resolve(docs);
      });
    }
    throw err;
  });
}

function setMainVideoSource(source, ip, res = undefined) {
  return new Promise((resolve, reject) => {
    /* Attention les IP peuvent changer */
    Camera.find({}, (err, cameras) => {
      switch (source) {
        case "1":
          console.log("1")
          setTally(1, cameras[0].ip);
          break;
        case "2":
          console.log("2")
          setTally(1, cameras[1].ip);
          break;

        case "3":
          console.log("3")
          setTally(1, cameras[2].ip);
          break;

        default:
          disableAllTally();
          break;
      }
    });
    var xml =
      "<Command>" +
      "<Video>" +
      "<Input>" +
      "<SetMainVideoSource>" +
      "<ConnectorId>" + source + "</ConnectorId>" +
      "</SetMainVideoSource>" +
      "</Input>" +
      "</Video>" +
      "</Command>";

    var options = {
      method: "POST",
      url: "https://" + ip + "/putxml",
      headers: {
        "Content-Type": "text/xml",
        Authorization: "Basic cHJlc2VuY2U6QzFzYzAxMjM="
      },
      body: xml
    };
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; //permet de contourner l'erreur "error self signed certificate"

    request(options, function (error, response, body) {
      if (error) {
        console.log(`ERROR WHEN TRYING TO SET MAIN VIDEO SOURCE ON DEVICE ${ip} (see details below)`);
        reject(error);
        if (res != undefined) {
          res.status(500).end(`Cannot set main video source on device ${ip}\nDetail: ${error.message}`);
        }
      } else {
        if (res != undefined) {
          res.send('ok');
        }
        resolve('ok');
      }
    });
  });
}

function setShareSource(source, ip, res = undefined) {
  return new Promise((resolve, reject) => {
    var xml =
      "<Command>" +
      "<Presentation>" +
      "<Start>" +
      "<ConnectorId>" + source + "</ConnectorId>" +
      "</Start>" +
      "</Presentation>" +
      "</Command>";

    var options = {
      method: "POST",
      url: "https://" + ip + "/putxml",
      headers: {
        "Content-Type": "text/xml",
        Authorization: "Basic cHJlc2VuY2U6QzFzYzAxMjM="
      },
      body: xml
    };
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; //permet de contourner l'erreur "error self signed certificate"

    request(options, function (error, response, body) {
      if (error) {
        console.log(`ERROR WHEN TRYING TO SET SHARE SOURCE ON DEVICE ${ip} (see details below)`);
        reject(error);
      } else {
        resolve("ok");
      }
    });
  });
}

function getMainVideoSourceAndshareSource(ip) {
  return new Promise(resolve => {
    var options = {
      method: "GET",
      url: "http://" + ip + "/status.xml", //?location=/Status/Video/Input/MainVideoSource",
      headers: {
        "Content-Type": "text/xml",
        Authorization: "Basic cHJlc2VuY2U6QzFzYzAxMjM="
      }
    };
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; //permet de contourner l'erreur "error self signed certificate"

    request(options, function (error, response) {
      if (error) {
        console.error(error);
        resolve({
          codecStatus: "ko"
        });
      } else {
        parser.parseString(response.body, function (error, result) {
          if (error === null) {
            var mainVideoSource = result.Status.Video[0].Input[0].MainVideoSource[0];
            var shareSource = (result.Status.Conference[0].Presentation[0].Mode[0] === "Sending") ? result.Status.Conference[0].Presentation[0].LocalInstance[0].Source[0] : "Not_Sending";
            console.log(result.Status.Conference[0].Presentation[0].Mode[0])
            resolve({
              mainVideoSource: mainVideoSource,
              shareSource: shareSource,
              codecStatus: "ok"
            });
          } else {
            console.log(error);
          }
        });
      }
    });
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function callWebexNumber(number, ip) {
  var xml =
    "<Command>" +
    "<Dial>" +
    "<Number>" + number + "</Number>" +
    "</Dial>" +
    "</Command>";

  var options = {
    method: "POST",
    url: "https://" + ip + "/putxml",
    headers: {
      "Content-Type": "text/xml",
      Authorization: "Basic cHJlc2VuY2U6QzFzYzAxMjM="
    },
    body: xml
  };
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; //permet de contourner l'erreur "error self signed certificate"

  request(options, function (error, response, body) {
    if (error) {
      console.log(`ERROR WHEN ENDPOINT (${ip}) TRYING TO CALL ${number} (see details below)`);
      console.error(error);
      //throw new Error(error);
    }
  });
}

function stopSharing(ip, res = undefined) {
  return new Promise((resolve, reject) => {
    var xml =
      "<Command>" +
      "<Presentation>" +
      "<Stop>" +
      "</Stop>" +
      "</Presentation>" +
      "</Command>";

    var options = {
      method: "POST",
      url: "https://" + ip + "/putxml",
      headers: {
        "Content-Type": "text/xml",
        Authorization: "Basic cHJlc2VuY2U6QzFzYzAxMjM="
      },
      body: xml
    };
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; //permet de contourner l'erreur "error self signed certificate"

    request(options, function (error, response, body) {
      if (error) {
        console.log(`ERROR WHEN TRYING TO STOP SHARING ON DEVICE ${ip} (see details below)`);
        reject(error);
      } else {
        resolve("ok");
      }
    });
  });
}

function disconnectCall(ip) {
  var xml =
    "<Command>" +
    "<Call>" +
    "<Disconnect>" + "</Disconnect>" +
    "</Call>" +
    "</Command>";

  var options = {
    method: "POST",
    url: "https://" + ip + "/putxml",
    headers: {
      "Content-Type": "text/xml",
      Authorization: "Basic cHJlc2VuY2U6QzFzYzAxMjM="
    },
    body: xml
  };
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; //permet de contourner l'erreur "error self signed certificate"

  request(options, function (error, response, body) {
    if (error) {
      console.log(`ERROR WHEN ENDPOINT (${ip}) TRYING TO DISCONNECT CALL ${number} (see details below)`);
      //throw new Error(error);
      console.error(error);
    }
  });
}


/**
 * Enable/Disable red light of the panasonic camera
 * @param {*} mode: 1  -> enable
 * @param {*} mode: 0 -> disable
 * @param {*} ip: ip adress of the camera
 */
function setTally(mode, ip) {
  var options = {
    'method': 'GET',
    'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23DA' + mode + '&res=1',
    'headers': {
      'Cookie': 'Session=0'
    }
  };
  request(options, function (error, response) {
    if (error) {
      console.log(`ERROR ON CAMERA (${ip}) WHEN TRYING TO CHANGE TALLY (ligth on camera) (see details below)`);
      //throw new Error(error);
      console.error(error);
    }
    console.log("set TALLY :")
    console.log("BODY: " + response.body);
  });
}

function disableAllTally() {
  Camera.find({}, (err, cameras) => {
    cameras.forEach(element => {
      setTally(0, element.ip);
    });
  });
}







/**
 * 
 * @param {*} items : Scene Object
 * @param {*} idsList : Scene id List
 */
function sortListWithIds(items, idsList) {
  return new Promise(resolve => {
    var list = [];
    for (let index = 0; index < idsList.length; index++) {
      for (let i = 0; i < items.length; i++) {
        if (String(items[i]._id) == idsList[index]) {
          list.push(items[i]);
          break;
        }
      }
    }
    resolve(list.reverse());
  });

}
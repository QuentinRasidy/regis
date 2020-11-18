const Product = require('../models/product');
//const Cart = require('../models/cart');
const request = require('request');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({
  attrkey: "ATTR"
});
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/regis', {
    useNewUrlParser: true,
  },
);
mongoose.Promise = global.Promise;

const Save = require('../models/save');

exports.zoom = async (req, res, next) => {
  const ip = req.params.ip;
  console.log(ip);

  var value = await getZoom(ip);
  console.log('HERE =>' + value);
  value = parseInt("0x" + value, 16)

  value += 50 * 3;

  if (value < 4095) {
    value = (value.toString(16)).toUpperCase();
    console.log("HEX==> " + value);
    var options = {
      'method': 'GET',
      'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23AXZ' + value + '&res=1',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log('reponse zoom: ' + response.body);
      res.send("ok");
    });
  } else {
    res.send("Limit");
  }

}

exports.dezoom = async (req, res, next) => {
  const ip = req.params.ip;
  var value = await getZoom(ip);
  console.log('HERE =>' + value);
  value = parseInt("0x" + value, 16)

  value -= 50 * 3;

  if (value >= 1365) {
    value = (value.toString(16)).toUpperCase();
    console.log("HEX==> " + value);
    var options = {
      'method': 'GET',
      'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23AXZ' + value + '&res=1',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      res.send("ok");
    });
  } else {
    res.send("Limit");
  }

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
    if (error) throw new Error(error);
    console.log('reponse zoom: ' + response.body);
    res.send("ok");
  });


}

exports.left = async (req, res, next) => {
  const ip = req.params.ip;
  var values = await getPanTiltValue(ip);
  console.log('HERE PAN=>' + values);
  var panValue = parseInt("0x" + values.pan, 16)

  panValue -= 200 * 3;

  if (panValue >= 0) {
    panValue = (panValue.toString(16)).toUpperCase();
    console.log("HEX==> " + panValue);
    var options = {
      'method': 'GET',
      'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23APC' + panValue + values.tilt + '&res=1',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      res.send("ok");
    });
  } else {
    res.send("Limit");
  }

}

exports.right = async (req, res, next) => {
  const ip = req.params.ip;
  var values = await getPanTiltValue(ip);
  console.log('HERE PAN=>' + values);
  var panValue = parseInt("0x" + values.pan, 16)

  panValue += 200 * 3;

  if (panValue < 65535) {
    panValue = (panValue.toString(16)).toUpperCase();
    console.log("HEX==> " + panValue);
    var options = {
      'method': 'GET',
      'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23APC' + panValue + values.tilt + '&res=1',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      res.send("ok");
    });
  } else {
    res.send("Limit");
  }

}

exports.up = async (req, res, next) => {
  const ip = req.params.ip;
  var values = await getPanTiltValue(ip);
  console.log('HERE PAN=>' + values);
  var tiltValue = parseInt("0x" + values.tilt, 16);

  tiltValue += 200 * 3;

  if (tiltValue < 65535) {
    tiltValue = (tiltValue.toString(16)).toUpperCase();
    console.log("HEX==> " + tiltValue);
    var options = {
      'method': 'GET',
      'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23APC' + values.pan + tiltValue + '&res=1',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      res.send("ok");
    });
  } else {
    res.send("Limit");
  }
}

exports.down = async (req, res, next) => {
  const ip = req.params.ip;
  var values = await getPanTiltValue(ip);
  console.log('HERE PAN=>' + values);
  var tiltValue = parseInt("0x" + values.tilt, 16);

  tiltValue -= 200 * 3;

  if (tiltValue >= 0) {
    tiltValue = (tiltValue.toString(16)).toUpperCase();
    console.log("HEX==> " + tiltValue);
    var options = {
      'method': 'GET',
      'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23APC' + values.pan + tiltValue + '&res=1',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      res.send("ok");
    });
  } else {
    res.send("Limit");
  }
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
    if (error) throw new Error(error);
    console.log(response.body);
    res.send("ok");
  });
}

exports.test = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    getKrammerConfig().then(async config => {
      res.render('regis/index', {
        cameras: products,
        pageTitle: 'Regis',
        krammerConfig: config,
        sx80Config: await getMainVideoSourceAndshareSource(),
        path: '/'
      });
    })
  });
};

exports.getScenario = (req, res, next) => {
  getSaves().then(save => {
    res.render('regis/scenario', {
      saves: save,
      pageTitle: 'Scene',
      path: '/scenario'
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

exports.setMainVideoSource = (req, res, next) => {
  var source = req.body.mainVideoSource;
  console.log(source);
  var ip = "10.1.110.140"; // A surveiller car peut changer 
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
    if (error) throw new Error(error);
    console.log(error);

    res.send("ok");
  });
}

exports.setShareSource = (req, res, next) => {
  var source = req.body.shareSource;
  console.log(source);
  var ip = "10.1.110.140"; // A surveiller car peut changer 
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
    if (error) throw new Error(error);
    console.log(error);

    res.send("ok");
  });
}

exports.stopSharing = (req, res, next) => {
  var ip = "10.1.110.140"; // A surveiller car peut changer 
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
    if (error) throw new Error(error);
    console.log(error);

    res.send("ok");
  });
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
    output,
    input,
    configName
  } = req.body;
  // console.log(mainVideoSource, shareSelection, output, input, configName);
  getConfigOfAllCam().then((value) => {
    value.forEach(e => console.log(e));
    var save = new Save({
      name: configName,
      position: value,
      mainVideoSource: mainVideoSource,
      shareSelection: shareSelection,
      output: output,
      input: input
    });
    save.save(function (err, save) {
      if (err) return console.error(err);
      console.log(save.name + " saved to REGIS db.");
      res.sendStatus(201);
    });
  });
}

exports.startScenario = (req, res, next) => {
  const saveId = req.body.saveId;
  Save.findById(saveId, function(err, save) {
    if(!save) {
      return res.redirect('/');
    }
    console.log(save);
    res.sendStatus(200);
    // res.render('admin/edit-product', {
    //   pageTitle: 'Edit Save',
    //   path: '/admin/edit-product',
    //   //editing: editMode,// true or false
    //   product: save
    // });
  });

}

/* FUNCTION */


function getZoom(ip) {
  return new Promise(resolve => {
    var options = {
      'method': 'GET',
      'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23AXZ&res=1',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body.substr(3))
      resolve(response.body.substr(3));
    });
  });
}

function getPanTiltValue(ip) {
  return new Promise(resolve => {
    var options = {
      'method': 'GET',
      'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23APC&res=1',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body.substr(3, 4))
      var values = {
        pan: response.body.substr(3, 4),
        tilt: response.body.substr(7, 4)
      }
      resolve(values);
    });
  });
}

function getConfigOfAllCam() {
  return new Promise((resolve, reject) => {
    Product.fetchAll(cameras => {
      var position = [];
      cameras.forEach((cam, index, array) => {
        Promise.all([getZoom(cam.ip), getPanTiltValue(cam.ip)]).then((values) => {
          position.push({
            ip: cam.ip,
            zoom: values[0],
            panTilt: values[1]
          });
          if (index === array.length - 1) {
            //console.log(position)
            resolve(position);
          }
        });
      });
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
    if (error) throw new Error(error);
    res.send("ok");
    console.log("Send preset OK");
    // console.log(response);
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
    if (error) throw new Error(error);
    res.send("ok");
    console.log("Save preset OK");
  });
}

function setInOut(input, output) {
  var options = {
    'method': 'POST',
    'url': 'http://websrv2.ciscofrance.com:15136/setInOut',
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
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

function getKrammerConfig() {
  return new Promise(resolve => {
    var options = {
      'method': 'GET',
      'url': 'http://websrv2.ciscofrance.com:15136/actualConfig',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      resolve(JSON.parse(response.body))
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

function getMainVideoSourceAndshareSource() {
  return new Promise(resolve => {
    var ip = "10.1.110.140"; // A surveiller car peut changer 
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
      if (error) throw new Error(error);
      parser.parseString(response.body, function (error, result) {
        if (error === null) {
          var mainVideoSource = result.Status.Video[0].Input[0].MainVideoSource[0];
          var shareSource = (result.Status.Conference[0].Presentation[0].Mode[0] === "Sending") ? result.Status.Conference[0].Presentation[0].LocalInstance[0].Source[0] : null;
          console.log(result.Status.Conference[0].Presentation[0].Mode[0])
          resolve({
            mainVideoSource: mainVideoSource,
            shareSource: shareSource
          });
        } else {
          console.log(error);
        }
      });
    });
  });
}
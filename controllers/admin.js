const Product = require('../models/product');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/regis', {
    useNewUrlParser: true,
  },
);
mongoose.Promise = global.Promise;

const Save = require('../models/save');
const Demo = require('../models/demo');

const camFunctions = require('../util/camera-move');

// exports.getAddProduct = (req, res, next) => {
//   res.render('admin/edit-product', {
//     pageTitle: 'Add Product',
//     path: '/admin/add-product',
//     formsCSS: true,
//     productCSS: true,
//     activeAddProduct: true,
//     editing: false
//   });
// };

// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;
//   const product = new Product(null, title, imageUrl, description, price);// null pour l'id qui est généré automatiquement
//   product.save();
//   res.redirect('/');
// };

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const demoId = req.query.demoId;
  Save.findById(prodId, function (err, save) {
    if (!save) {
      return res.redirect('/');
    }


    save.position.forEach(cam => {
      camFunctions.setZoom(cam.ip, cam.zoom);
      camFunctions.setPanTiltValue(cam.ip, cam.panTilt.pan, cam.panTilt.tilt);
    });

    

    setTimeout( () => {
      Product.fetchAll(products => {
        getAllDemo().then(allDemo => {
          res.render('admin/edit-product', {
            pageTitle: 'Edit Save',
            path: '/admin/edit-product',
            demoList: allDemo,
            //editing: editMode,// true or false
            product: save,
            demoId: demoId,
            cameras: products
          });
        }).catch(function () {
          console.log("Promise Rejected: see getAllDemo() function in file admin.js");
        });
      });
    }, 800); // on attend 0.8 sec pour laisser le temps au cameras de ce configurer


  });
};

exports.postEditProduct = async (req, res, next) => { // mis a jours des données et remplacement du produit dans la db (gérer par le "model/product" en fonction de l'existence de l'id )
  const id = req.body.productId //l'id nous est envoyer grace a un input hidden dans la vue edit-product/ qui elle a acces a l'id du produit modifier
  const name = req.body.name;
  const mainVideoSource = req.body.mainVideoSource;
  const shareSelection = req.body.shareSelection;
  const allInputOutput = req.body.allInputOutput;

  //OLD//
  //const ip = req.body.ip;
  // const pan = req.body.pan;
  // const tilt = req.body.tilt;
  // const zoom = req.body.zoom;
  //OLD//


  const demoId = req.body.demoName;
  const oldDemoId = req.body.oldDemoId;


  //si on a changer le scene de Demo alors on la retire de la Demo actuelle et on la met dans la nouvelle
  if (demoId != oldDemoId) {

    const oldDemo = await Demo.findById(oldDemoId);
    if (!oldDemo) {
      console.log("Error demo: " + oldDemoId + "doesn't exist in data base");
      return res.redirect('/');
    }
    console.log(id);
    oldDemo.scene = oldDemo.scene.filter(e => e != id); // on retire la scene courante de l'ancienne demo;
    oldDemo.save(function (err, save) {
      if (err) return console.error(err);
    });

    const demo = await Demo.findById(demoId);
    if (!demo) {
      console.log("Error demo: " + demoId + "doesn't exist in data base");
      return res.redirect('/');
    }
    demo.scene.push(id);
    demo.save(function (err, save) {
      if (err) return console.error(err);
    });
  }

  //OLD//
  //var postion = [];
  // for (let index = 0; index < ip.length; index++) {
  //   postion.push({
  //     ip: ip[index],
  //     zoom: zoom[index],
  //     panTilt: {
  //       pan: pan[index],
  //       tilt: tilt[index]
  //     }
  //   })
  // }
  //OLD//

  var updatedSave = {
    name: name,
    position: await camFunctions.getConfigOfAllCam(),
    mainVideoSource: mainVideoSource,
    shareSelection: shareSelection,
    allInputOutput: allInputOutput
  };

  Save.findByIdAndUpdate({
    _id: id
  }, updatedSave, async () => {
    const demo = await Demo.findById(oldDemoId);
    const ids = demo.scene;
    const demoName = demo.name;
    Save.find().where('_id').in(ids).exec(async (err, records) => {
      var list = await sortListWithIds(records, ids);
      var allDemo = await getAllDemo();
      res.render('regis/scene-of-demo', {
        saves: list,
        pageTitle: 'Scene',
        path: '/scene-of-demo',
        demoId: demoId,
        demoName: demoName,
        demoList: allDemo,
        edit: true
      });
    });
  });
};

exports.copyProduct = (req, res, next) => {
  const sceneId = req.body.sceneId;
  const demoId = req.body.demoId;
  Save.findById(sceneId, function (err, save) {
    if (!save) {
      console.log("Scene not found in DataBase !")
      return res.redirect('/');
    } else {
      var copy = new Save({
        name: save.name + "_copy",
        position: save.position,
        mainVideoSource: save.mainVideoSource,
        shareSelection: save.shareSelection,
        allInputOutput: save.allInputOutput,
        subName: save.name + "_copy" + demoId
      });
      copy.save(function (err, save) {
        if (err) return console.error(err);
      })
    }

    Demo.findById(demoId, function (err, demo) {
      if (!demo) {
        console.log("Demo not found in DataBase !")
      } else {
        demo.scene.push(copy._id);
        demo.save(function (err, save) {
          if (err) return console.error(err);
          res.sendStatus(200);
        });
      }
    });
  });
};


// exports.getProducts = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('admin/products', {
//       prods: products,
//       pageTitle: 'Admin Products',
//       path: '/admin/products'
//     });
//   });
// };

exports.postDeleteProduct = async (req, res, next) => {
  const saveId = req.body.productId;
  const demoId = req.body.demoId;
  const allDemo = await getAllDemo();

  Save.findByIdAndDelete(saveId, async function () {
    const demo = await Demo.findById(demoId);
    if (!demo) {
      return res.redirect('/');
    }
    Demo.updateOne({
      _id: demoId
    }, {
      scene: demo.scene.pull(saveId)
    }, function (err) {
      if (err) return console.error(err);
    });

    const ids = demo.scene;
    const demoName = demo.name;
    Save.find().where('_id').in(ids).exec(async (err, records) => {
      var list = await sortListWithIds(records, ids);
      res.render('regis/scene-of-demo', {
        saves: list,
        pageTitle: 'Scene',
        path: '/scene-of-demo',
        demoId: demoId,
        demoName: demoName,
        demoList: allDemo,
        edit: true
      });
    });
  });
}

exports.addDemo = (req, res, next) => {
  const demoName = req.body.demoName;
  var demo = new Demo({
    name: demoName,
    scene: [],
  });
  demo.save(function (err, save) {
    if (err) return console.error(err);
    res.redirect('back');
  });
}

exports.deleteDemo = async (req, res, next) => {
  const demoId = req.body.demoId;
  const demo = await Demo.findById(demoId);
  const ids = demo.scene;
  Save.deleteMany().where('_id').in(ids).exec((err, records) => { //delete all scene from this Demo
  });
  Demo.findByIdAndDelete(demoId, function () { //delete the demo
    res.redirect('/');
  });
}

exports.changeNameDemo = (req, res, next) => {
  const demoId = req.body.demoId;
  const demoName = req.body.demoName;
  console.log(demoId, demoName);

  Demo.updateOne({
    _id: demoId
  }, {
    name: demoName
  }, function (err) {
    if (err) return console.error(err);
    res.redirect('/');
  });
}

exports.moveToDemo = async (req, res, next) => {
  const id = req.body.sceneId;
  const demoId = req.body.demoName;
  const oldDemoId = req.body.demoId;

  console.log(id, demoId, oldDemoId);


  //si on a changer le scene de Demo alors on la retire de la Demo actuelle et on la met dans la nouvelle
  if (demoId != oldDemoId) {

    const oldDemo = await Demo.findById(oldDemoId);
    if (!oldDemo) {
      console.log("Error demo: " + oldDemoId + " doesn't exist in data base");
      return res.redirect('/');
    }
    console.log(id);
    oldDemo.scene = oldDemo.scene.filter(e => e != id); // on retire la scene courante de l'ancienne demo;
    oldDemo.save(function (err, save) {
      if (err) return console.error(err);
    });

    const save = await Save.findById(id);

    Save.updateOne({
      _id: id
    }, {
      subName: save.name + demoId
    }, function (err) {
      if (err) return console.error(err);
    });

    const demo = await Demo.findById(demoId);
    if (!demo) {
      console.log("Error demo: " + demoId + "doesn't exist in data base");
      return res.redirect('/');
    }
    demo.scene.push(id);
    demo.save(function (err, save) {
      if (err) return console.error(err);
      console.log(save);
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(200);
  }
}

exports.changeOrderOfScene = (req, res, next) => {
  const demoId = req.body.demoId;
  const newArray = req.body.newOrderedList.split(',');
  Demo.updateOne({
    _id: demoId
  }, {
    scene: newArray
  }, function (err) {
    if (err) return console.error(err);
    res.sendStatus(200);
  });
}

exports.getRegisSetting = (req, res, next) => {
  res.render('regis/setting', {
    pageTitle: 'Setting',
    path: '/setting'
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


/* utils function */

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
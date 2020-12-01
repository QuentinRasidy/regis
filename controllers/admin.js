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
    getAllDemo().then(allDemo => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Save',
        path: '/admin/edit-product',
        demoList: allDemo,
        //editing: editMode,// true or false
        product: save,
        demoId: demoId
      });
    }).catch(function () {
      console.log("Promise Rejected: see getAllDemo() function in file admin.js");
    });
  });
};

exports.postEditProduct = async (req, res, next) => { // mis a jours des données et remplacement du produit dans la db (gérer par le "model/product" en fonction de l'existence de l'id )
  const id = req.body.productId //l'id nous est envoyer grace a un input hidden dans la vue edit-product/ qui elle a acces a l'id du produit modifier
  const name = req.body.name;
  const mainVideoSource = req.body.mainVideoSource;
  const shareSelection = req.body.shareSelection;
  const allInputOutput = req.body.allInputOutput;
  const ip = req.body.ip;
  const pan = req.body.pan;
  const tilt = req.body.tilt;
  const zoom = req.body.zoom;
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

  var postion = [];
  for (let index = 0; index < ip.length; index++) {
    postion.push({
      ip: ip[index],
      zoom: zoom[index],
      panTilt: {
        pan: pan[index],
        tilt: tilt[index]
      }
    })
  }
  var updatedSave = {
    name: name,
    position: postion,
    mainVideoSource: mainVideoSource,
    shareSelection: shareSelection,
    allInputOutput: allInputOutput
  };
  Save.findByIdAndUpdate({
    _id: id
  }, updatedSave, () => {
    res.redirect('/demo');
    //res.sendStatus(200);
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

exports.postDeleteProduct = (req, res, next) => {
  const saveId = req.body.productId;
  const demoId = req.body.demoId;

  Save.findByIdAndDelete(saveId, async function () {
    const demo = await Demo.findById(demoId);
    if (!demo) {
      return res.redirect('/');
    }
    const ids = demo.scene;
    const demoName = demo.name;
    Save.find().where('_id').in(ids).exec((err, records) => {
      res.render('regis/scene-of-demo', {
        saves: records,
        pageTitle: 'Scene',
        path: '/scene-of-demo',
        demoId: demoId,
        demoName: demoName,
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
    res.redirect('/demo');
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
    res.redirect('/demo');
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
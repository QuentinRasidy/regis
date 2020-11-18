const Product = require('../models/product');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/regis', {
    useNewUrlParser: true,
  },
);
mongoose.Promise = global.Promise;

const Save = require('../models/save');

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
  Save.findById(prodId, function(err, save) {
    if(!save) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Save',
      path: '/admin/edit-product',
      //editing: editMode,// true or false
      product: save
    });
  });
};

exports.postEditProduct = (req, res, next) => {// mis a jours des données et remplacement du produit dans la db (gérer par le "model/product" en fonction de l'existence de l'id )
  const id = req.body.productId //l'id nous est envoyer grace a un input hidden dans la vue edit-product/ qui elle a acces a l'id du produit modifier
  const name = req.body.name;
  const mainVideoSource = req.body.mainVideoSource;
  const shareSelection = req.body.shareSelection;
  const output = req.body.output;
  const input = req.body.input;
  const ip = req.body.ip;
  const pan = req.body.pan;
  const tilt = req.body.tilt;
  const zoom = req.body.zoom;
  var postion = [];
  for (let index = 0; index < ip.length; index++) {
    postion.push({
            ip : ip[index],
            zoom : zoom[index],
            panTilt : {
                pan : pan[index],
                tilt : tilt[index]
            }
        })
  }
  var updatedSave = {
    name: name,
    position: postion,
    mainVideoSource: mainVideoSource,
    shareSelection: shareSelection,
    output: output,
    input: input
  };
  Save.findByIdAndUpdate({_id: id}, updatedSave, ()=>{
    res.redirect('/scenario');
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
  Save.findByIdAndDelete(saveId, function () {
    res.redirect('/scenario');
  });
}

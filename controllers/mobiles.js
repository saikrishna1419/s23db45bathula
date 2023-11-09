var mobile = require("../models/mobiles");
// List of all mobiles
exports.mobile_list = async function(req, res) {
res.send('NOT IMPLEMENTED: mobile list');
};
// for a specific mobile.
exports.mobile_detail = function(req, res) {
res.send('NOT IMPLEMENTED: mobile detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.mobile_create_post = async function(req, res) {
  console.log(req.body)
  let document = new mobile();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  // {"costume_type":"goat", "cost":12, "size":"large"}
  document.productName = req.body.productName;
  document.brand = req.body.brand;
  document.price = req.body.price;

  try{
  let result = await document.save();
  res.send(result);
  }
  catch(err){
  res.status(500);
  res.send(`{"error": ${err}}`);
  }
  };
// Handle mobile delete form on DELETE.
exports.mobile_delete = function(req, res) {
res.send('NOT IMPLEMENTED: mobile delete DELETE ' + req.params.id);
};
// Handle mobile update form on PUT.
exports.mobile_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: mobile update PUT' + req.params.id);
};

// List of all mobiles
exports.mobile_list = async function(req, res) {
try{
themobile = await mobile.find();
res.send(themobile);
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};

// VIEWS
// Handle a show all view
exports.mobile_view_all_Page = async function(req, res) {
try{
  themobile = await mobile.find();
res.render('mobiles', { title: 'mobile Search Results', results: themobile });
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};
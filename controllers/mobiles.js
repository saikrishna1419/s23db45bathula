var mobile = require("../models/mobiles");
// List of all mobiles
exports.mobile_list = async function (req, res) {
  res.send('NOT IMPLEMENTED: mobile list');
};
// for a specific mobile.
exports.mobile_detail = async function (req, res) {
  console.log("detail" + req.params.id)
  try {
    result = await mobile.findById(req.params.id)
    res.send(result)
  } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
  }
};
// Handle mobile create on POST.
exports.mobile_create_post = async function (req, res) {
  console.log(req.body)
  let document = new mobile();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  // {"mobile_type":"goat", "cost":12, "size":"large"}
  document.productName = req.body.productName;
  document.brand = req.body.brand;
  document.price = req.body.price;

  try {
    let result = await document.save();
    res.send(result);
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};
// Handle mobile delete form on DELETE.
exports.mobile_delete = function (req, res) {
  res.send('NOT IMPLEMENTED: mobile delete DELETE ' + req.params.id);
};
// Handle mobile update form on PUT.
exports.mobile_update_put = async function (req, res) {
  console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
  try {
    let toUpdate = await mobile.findById(req.params.id)
    // Do updates of properties
    if (req.body.productName)
      toUpdate.productName = req.body.productName;
    if (req.body.brand) toUpdate.brand = req.body.brand;
    if (req.body.price) toUpdate.price = req.body.price;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
  } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
  }
};

// List of all mobiles
exports.mobile_list = async function (req, res) {
  try {
    themobile = await mobile.find();
    res.send(themobile);
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// VIEWS
// Handle a show all view
exports.mobile_view_all_Page = async function (req, res) {
  try {
    themobile = await mobile.find();
    res.render('mobiles', { title: 'mobile Search Results', results: themobile });
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};
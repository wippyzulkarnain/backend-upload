const models = require("../models");
const S3 = require("../config/S3");
const multiparty = require("multiparty");

exports.getAll = async (req, res) => {
  try {
    const users = await models.users.findAll();
    res.json({ users });
  } catch (err) {
    console.error(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const form = new multiparty.Form();
    form.parse(req, async (err, fields, files) => {
      if (err) return console.error(err);

      console.log(fields, files);

      const userData = JSON.parse(fields.user_data[0]);

      const image = await S3.uploadImage(files.user_image[0].path);
      const user = await models.users.create({
        name: userData.name,
        email: userData.email,
        image: image.Key
      });
      res.json({ user });
    });
  } catch (err) {
    console.error(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await models.users.findOne({ where: { id: req.params.id } });
    await S3.deleteImage(user.image);
    await user.destroy();
    res.json({});
  } catch (err) {
    console.error(err);
  }
};

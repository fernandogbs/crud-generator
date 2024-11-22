const mongoose = require("mongoose");

const createGenericModel = (collectionName) => {
  if (mongoose.models[collectionName]) {
    return mongoose.models[collectionName];
  }

  const schema = new mongoose.Schema({}, { strict: false });
  return mongoose.model(collectionName, schema, collectionName);
};

module.exports = createGenericModel;
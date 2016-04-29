'use strict';
module.exports = function(sequelize, DataTypes) {
  var Slink = sequelize.define('Slink', {
    url: DataTypes.TEXT,
    starred: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Slink;
};

// return db contents for slink

// change

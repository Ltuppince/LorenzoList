module.exports = function(sequelize, DataTypes) {
    var Items = sequelize.define("Items", {
      name: DataTypes.STRING
    });
    
    return Items;
};
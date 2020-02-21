module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  ////////remove /////////
  Category.associate = function(models) {
    Category.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };
  //////////////////

  return Category;
};
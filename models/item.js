module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  });

  Item.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Item.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      as: "User"
    });
    //////////////remove  code //////////////////
    Item.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      },
      as: "Category"
    });
    //////////////////////////////////////
  };

  //////////////remove  code //////////////////
  // Item.associate = function(models) {
  //   Item.belongsTo(models.Category, {
  //     foreignKey: {
  //       allowNull: false
  //     },
  //     as: "Category"
  //   });
  // };
  //////////////////////////////////////

  return Item;
};
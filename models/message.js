module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Message.associate = function(models) {
    Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      as: "Author"
    });
    Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      as: "Recipient"
    });
  };




  return Message;
};
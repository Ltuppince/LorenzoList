module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipient_id: {
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
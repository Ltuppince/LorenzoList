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
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        as:"AuthorId"
      });
    };

    Message.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        as:"RecipientId"
      });
    };
  
    
    return Message;
};
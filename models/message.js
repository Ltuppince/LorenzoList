module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
      name: DataTypes.STRING
    });
    
    return Message;
};
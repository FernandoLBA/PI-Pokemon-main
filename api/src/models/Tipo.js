const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "tipo",
    {
      nombre: {
        type: DataTypes.STRING,
      },
    },
    {
      // coloca los nombres de los tipos en minúsculas
      hooks: {
        beforeCreate: function (tipo) {
          tipo.nombre = tipo.nombre.toLowerCase();

          return tipo;
        },
      },
    }
  );
};

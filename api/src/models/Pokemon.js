const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      // el type lo coloque en string para que coincida con el tipo de dato que genera la BD.
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.INTEGER,
    },
    fuerza: {
      type: DataTypes.INTEGER,
    },
    defensa: {
      type: DataTypes.INTEGER,
    },
    velocidad: {
      type: DataTypes.INTEGER,
    },
    altura: {
      type: DataTypes.INTEGER,
    },
    peso: {
      type: DataTypes.INTEGER,
    },
    imagen: {
      type: DataTypes.STRING,
      defaultValue: "https://e1.pngegg.com/pngimages/649/608/png-clipart-3d-yoshi-yoshi-3d-illustration.png"
    },
  });
};

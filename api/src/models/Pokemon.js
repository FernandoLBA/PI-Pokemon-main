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
      defaultValue: "https://e7.pngegg.com/pngimages/440/208/png-clipart-yoshi-super-mario-world-2-yoshis-island-mario-yoshi-new-super-mario-bros-u-yoshis-story-yoshi-nintendo-vertebrate-thumbnail.png"
    },
  });
};

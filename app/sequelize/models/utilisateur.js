module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateur", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(20),
        },
        password: {
            type: Sequelize.STRING(60),
        }
    });

    return Utilisateur;
}
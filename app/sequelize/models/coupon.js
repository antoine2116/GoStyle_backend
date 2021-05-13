module.exports = (sequelize, Sequelize) => {
    const Coupon = sequelize.define("coupon", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        libelle: {
            type: Sequelize.STRING(80),
        },
        description: {
            type: Sequelize.STRING(255),
        },
        code: {
            type: Sequelize.STRING(30),
        },
        qrCode: {
            type: Sequelize.STRING(255),
            primaryKey: true
        }
    });

    return Coupon;
}
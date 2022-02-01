'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      NUIS: {
        allowNull: false,
        type: Sequelize.STRING
      },
      logoVirtualPath: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hasVat: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      vat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numberOfUsers: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      TCRCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      softCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      signature: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      certificate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      typeOfTCR: {
        allowNull: false,
        type: Sequelize.STRING
      },
      validFrom: {
        allowNull: false,
        type: Sequelize.DATE
      },
      validTo: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients');
  }
};
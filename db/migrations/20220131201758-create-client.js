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
      softCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      signature: {
        allowNull: false,
        type: Sequelize.STRING
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
        allowNull: false,
        defaultValue: true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients');
  }
};
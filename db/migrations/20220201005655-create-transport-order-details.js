'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransportOrderDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transportOrderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TransportOrders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      startAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      startCity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      startPoint: {
        allowNull: false,
        type: Sequelize.STRING
      },
      startDateTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      destinationAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      destinationCity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      destinationPoint: {
        allowNull: false,
        type: Sequelize.STRING
      },
      destinationDateTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      vehiclePlates: {
        allowNull: false,
        type: Sequelize.STRING
      },
      carrierName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      carrierAddress: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('TransportOrderDetails');
  }
};
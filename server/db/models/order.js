const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  pickup: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  delivery: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  pickupDate: {
    type: Sequelize.STRING,
    allowNull: false
  },
  deliveryDate: {
    type: Sequelize.STRING
  },
  item: {
    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.DECIMAL(10,2))),
    allowNull: false,
    defaultValue: []
  },
  status: {
    type: Sequelize.ENUM,
    values: ['processing', 'pending', 'done', 'cancel'],
    defaultValue: 'pending'
  }
})

module.exports = Order

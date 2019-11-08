const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId
    const [order] = await Order.findAll({
      where: {
        id,
      }
    })
    res.json(order)
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId

    const updatedOrder = await Order.update(req.body, {
      where: {
        id
      }
    })

    res.json(updatedOrder)
  } catch(err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId

    await Order.destroy({
      where: {
        id
      }
    })
    const removedOrder = await Order.findAll()
    res.json(removedOrder)
  } catch(err) {
    next(err)
  }
})

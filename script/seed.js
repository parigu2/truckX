'use strict'

const db = require('../server/db')
const {User, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const orders = await Promise.all([
    Order.create({
      pickup: '6400 Shafer, Rosemont, IL 60018',
      delivery: '702 W Huntington Commons rd, Mount Prospect, IL 60056',
      pickupDate: '11/02/2019',
      deliveryDate: '11/03/2019',
      item: [[52, 52, 48, 5400]],
      status: 'processing'
    }),
    Order.create({
      pickup: '5114 N Lincoln Ave, Chicago, IL 60625',
      delivery: '801 Civic Center dr, Niles, IL 60714',
      pickupDate: '11/10/2019',
      deliveryDate: '11/11/2019',
      item: [[48, 65, 71, 8250]],
      status: 'pending'
    }),
    Order.create({
      pickup: '702 W Huntington Commons rd, Mount Prospect, IL 60056',
      delivery: '4300 Clark Ave, Cleveland, OH 44109',
      pickupDate: '11/15/2019',
      deliveryDate: '11/18/2019',
      item: [[40,44,44,4800]],
      status: 'pending'
    }),
    Order.create({
      pickup: '3750 N Meridian st, Indianapolis, IN 46208',
      delivery: '702 W Huntington Commons rd, Mount Prospect, IL 60056',
      pickupDate: '10/25/2019',
      deliveryDate: '10/26/2019',
      item: [[32, 32, 32, 2000]],
      status: 'done'
    }),
    Order.create({
      pickup: '2885 W Diehl rd, Naperville, IL 60563',
      delivery: '5114 N Lincoln Ave, Chicago, IL 60625',
      pickupDate: '10/14/2019',
      deliveryDate: '10/14/2019',
      item: [[60, 60, 60, 3200]],
      status: 'cancel'
    })
  ])


  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

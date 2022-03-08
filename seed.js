'use strict';
const { Pizza, User, Order } = require('./server/db/models');

const db = require('./server/db/db');

const fakePizzas = [
  {
    name: 'Margharita',
    description:
      'Plum tomato sauce with a blend of Fresh Mozzarella, Peccorino Romano, Reggiano Parmigiano and basil.',
    price: 999.99,
    quantity: 15,
    imageUrl:
      'https://pbs.twimg.com/media/Dwecl7tVsAUcmX4?format=jpg&name=medium',
    cityOfPizza: 'NYC',
  },
  {
    name: 'Artichoke',
    description:
      'Spinach cream sauce with artichoke hearts and a blend of cheeses.',
    price: 12.99,
    quantity: 7,
    imageUrl:
      'https://pbs.twimg.com/media/EVQJm7sX0AAb6Y8?format=jpg&name=medium',
    cityOfPizza: 'NYC',
  },
  {
    name: 'Pepperoni Dreams',
    description:
      'Detroit square pizza with a caramelized cheddar cheese crust, zesty tomato sauce and thick cut pepperoni cups.',
    price: 17.99,
    quantity: 1,
    imageUrl:
      'https://pbs.twimg.com/media/EIs2eGhXUAAtCxs?format=jpg&name=4096x4096',
    //'https://pbs.twimg.com/media/D3pJeD3WAAAgjaI?format=jpg&name=small'
    cityOfPizza: 'Detroit',
  },

  {
    name: 'Scilian',
    description:
      'Plum tomato sauce with a blend of cheeses, fresh basil, and olive oil on a twice baked crust.',
    price: 17.99,
    quantity: 4,
    imageUrl:
      'https://pbs.twimg.com/media/DuzMghQV4AAmzcI?format=jpg&name=medium',
    cityOfPizza: 'NYC',
  },
  {
    name: 'Grandmas Special',
    description:
      "San Marzano tomatoes, fresh mozzarella, fresh jalapenos, spicy soppressata salami, Mike's Hot Honey, Parmigiano Reggiano D.O.P, and extra virgin olive oil.",
    price: 17.99,
    quantity: 7,
    imageUrl:
      'https://pbs.twimg.com/media/Ci0nmDLWkAAnCCN?format=jpg&name=900x900',
    cityOfPizza: 'NYC',
  },
  {
    name: 'Staten Island',
    description:
      'San Marzano Tomato Sauce, Mozzarella di Bufala, Mushroom, spicy soppressata salami, Fresh Basil, Extra Virgin Olive Oil',
    price: 17.99,
    quantity: 2,
    imageUrl:
      '	https://pbs.twimg.com/media/E-e5UGXUUAsR3qm?format=jpg&name=large',
    cityOfPizza: 'NYC',
  },
  {
    name: 'Brooklyn',
    description:
      'Plum tomato sauce, fresh mozzarella, spicy soppressata salami, Parmigiano Reggiano D.O.P, and extra virgin olive oil.',
    price: 17.99,
    quantity: 50,
    imageUrl:
      'https://pbs.twimg.com/media/CqAAjxDWYAACxyN?format=jpg&name=medium',
    cityOfPizza: 'NYC',
  },
  {
    name: 'Caprocciosa or Caproccisoa',
    description:
      'San Marzano Tomato Sauce, Mozzarella di Bufala, Mushroom, Gaeta Olive,Rovagnati Granbiscotto Ham, Artichoke Hearts, Fresh Basil, Extra Virgin Olive Oil',
    price: 17.99,
    quantity: 4,
    imageUrl:
      'https://pbs.twimg.com/media/FMvAzoQXEAA0SIV?format=jpg&name=small',
    cityOfPizza: 'Detroit',
  },
  {
    name: 'nutella',
    description: 'goodshit',
    price: 9.99,
    quantity: 3,
    imageUrl:
      '	https://pbs.twimg.com/media/Cgl86ZVXEAAJaO9?format=jpg&name=medium',
    cityOfPizza: 'Detroit',
  },
  {
    name: 'the burn',
    description: 'burnt shit',
    price: 90.0,
    quantity: 3,
    imageUrl:
      'https://pbs.twimg.com/media/DEnl9TLVwAAmWq5?format=jpg&name=medium',
    cityOfPizza: 'Chicago',
  },
  {
    name: 'Mellow Mushroom',
    description: 'ricotta',
    price: 10.99,
    quantity: 3,
    imageUrl:
      'https://pbs.twimg.com/media/DMWFsdqWAAEYK2s?format=jpg&name=medium',
    cityOfPizza: 'Chicago',
  },
  {
    name: 'Margarita, hold the Margarita',
    description: 'smaller one',
    price: 0.05,
    quantity: 3,
    imageUrl:
      '	https://pbs.twimg.com/media/EWOcWiXXQAIkdkQ?format=jpg&name=medium',
    cityOfPizza: 'Detroit',
  },
  {
    name: 'greens',
    description: 'seeds',
    price: 99.99,
    quantity: 3,
    imageUrl:
      '	https://pbs.twimg.com/media/DhMFibnXcAEIN5h?format=jpg&name=4096x4096',
    //'https://pbs.twimg.com/media/DhMFibnXcAEIN5h?format=jpg&name=900x900'
    cityOfPizza: 'NYC',
  },
  {
    name: 'on a plate',
    description: 'resturant',
    price: 9.99,
    quantity: 3,
    imageUrl:
      'https://pbs.twimg.com/media/DhMFj_wWsAAJ0fs?format=jpg&name=4096x4096',
    cityOfPizza: 'NYC',
  },
  {
    name: 'have no idea',
    description: 'chicken?',
    price: 9.89,
    quantity: 3,
    imageUrl:
      'https://pbs.twimg.com/media/DgTqDsfW0AY8vdH?format=jpg&name=4096x4096',
    cityOfPizza: 'Chicago',
  },
  {
    name: 'what is pizza',
    description: 'salad',
    price: 20.99,
    quantity: 7,
    imageUrl:
      'https://pbs.twimg.com/media/EoAQGMXW8A4CddJ?format=jpg&name=medium',
    cityOfPizza: 'NYC',
  },
  {
    name: 'beef',
    description: 'small neoplitan',
    price: 9.99,
    quantity: 7,
    imageUrl:
      'https://pbs.twimg.com/media/EoSRxOyWEAY-Fdz?format=jpg&name=medium',
    cityOfPizza: 'Chicago',
  },
  {
    name: 'visit califonia',
    description: 'artichoke hearts',
    price: 10.99,
    quantity: 7,
    imageUrl:
      'https://pbs.twimg.com/media/FH1NA0qVEAQ3Xg2?format=jpg&name=large',
    cityOfPizza: 'NYC',
  },
  {
    name: 'The Chicago',
    description: 'made in chicago',
    price: 20.99,
    quantity: 7,
    imageUrl:
      '	https://pbs.twimg.com/media/FMcz1TEWQAwjAI1?format=jpg&name=medium',
    cityOfPizza: 'Chicago',
  },
  {
    name: 'white deepdish',
    description: 'white cheese',
    price: 10.99,
    quantity: 7,
    imageUrl:
      'https://pbs.twimg.com/media/FMdg_lYXMAE0jd6?format=jpg&name=medium',
    cityOfPizza: 'Chicago',
  },
  {
    name: 'tomato detroit',
    description: 'tomatos, ricotta, balsmic',
    price: 20.99,
    quantity: 7,
    imageUrl:
      'https://pbs.twimg.com/media/FMY_EACWYAU7bnC?format=jpg&name=large',
    cityOfPizza: 'Detroit',
  },
  {
    name: 'the classic',
    description: 'sauce and cheese',
    price: 99.99,
    quantity: 7,
    imageUrl:
      'https://pbs.twimg.com/media/FM82sB-XIAYiOJz?format=jpg&name=medium',
    cityOfPizza: 'Detroit',
  },
  {
    name: 'why?',
    description:
      'why even bother explianing this, the only reason why you would get this is if you have no taste buds',
    price: 0.01,
    quantity: 7,
    imageUrl:
      '	https://pbs.twimg.com/media/FMubWr4XIAIwRJW?format=jpg&name=large',
    cityOfPizza: 'Detroit',
  },
  {
    name: 'striaght to your heart',
    description: 'knee high cheese',
    price: 50.0,
    quantity: 7,
    imageUrl:
      'https://pbs.twimg.com/media/FMZzOxDVIAA2AtR?format=jpg&name=large',
    cityOfPizza: 'Detroit',
  },
  {
    name: 'Tie Dye Pie',
    description: 'Vodka Sauce, tomato sauce, fresh mozz and basil pesto',
    price: 20.0,
    quantity: 7,
    imageUrl:
      '	https://pbs.twimg.com/media/Do3jc53WwAE45-_?format=jpg&name=large',
    cityOfPizza: 'NYC',
  },
  {
    name: 'something simple',
    description: 'fresh mozzeralla and secret sauce',
    price: 10.0,
    quantity: 7,
    imageUrl:
      '	https://pbs.twimg.com/media/CVGRRK6UsAAowut?format=jpg&name=small',
    cityOfPizza: 'NYC',
  },
  {
    name: 'the greek',
    description:
      'Greek inspired pizza, sourdough crust, sauce, raw spinach sprinkled with a little dill & oregano, feta and mozz, layer of garlic roasted sliced eggplant, Kalamata olive, peperoncini, artichoke heart, more mozz & feta and a liberal amount of pepper flakes.',
    price: 60.99,
    quantity: 7,
    imageUrl:
      'https://pbs.twimg.com/media/FM0RDFrVcAAioPX?format=jpg&name=large',
    cityOfPizza: 'Chicago',
  },
  {
    name: 'meatball parm',
    description: 'home made meatballs, with cooked saue and peccorino romano',
    price: 33.99,
    quantity: 7,
    imageUrl:
      'https://pbs.twimg.com/media/Dd31sGEUwAEzaD9?format=jpg&name=large',
    cityOfPizza: 'NYC',
  },

  {
    name: 'Trenton-Style Mustard Pie',
    description:
      'mustard, with a blend of red suace topped with fresh mozzerella',
    price: 10.99,
    quantity: 7,
    imageUrl:
      'https://pbs.twimg.com/media/Dqcuf71WwAAi18r?format=jpg&name=medium',
    cityOfPizza: 'NYC',
  },
  {
    name: 'gum drop meatballs',
    description:
      'cheese crusted edge, with meatballs peccorino and chedder cheese',
    price: 10.99,
    quantity: 7,
    imageUrl:
      'https://pbs.twimg.com/media/Dc70NKtWAAMols7?format=jpg&name=large',
    cityOfPizza: 'Detroit',
  },
];

const fakeUsers = [
  {
    firstName: 'mainAdmin',
    lastName: 'mainAdmin',
    password: '123',
    email: 'Admin',
    isAdmin: true,
  },
  {
    firstName: 'David',
    lastName: 'Dunham',
    password: '12345',
    email: 'daviddfh@gmail.com',
    isAdmin: true,
  },
  {
    firstName: 'Sam',
    lastName: 'Smith',
    password: 'password',
    email: 'daviddfh2@gmail.com',
    isAdmin: true,
  },
  {
    firstName: 'Joe',
    lastName: 'Blow',
    password: 'password',
    email: 'daviddfh3@gmail.com',
  },
  {
    firstName: 'The',
    lastName: 'Admin',
    password: 'password',
    email: 'admin@admin.com',
  },
];

const fakeOrders = [
  { address: '123 Deerborn Lane' },
  { address: '234 Glen Oaks Court' },
  { address: '6123 Deerpath Road' },
];

async function seed() {
  try {
    await db.sync({ force: true });
    console.log('db synced!');
    await Promise.all(fakePizzas.map((pizza) => Pizza.create(pizza)));
    await Promise.all(fakeOrders.map((order) => Order.create(order)));
    await Promise.all(fakeUsers.map((user) => User.create(user)));
  } catch (err) {
    console.log(err);
  }

  console.log(`seeded successfully`);
}

if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!');
      db.close();
    })
    .catch((err) => {
      console.error('Oh noes! Something went wrong!');
      console.error(err);
      db.close();
    });
}

module.exports = seed;

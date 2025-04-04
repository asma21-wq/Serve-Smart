const mongoose = require('mongoose');
const User = require('../models/User');
const Table = require('../models/Table');
const Order = require('../models/Order');
const Menu = require('../models/Menu');

mongoose.connect('mongodb://127.0.0.1:27018/Servesmart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Données d'exemple pour les utilisateurs
const users = [
  {
    name: "Admin Controller",
    role: "admin",
    password: "admin123",
    phoneNumber: "+216 XX XXX XXX",
    email: "admin@servesmart.com"
  },
  {
    name: "Waiter 1",
    role: "waiter",
    additionalInstructions: "Section A"
  },
  {
    name: "Kitchen Staff",
    role: "kitchen"
  },
  {
    name: "Client 1",
    role: "client",
    tableNumber: 1
  }
];

// Données d'exemple pour les tables
const tables = [
  {
    tableNumber: 1,
    status: 'available'
  },
  {
    tableNumber: 2,
    status: 'available'
  },
  {
    tableNumber: 3,
    status: 'available'
  }
];

// Données d'exemple pour le menu
const menuData = {
  categories: [
    {
      name: "Entrées",
      items: [
        {
          name: "Salade César",
          description: "Laitue romaine, croûtons, parmesan",
          price: 12.99,
          available: true
        },
        {
          name: "Soupe à l'oignon",
          description: "Soupe à l'oignon gratinée",
          price: 9.99,
          available: true
        }
      ]
    },
    {
      name: "Plats principaux",
      items: [
        {
          name: "Steak-frites",
          description: "Steak de bœuf avec frites maison",
          price: 24.99,
          available: true
        },
        {
          name: "Poulet rôti",
          description: "Poulet rôti aux herbes",
          price: 19.99,
          available: true
        }
      ]
    },
    {
      name: "Desserts",
      items: [
        {
          name: "Tarte au chocolat",
          description: "Tarte au chocolat noir",
          price: 8.99,
          available: true
        }
      ]
    },
    {
      name: "Boissons",
      items: [
        {
          name: "Café",
          description: "Expresso ou Américain",
          price: 3.99,
          available: true
        },
        {
          name: "Jus frais",
          description: "Orange ou Pomme",
          price: 4.99,
          available: true
        }
      ]
    }
  ]
};

// Fonction pour insérer les données
async function insertSampleData() {
  try {
    // Nettoyer les collections existantes
    await User.deleteMany({});
    await Table.deleteMany({});
    await Menu.deleteMany({});
    await Order.deleteMany({});

    console.log('Collections nettoyées');

    // Insérer les nouvelles données
    const insertedUsers = await User.insertMany(users);
    const insertedTables = await Table.insertMany(tables);
    const insertedMenu = await Menu.create(menuData);

    // Créer une commande d'exemple
    const sampleOrder = {
      table: insertedTables[0]._id,
      client: insertedUsers.find(u => u.role === 'client')._id,
      kitchen: insertedUsers.find(u => u.role === 'kitchen')._id,
      waiter: insertedUsers.find(u => u.role === 'waiter')._id,
      items: [
        {
          menuItem: insertedMenu.categories[0].items[0]._id,
          quantity: 1,
          price: insertedMenu.categories[0].items[0].price
        }
      ],
      status: 'pending',
      totalAmount: insertedMenu.categories[0].items[0].price
    };

    await Order.create(sampleOrder);

    console.log('Données insérées avec succès !');
    
    // Mettre à jour les références
    const waiter = await User.findOne({ role: 'waiter' });
    const kitchen = await User.findOne({ role: 'kitchen' });
    const order = await Order.findOne();
    
    waiter.currentOrders = [order._id];
    kitchen.orders = [order._id];
    
    await waiter.save();
    await kitchen.save();

    console.log('Références mises à jour avec succès !');

  } catch (error) {
    console.error('Erreur lors de l\'insertion des données:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Exécuter l'insertion
insertSampleData(); 
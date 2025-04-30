// const Order = require('../Models/OrderTable');
// const MenuItem = require('../Models/menuItems');

// // Create a new order
// exports.createOrder = async (req, res) => {
//   const { tableNumber, itemId, quantity } = req.body;

//   try {
//     const item = await MenuItem.findById(itemId);
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     const order = new Order({
//       tableNumber,
//       itemName: item.name,
//       quantity,
//       pricePerItem: item.price,
//       totalPrice: item.price * quantity,
//     });

//     await order.save();
//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Fetch all pending orders
// exports.getPendingOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ status: 'Pending' });
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Mark an order as completed
// exports.markAsCompleted = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const order = await Order.findById(id);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     order.status = 'Completed';
//     order.completedAt = new Date();
//     await order.save();

//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };


// //getAllOrders
// // Fetch all orders (Pending + Completed)
// exports.getAllOrders = async (req, res) => {
//     try {
//       const orders = await Order.find(); // Fetch everything
//       res.status(200).json(orders);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
//   };
  

// // Add item to an existing order
// exports.addItemToOrder = async (req, res) => {
//     const { orderId, itemId, quantity } = req.body;
  
//     try {
//       const order = await Order.findById(orderId);
//       if (!order) {
//         return res.status(404).json({ message: 'Order not found' });
//       }
  
//       const item = await MenuItem.findById(itemId);
//       if (!item) {
//         return res.status(404).json({ message: 'Menu item not found' });
//       }
  
//       // Update the order
//       order.itemName += `, ${item.name}`;
//       order.quantity += quantity;
//       order.totalPrice += item.price * quantity;
  
//       await order.save();
//       res.status(200).json(order);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
//   };
  

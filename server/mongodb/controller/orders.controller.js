// import dotenv from 'dotenv'
// import Orders from '../models/orders.model.js';
// import {connectMongoose, connectToMongoDB} from "../baseConnect.js";

// dotenv.config()

// export const getOrders = async(req, res) => {
//     try {
//       connectToMongoDB()
//       const orders = await Orders.find({})
//       res.status(200).json(orders)
//     } catch (error) {
//       res.status(500).json({message: error.message});
//     }
// }

// export const getOrder = async (req, res) => {
//     try {
//       connectToMongoDB()
//       const { id } = req.params;
//       const orderbyid = await Orders.findById(id);
//       res.status(200).json(orderbyid)
//     } catch (error) {
//       res.status(500).json({message: error.message});
//     }
// }

// export const postOrder = async (req, res) => {
//     try {
//         connectToMongoDB()
//         console.log('Request body:', req.body); 
//         const order = await Orders.create(req.body);
//         res.status(200).json(order);
//     } catch(error) {
//         res.status(500).json({message: error.message});
//     }
// }

// export const deltaOrder = async(req, res) => {
//     try { 
//         connectToMongoDB()
//         const {id} = req.params;
//         const Deltedorder = await Orders.findByIdAndDelete(id);

//         if (!Deltedorder) {
//             return res.status(400).json({message: "Order could not be found"})
//         }
//         res.status(200).json({message: "order deleted successfully"});
//     } catch(error) {
//         res.status(500).json({message: error.message});
//     }
// }
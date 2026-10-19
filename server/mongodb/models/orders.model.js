import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
    productObj : [
        {
        id : {
            type: String,
            required: [true, "Product cannot exist without its id"]
        },
        image: {
            type: String,
            required: false,
        },
        name : {
            type: String,
            required: [true, "Plz enter the order name."],
        },
        ratings: {
            type: Object,
            required: [true, "Rate the damn order"],
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        description: {
            type: String,
            required: false,
        },
        keywords : {
            type: Array,
            required: false,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        deliveryOptions: {
            type: Object,
            required: true,
            default: 1,
        },
        seller: {
            type: String,
            required: true
        },
      }
    ], total: Number},
{
    timestamps: true,
})

const Orders = mongoose.model("Orders", OrderSchema, 'orders');
export default Orders;
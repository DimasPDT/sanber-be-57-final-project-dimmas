import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  name: string;
  productId: mongoose.Schema.Types.ObjectId;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  grandTotal: number;
  orderItems: IOrderItem[];
  createdBy: mongoose.Schema.Types.ObjectId;
  status: 'pending' | 'completed' | 'cancelled';
}

const OrderItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1, max: 5 },
});

const OrderSchema: Schema = new Schema({
  grandTotal: { type: Number, required: true },
  orderItems: { type: [OrderItemSchema], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
});

export default mongoose.model<IOrder>('Order', OrderSchema);

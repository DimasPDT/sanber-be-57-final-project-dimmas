import { Request, Response } from 'express';
import Order, { IOrder } from '@/models/order.model';
import Product from '@/models/products.model';
import sendInvoiceEmail from '@/utils/sendInvoiceEmail';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderItems } = req.body;
    const userId = req.user.id; 

    let grandTotal = 0;

    for (const item of orderItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        res.status(404).json({ message: `Product with id ${item.productId} not found` });
        return;
      }
      if (product.qty < item.quantity) {
        res.status(400).json({ message: `Insufficient quantity for product ${product.name}` });
        return;
      }
      grandTotal += item.quantity * product.price;
    }

    const newOrder = new Order({
      grandTotal,
      orderItems,
      createdBy: userId,
    });

    const savedOrder = await newOrder.save();

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { qty: -item.quantity } });
    }

    await sendInvoiceEmail(req.user.email, savedOrder);

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getOrderHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id; // Assuming JWT middleware sets req.user
    const { page = 1, limit = 10 } = req.query;

    const orders = await Order.find({ createdBy: userId })
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order from frontend
const placeOrder = async (req,res) => {

    const frnt_url = "http://localhost:5174"

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_item  = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_item.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:50*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.session.create({
            line_item:line_item,
            mode:'payment',
            success_url:`${frnt_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frnt_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {placeOrder}
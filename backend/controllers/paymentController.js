import Razorpay from "razorpay";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY ,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;


    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY )
      .update(sign.toString())
      .digest("hex");


    
      if (razorpay_signature === expectedSign) {
        
        // Fetch payment details from Razorpay using the payment ID
        const instance = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID ,
          key_secret: process.env.RAZORPAY_SECRET_KEY ,
        });

       const {id ,status ,created_at,email} = await  instance.payments.fetch(razorpay_payment_id);
       const timestamp = created_at;
       const date = new Date(timestamp * 1000);
       const update_time = date.toISOString();
   
       return res.status(200).json({
        message: "Payment completed successfully",
        id,
        status,
        update_time,
        email,
      });

      }else {
      return res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const handler = async(req: any, res: any) => {
    if (req.method === 'POST'){
        try{
             // Create Checkout Sessions from body params.
             const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: process.env.PRICE_ID,
                        quantity: 1,
                    }
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
             });
             res.redirect(303, session.url);

        }
        catch (err: any){
            res.status(err.statusCode || 500).json(err.message);
        }
    }
    else{
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}


export default handler;
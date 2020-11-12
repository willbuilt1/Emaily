const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        if (!req.user) {
            return res.status(401).send({ error: 'You must log in!' });
        }
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 dollars for 5 credits',
            //source is the id of the card back from stripe
            source: req.body.id,
        });

        req.user.credits += 5;
        //save() is asynchronous so returns a promise
        const user = await req.user.save();
        //send back to browser
        res.send(user);
    });
};

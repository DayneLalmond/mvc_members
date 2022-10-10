const router = require('express').Router();
const { User } = require('../../models')

router.post('/', async (req, res) => {
    try {
        const dbUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUser)
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});


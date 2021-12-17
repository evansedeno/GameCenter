const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {Base64} = require('js-base64');
const phash = require('password-hash');

const User = require("../models/User");

//GET -> obtenir tous les utilisateurs
router.get('/', async (req, res, next) => {
    try {
        let foundUsers = await User.find();
        res.json(foundUsers);
    } catch (error) {
        res.status(400).json({message:error});
    }
});

//GET -> obtenir un utilisateur par id
router.get('/:id', async (req, res, next) => {
    const auth = req.header('Authorization');
    if(auth === undefined || auth === null || auth === '') return res.status(400).json({message:'Token not found'});
    const hash = auth.split(' ')[1];
    if(hash === undefined || hash === null || hash === '') return res.status(400).json({message:'Token not found'});

    try {
        const verify = jwt.verify(auth.split(' ')[1], Base64.encode('racingmazeapitoken'));
        let foundUser = await User.findById(req.params.id);
        if(foundUser !== null) {
            res.json(foundUser);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(400).json({message: error});
    }

});

//POST -> créer un nouvel utilisateur
router.post('/',async (req, res, next) => {

    let user = new User({
        prenom: req.body.prenom,
        nom: req.body.nom,
        username: req.body.email.split('@')[0],
        email: req.body.email,
        password: phash.generate(req.body.password),
        personnage:{
            img: req.body.personnage.img
        }
    });
    try{
        let savedUser = await user.save();
        res.json(savedUser);
    } catch(error){
        res.status(400).json({message:error});
    }
});

//POST -> se connecter
router.post('/login', async (req, res, next) => {
    const auth = req.header('Authorization');
    if(auth === undefined || auth === null || auth === '') return res.status(400).json({message:'Authentification not present'});

    const params = Base64.decode(auth.split(' ')[1]).split(':');
    const email = params[0];
    const password = params[1];

    try{
        let loginUser = await User.findOne({email: email});
        if(loginUser !== null && phash.verify(password,loginUser.password)){
            const date = Date.now()
            const token = jwt.sign({
                iat: Math.floor(date/1000),
                exp: Math.floor((date/1000)+3600),
                iss: "https://api.racingmaze.web:10243/connexion",
                aud: "https://api.racingmaze.web:10243",
                id: loginUser._id
            },Base64.encode('racingmazeapitoken'))
            res.json({user:loginUser, token: token});
        } else {
            res.status(400).json({message:'Incorrect email or password'});
        }

    } catch (error){
        res.status(400).json({message:error});
    }
});

//DELETE -> supprimer un utilisateur
router.delete('/:id', async (req, res, next) => {

    try {
        let deletedUser = await User.deleteOne({_id: req.params.id});
        res.json(deletedUser);
    } catch (error) {
        res.status(400).json({message:error});
    }
});

//UPDATE -> modifier les données d'un utilisateur
router.put('/', async (req, res) => {
    const auth = req.header('Authorization');
    if(auth === undefined || auth === null || auth === '') return res.status(400).json({message:'Token not found'});
    const hash = auth.split(' ')[1];
    if(hash === undefined || hash === null || hash === '') return res.status(400).json({message:'Token not found'});

    try {
        const verify = jwt.verify(auth.split(' ')[1], Base64.encode('racingmazeapitoken'));

        let deletedUser = await User.updateOne(
            {_id: verify.id},
            {$set:{
                        prenom: req.body.prenom,
                        nom: req.body.nom,
                        email: req.body.email,
                        username: req.body.username,
                        password: phash.generate(req.body.password),
                        personnage:{
                            img: req.body.personnage.img
                        }
                }});
        res.json(deletedUser);
    } catch (error) {
        res.status(400).json({message:error});
    }
});

module.exports = router;
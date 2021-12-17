const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const GameCode = require('../utils/code_generator');
const {Base64} = require("js-base64");

const Partie = require('../models/Partie');
const User = require('../models/User');


//GET -> obtenir les parties d'un utilisateur / Obtenir tous les parties
router.get('/', async (req,res) => {
    const auth = req.header('Authorization');
    if(auth === undefined || auth === null || auth === '') return res.status(400).json({message:'Token not found'});
    const hash = auth.split(' ')[1];
    if(hash === undefined || hash === null || hash === '') return res.status(400).json({message:'Token not found'});

    try {
        const verify = jwt.verify(auth.split(' ')[1], Base64.encode('racingmazeapitoken'));
        let foundParties;
        if (req.query.userId != null) {
            foundParties = await Partie.find({'users.user._id': req.query.userId});
        } else {
            foundParties = await Partie.find();
        }
        res.json(foundParties);
    }catch (error) {
        // res.status(400).json({error: 'parameter \'userId\' not defined'});
        res.status(400).json({message:error});
    }
});

//GET -> Obtenir les parties publiques
router.get('/publiques', async (req,res) => {
    const auth = req.header('Authorization');
    if(auth === undefined || auth === null || auth === '') return res.status(400).json({message:'Token not found'});
    const hash = auth.split(' ')[1];
    if(hash === undefined || hash === null || hash === '') return res.status(400).json({message:'Token not found'});

    try {
        const verify = jwt.verify(auth.split(' ')[1], Base64.encode('racingmazeapitoken'));
        let foundParties = await Partie.find({type: 1});
        res.json(foundParties);
    }catch (error) {
        res.status(400).json({message:error});
    }
});

//GET -> obtenir une partie par id
router.get('/:id/id', async (req,res) => {
    const auth = req.header('Authorization');
    if(auth === undefined || auth === null || auth === '') return res.status(400).json({message:'Token not found'});
    const hash = auth.split(' ')[1];
    if(hash === undefined || hash === null || hash === '') return res.status(400).json({message:'Token not found'});

    try {
        const verify = jwt.verify(auth.split(' ')[1], Base64.encode('racingmazeapitoken'));
        let foundPartie = await Partie.findById(req.params.id);
        res.json(foundPartie);
    } catch (error) {
        res.status(404).json({message:error});
    }
});

//GET -> obtenir une partie par code
router.get('/:id/code', async (req,res) => {
    const auth = req.header('Authorization');
    if(auth === undefined || auth === null || auth === '') return res.status(400).json({message:'Token not found'});
    const hash = auth.split(' ')[1];
    if(hash === undefined || hash === null || hash === '') return res.status(400).json({message:'Token not found'});

    try {
        const verify = jwt.verify(auth.split(' ')[1], Base64.encode('racingmazeapitoken'));
        let foundPartie = await Partie.findOne({code:req.params.id});
        res.json(foundPartie);
    } catch (error) {
        res.status(404).json({message:error});
    }
});

//POST -> créer une partie
router.post('/',async (req, res) => {
    const auth = req.header('Authorization');
    if(auth === undefined || auth === null || auth === '') return res.status(400).json({message:'Token not found'});
    const hash = auth.split(' ')[1];
    if(hash === undefined || hash === null || hash === '') return res.status(400).json({message:'Token not found'});

    try{
        const verify = jwt.verify(auth.split(' ')[1], Base64.encode('racingmazeapitoken'));
        let foundUser = await User.findById(verify.id);
        let partie = new Partie({
            nom: req.body.nom,
            difficulte: req.body.difficulte,
            type: req.body.type,
            code: null,
            users: {
                user:{
                    _id: foundUser._id,
                    prenom: foundUser.prenom,
                    nom: foundUser.nom,
                    username: foundUser.username,
                    personnage: foundUser.personnage
                },
                type: 1,
                place: null,
                score: null,
                temps: null
            }
        });
        if(req.body.type === 2){
            partie.code = GameCode.generate(partie._id);
        }
        let savedPartie = await partie.save();
        res.json(savedPartie);
    } catch(error){
        res.status(400).json({message:error});
    }
});

//DELETE -> supprimer une partie
router.delete('/:id', async (req, res) => {
    const auth = req.header('Authorization');
    if(auth === undefined || auth === null || auth === '') return res.status(400).json({message:'Token not found'});
    const hash = auth.split(' ')[1];
    if(hash === undefined || hash === null || hash === '') return res.status(400).json({message:'Token not found'});

    try {
        const verify = jwt.verify(auth.split(' ')[1], Base64.encode('racingmazeapitoken'));
        let actualUser = await User.findById(verify.id);
        let actualPartie = await Partie.findById(req.params.id);

        let deletedPartie = await Partie.deleteOne({_id: req.params.id});
        res.json(deletedPartie);
    } catch (error) {
        res.status(400).json({message:error});
    }
});

//PUT -> modifier les données d'une partie
router.put('/:id', async (req, res) => {
    const auth = req.header('Authorization');
    if(auth === undefined || auth === null || auth === '') return res.status(400).json({message:'Token not found'});
    const hash = auth.split(' ')[1];
    if(hash === undefined || hash === null || hash === '') return res.status(400).json({message:'Token not found'});

    try{
        const verify = jwt.verify(auth.split(' ')[1], Base64.encode('racingmazeapitoken'));
        let modifiedPartie = await Partie.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    nom: req.body.nom,
                    difficulte: req.body.difficulte,
                    type: req.body.type,
                    code: (req.body.type === 2) ? GameCode.generate(req.params.id) : null,
                }
            }
        );
        res.json(modifiedPartie);
    } catch (error) {
        res.status(400).json({message:error});
    }
});

//PUT -> ajouter un utilisateur à une partie
router.put('/:id/user', async (req, res) => {
    const auth = req.header('Authorization');
    if(auth === undefined || auth === null || auth === '') return res.status(400).json({message:'Token not found'});
    const hash = auth.split(' ')[1];
    if(hash === undefined || hash === null || hash === '') return res.status(400).json({message:'Token not found'});

    try{
        const verify = jwt.verify(auth.split(' ')[1], Base64.encode('racingmazeapitoken'));
        let foundUser = await User.findById(verify.id);
        let partie = await Partie.findOne({$and:[{"_id":req.params.id},{ "users.user._id" : foundUser._id}]});
        console.log(partie);
        if(partie === null){
            let modifiedPartie = await Partie.updateOne(
                {_id: req.params.id},
                {
                    $push:{
                        users: {
                            user:{
                                _id: foundUser._id,
                                prenom: foundUser.prenom,
                                nom: foundUser.nom,
                                username: foundUser.username,
                                personnage: foundUser.personnage
                            },
                            place: null,
                            score: null,
                            temps: null
                        }
                    }
                }
            );
            res.json(modifiedPartie);
        } else {
            res.status(200).json({message:'The user is already in the game'});
        }
    } catch (error) {
        res.status(400).json({message:error});
    }
});

//PUT -> Insérer les données du labyrinthe
router.put('/:id/labyrinthe', async (req,res) => {
    try{
        let modifiedPartie = await Partie.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    labyrinthe: req.body.labyrinthe
                }
            }
        );
        res.json(modifiedPartie);
    } catch (error) {
        res.status(400).json({message:error});
    }
});


module.exports = router;
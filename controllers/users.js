const User = require('../models/user');

// возвращает всех пользователей
const usersGet = (req, res) => {
    User.find({})
        .then(users => res.send(users))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в выводе списка пользователей', error: err }));
};

// возвращает пользователя по _id
const userGet = (req, res) => {
    User.findById(req.params.userId)
        .then(user => res.send(user))
        .catch(err => res.status(404).send({ message: 'Произошла ошибка в выводе пользователя', error: err }));
};

// обновляет профиль
const userProfilePatch = (req, res) => {
    const {name, avatar} = req.body;
    const data = avatar ? {name, avatar} : {name};

    User.findByIdAndUpdate(req.user._id, data, { runValidators: true, new: true })
        .then(user => res.send(user))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в обновлении информации пользователя', error: err }));
};

// обновляет аватар
const userProfileAvatarPatch = (req, res) => {
    const {avatar} = req.body;

    User.findByIdAndUpdate(req.user._id, {avatar}, { runValidators: true, new: true })
        .then(user => res.send(user))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в обновлении аватарки пользователя', error: err }));
};

// создаёт пользователя
const userPost = (req, res) => {
    const {name, about, avatar} = req.body;

    User.create({name, about, avatar})
        .then(user => res.send({name: user.name, about: user.about}))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в создании нового пользователя', error: err }));
};

module.exports = {usersGet, userGet, userPost, userProfilePatch, userProfileAvatarPatch};

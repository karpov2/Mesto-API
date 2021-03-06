module.exports = class ErrorMessage {
    constructor(err, fn, res) {
        this.error = err;
        this.errors(this[fn]());
        this.messages(res);
    }

    errors(error) {
        this.status = error.status;
        this.message = error.message;
    }

    messages(res) {
        res.status(this.status).json({ message: this.message, error: this.error });
    }

    cardLikeDelete() {
        const error = {};
        switch (this.error.name) {
        case 'CastError':
            error.status = 500;
            error.message = 'Произошла ошибка в удалении лайка карточки';
            break;
        case 'DocumentNotFoundError':
            error.status = 404;
            error.message = 'Не могу удалить лайк несуществующей карточки';
            break;
        default:
            error.status = 500;
            error.message = 'Ошибка сервера';
            break;
        }
        return error;
    }

    cardLikePut() {
        const error = {};
        switch (this.error.name) {
        case 'CastError':
            error.status = 500;
            error.message = 'Произошла ошибка в добавлении лайка карточки';
            break;
        case 'DocumentNotFoundError':
            error.status = 404;
            error.message = 'Не могу добавить лайк несуществующей карточки';
            break;
        default:
            error.status = 500;
            error.message = 'Ошибка сервера';
            break;
        }
        return error;
    }

    getUserId() {
        const error = {};
        switch (this.error.name) {
        case 'CastError':
            error.status = 500;
            error.message = 'Некорректный id пользователя';
            break;
        case 'DocumentNotFoundError':
            error.status = 404;
            error.message = 'Данного пользователя нет в базе';
            break;
        default:
            error.status = 500;
            error.message = 'Ошибка сервера';
            break;
        }
        return error;
    }

    postUser() {
        const error = {};
        switch (this.error.name) {
        case 'MongoError':
            error.status = 409;
            error.message = 'Произошел конфликт, такой email уже существует';
            break;
        case 'ValidationError':
            error.status = 500;
            error.message = 'Ошибка валидации формы';
            break;
        default:
            error.status = 500;
            error.message = 'Ошибка сервера';
            break;
        }
        return error;
    }

    login() {
        const error = {};
        switch (this.error.name) {
        case 'DocumentNotFoundError':
            error.status = 409;
            error.message = 'Произошла ошибка при авторизации, неверный email или пароль';
            break;
        case 'Unauthorized':
            error.status = 401;
            error.message = 'Произошла ошибка при авторизации, неверный email или пароль';
            break;
        default:
            error.status = 500;
            error.message = 'Ошибка сервера';
            break;
        }
        return error;
    }

    cardsGet() {
        const error = {};
        switch (this.error.name) {
        case 'DocumentNotFoundError':
            error.status = 404;
            error.message = 'Произошла ошибка в выводе списка карточек';
            break;
        default:
            error.status = 500;
            error.message = 'Ошибка сервера';
            break;
        }
        return error;
    }

    cardPost() {
        const error = {};
        switch (this.error.name) {
        case 'DocumentNotFoundError':
            error.status = 404;
            error.message = 'Произошла ошибка в создании новой карточки';
            break;
        case 'ValidationError':
            error.status = 500;
            error.message = 'Ошибка валидации формы';
            break;
        default:
            error.status = 500;
            error.message = 'Ошибка сервера';
            break;
        }
        return error;
    }

    cardDelete() {
        const error = {};
        switch (this.error.name) {
        case 'CastError':
            error.status = 500;
            error.message = 'Произошла ошибка в удалении карточки, неверно указана карточка';
            break;
        case 'DocumentNotFoundError':
            error.status = 404;
            error.message = 'Произошла ошибка в удалении карточки, данной карточки не существует';
            break;
        case 'ForbiddenError':
            error.status = 403;
            error.message = 'Произошла ошибка в удалении карточки, у вас нет прав на удаление данной карточки';
            break;
        default:
            error.status = 500;
            error.message = 'Ошибка сервера';
            break;
        }
        return error;
    }

    auth() {
        const error = {};
        switch (this.error.name) {
        case 'Unauthorized':
            error.status = 401;
            error.message = 'Необходима авторизация';
            break;
        case 'DocumentNotFoundError':
            error.status = 404;
            error.message = 'Пользователь удален, необходимо снова зарегистрироваться';
            break;
        default:
            error.status = 500;
            error.message = 'Ошибка сервера';
            break;
        }
        return error;
    }
};

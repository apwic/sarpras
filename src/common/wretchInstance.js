import wretch from 'wretch';
import { storage } from './storage';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';

const handleUnauthorizedError = () => {
    storage.removeToken();
    window.location.href = '/';
};

const handleError = (alert) => (error) => {
    alert();
    console.log(error);
};

export const wretchInstance = () =>
    wretch()
        .addon(FormDataAddon)
        .addon(QueryStringAddon)
        .auth(`Bearer ${storage.getToken()}`)
        .catcher(401, handleUnauthorizedError)
        .catcher(400, handleError(withAlert('Bad Request')))
        .catcher(500, handleError(withAlert('Internal Server Error')));

const withAlert = (message) => () => window.alert(message);

import wretch from 'wretch';
import { storage } from './storage';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';

const handleUnauthorizedError = () => {
    storage.removeCreds();
    window.location.href = '/';
};

export const wretchInstance = () =>
    wretch()
        .addon(FormDataAddon)
        .addon(QueryStringAddon)
        .auth(`Bearer ${storage.getToken()}`)
        .catcher(401, handleUnauthorizedError)
        .catcher(400, (err) => window.alert(err))
        .catcher(500, (err) => window.alert(err));

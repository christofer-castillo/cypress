import {
    access_token
} from 'support/utils';

export const getHeaders = (hasJsonBody = false) => {
    const headers = {
        Authorization: `Bearer ${access_token}`
        // any other headers that are specific to a resource
    }

    if (hasJsonBody) {
        headers['Content-Type'] = 'application/json';
    }

    return headers;
};
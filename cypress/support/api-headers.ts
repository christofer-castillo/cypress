import { access_token } from 'support/utils';

export const getHeaders = (hasJsonBody = false) => {
    const headers: Headers = new Headers();

    headers.append('Authorization', `Bearer ${access_token}`);

    if (hasJsonBody) {
        headers.append('Content-Type', 'application/json');
    }

    return headers;
};
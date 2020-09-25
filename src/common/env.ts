export const serverUrl =
    process.env.NODE_ENV === 'production' ?
        'https://www.kaixa.cn/' :
        'http://127.0.0.1:5000/';

export const urlFor = (path: string) => {
    return serverUrl + path;
};
export const serverUrl =
    process.env.NODE_ENV === 'production' ?
        'https://www.kaixa.cn' :
        'https://www.kaixa.cn';

export const urlFor = (path: string) => {
    if (path.startsWith('/')) {
        return serverUrl + path;
    }
    return serverUrl + '/' + path;
};

export const webUrl =
    process.env.NODE_ENV === 'production' ?
        'http://localhost:3000/' :
        'https://woodykaixa.github.io/';
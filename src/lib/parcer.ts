import axios, { AxiosRequestConfig } from 'axios';

export default async function getImageStream(imgUrl: string) {
    const options: AxiosRequestConfig = {
        url: imgUrl,
        method: 'GET',
        responseType: 'arraybuffer',
        headers: {
            Referer: 'http://www.pixiv.net/',
        },
    };

    const response = await axios(options);
    return response.data;
}

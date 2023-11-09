import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
const jwt = require('jsonwebtoken');
import { JWT } from 'next-auth/jwt';

interface IToken {
    accountToken: string
    email: string
    exp: number
    iat: number
    id: string
    image: string
    name: string
    picture: string
    sub: string
}

export const getAccessToken = () => {
    // If tokenFromUrl exists, Website is currently opened in WebView of mobile app
    try {
        const jwtToken = Cookies.get('next-auth.session-token')
        let accountToken = ''
        if (jwtToken) {
            const decoded: IToken = jwtDecode(jwtToken)
            accountToken = decoded.accountToken
        }
        return accountToken

    } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

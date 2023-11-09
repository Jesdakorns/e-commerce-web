import store from "store2";

const AUTH = 'issueLink';
export class AuthStorage {
    static set = (data: any) => {
        return store.session.set(AUTH, data);
    };
    static get = () => {
        return store.session.get(AUTH) || '';
    };
    static remove = () => {
        return store.session.remove(AUTH);
    };
}

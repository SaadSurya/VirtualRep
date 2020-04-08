export default class SessionService {
    static createSession(username) {
        let session = { username };
        localStorage.setItem('session', JSON.stringify(session));
        return session;
    }

    static setSession(data) {
        let session = localStorage.getItem('session');
        session = JSON.parse(session);
        session = { ...session, ...data };
        localStorage.setItem('session', session);
        return session;
    }

    static getSession() {
        let session = localStorage.getItem('session');
        return JSON.parse(session);
    }
}
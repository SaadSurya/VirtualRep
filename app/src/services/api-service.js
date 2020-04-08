
export default class ApiService {
    
    static getBaseUrl = () => {
        let DEV_URL = '';
        if (process.env.NODE_ENV === 'development') {
            DEV_URL = 'http://localhost:3000';
        }
        return DEV_URL;
    }
}
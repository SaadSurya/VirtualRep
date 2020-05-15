import ApiService from "./api-service";
import axios from 'axios'

export default class EmailService {
    static sendEmail({ to, cc, subject, body }) {
        return axios.post(ApiService.getBaseUrl()+'/api/v1/email/send', {
            to,
            cc,
            subject,
            body
        });
    }
}
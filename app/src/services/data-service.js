
export default class dataservice {

    static saveData({ to, cc, subject, body }) {
        return axios.post(ApiService.getBaseUrl()+'/email/send', {
            to,
            cc,
            subject,
            body
        });
    }

}
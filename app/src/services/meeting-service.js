import ApiService from "./api-service";

export default class MeetingService {
    static async getMeetingById(id) {
        const meeting = await fetch(ApiService.getBaseUrl()+`/meeting/${id}`).then(res => res.json());
        return meeting;
    }
}
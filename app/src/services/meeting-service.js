import ApiService from "./api-service";

export default class MeetingService {
    static async getMeetingById(id) {
        const meeting = await fetch(ApiService.getBaseUrl()+`/api/v1/meeting/${id}`).then(res => res.json());
        return meeting;
    }
}
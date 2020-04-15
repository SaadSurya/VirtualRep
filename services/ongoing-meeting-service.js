const { getUserByUsername } = require('./user-service');
const { getMeetingById } = require('./meeting-service');
const ongoing_meetings = [];

const initiateMeeting = (meetingId, username) => {
    console.log('initiate meeting called')
    const user = getUserByUsername(username);
    let meeting = getMeetingById(meetingId);
    meeting = {...meeting, users:[user], initiator: user, startTime: new Date()}
    //const meeting = { id: meetingId, users: [user], initiator: user, startTime: new Date(), currentSlideId: 1 }
    ongoing_meetings.push(meeting);
    return meeting;
}

const joinMeeting = (meetingId, username) => {
    console.log('join meeting called');
    let meeting = ongoing_meetings.find(meeting => meeting.id == meetingId);
    if (!meeting) {
        meeting = initiateMeeting(meetingId, username)
    }
    const user = getUserByUsername(username);
    meeting.users.push(user);
    return meeting;
}

const endMeeting = (meetingId) => {
    return ongoing_meetings.splice(ongoing_meetings.findIndex(meeting => meeting.id == meetingId), 1)[0];
}

const changeSlide = (meetingId, slideId) => {
    console.log(ongoing_meetings);    
    const meeting = ongoing_meetings.find(meeting => meeting.id == meetingId);
    if(meeting && meeting.slides) {
        meeting.slides.forEach(slide => slide.isCurrent = slide.id == slideId ? true : false);
    }
    return meeting;
}

module.exports = { initiateMeeting, joinMeeting, endMeeting, changeSlide }
const { getUserByUsername } = require('./user-service');
const { getMeetingById } = require('./meeting-service');
const ongoing_meetings = [];

const getOngoinMeetingById = (id) => {
    return ongoing_meetings.find(meeting => meeting.id == id);
}

const initiateMeeting = (meetingId, username, socketId) => {
    console.log('initiate meeting called')
    let user = getUserByUsername(username);
    if(!user) {
        user = { username, name: username}
    }
    thisUser = {...user};
    thisUser.socketId = socketId;
    let meeting = getMeetingById(meetingId);
    meeting = { ...meeting, users: [], initiator: thisUser, startTime: new Date() }
    //const meeting = { id: meetingId, users: [user], initiator: user, startTime: new Date(), currentSlideId: 1 }
    ongoing_meetings.push(meeting);
    return meeting;
}

const joinMeeting = (meetingId, username, socketId) => {
    console.log('join meeting called');
    let meeting = ongoing_meetings.find(meeting => meeting.id == meetingId);
    if (!meeting) {
        meeting = initiateMeeting(meetingId, username)
    }
    let user = getUserByUsername(username);
    if(!user) {
        user = { username, name: username}
    }
    thisUser = {...user};
    thisUser.socketId = socketId;
    meeting.users.push(thisUser);
    return meeting;
}

const endMeeting = (meetingId) => {
    return ongoing_meetings.splice(ongoing_meetings.findIndex(meeting => meeting.id == meetingId), 1)[0];
}

const changeSlide = (meetingId, slideId) => {
    console.log(ongoing_meetings);
    const meeting = ongoing_meetings.find(meeting => meeting.id == meetingId);
    let changedSlide;
    if (meeting && meeting.slides) {
        meeting.slides.forEach(slide => {
            if (slide.id == slideId) {
                slide.isCurrent = true;
                changedSlide = slide;
            } else {
                slide.isCurrent = false;
            }
        });
    }
    return changedSlide;
}

const setSlideState = (meetingId, slideId, slideState) => {
    const meeting = ongoing_meetings.find(meeting => meeting.id == meetingId);
    if (meeting) {
        const slide = meeting.slides.find(slide => slide.id == slideId);
        if (slide) {
            slide.state = slideState;
        }
    }
}

module.exports = { getOngoinMeetingById, initiateMeeting, joinMeeting, endMeeting, changeSlide, setSlideState }
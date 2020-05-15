const socketio = require('socket.io');
const { getOngoinMeetingById, initiateMeeting, joinMeeting, endMeeting, changeSlide, setSlideState } = require('./services/ongoing-meeting-service');
const socket = {
    configure: function (server) {
        const io = socketio(server);
        io.on('connection', (socket) => {
            socket.on('disconnecting', () => {
                Object.keys(socket.rooms).forEach(meetingId => {
                    const meeting = getOngoinMeetingById(meetingId);
                    if (meeting) {
                        const user = meeting.users.find(user => user.socketId == socket.id);
                        meeting.users.splice(meeting.users.indexOf(user), 1);
                        socket.broadcast.to(meetingId).emit('left', { user });
                    }
                })
            });
            socket.on('join', ({ username, meetingId }, callback) => {
                console.log('Welcome to meeting!');
                if (!username) {
                    username = 'anonymous';
                }
                const meeting = joinMeeting(meetingId, username, socket.id);
                const user = meeting.users.find(u => u.socketId == socket.id);
                socket.join(meetingId);
                socket.broadcast.to(meetingId).emit('joined', { user });
                //socket.broadcast.to(meetingId).emit('notification', { data: { socketId: socket.id }, text: `${username} has joined the meeting.` });
                callback(meeting);
                //return callback();
            });
            socket.on('slide-change', ({ meetingId, currentSlideId }, callback) => {
                const slide = changeSlide(meetingId, currentSlideId);
                if(slide) {
                    socket.broadcast.to(meetingId).emit('slide-changed', { currentSlideId, slideState: slide.state });
                }
            });
            socket.on('slide-video-play', ({ meetingId }) => {
                console.log('slide-video-play');
                socket.broadcast.to(meetingId).emit('slide-video-played', {});
            });
            socket.on('slide-video-pause', ({ meetingId }) => {
                console.log('slide-video-pause');
                socket.broadcast.to(meetingId).emit('slide-video-paused', {});
            });
            socket.on('slide-video-seek', ({ meetingId, seconds }) => {
                console.log('slide-video-seek');
                socket.broadcast.to(meetingId).emit('slide-video-seeked', { seconds });
            });
            socket.on('slide-video-fullscreen-change', ({ meetingId, isFullscreen }) => {
                console.log('slide-video-fullscreen-change');
                socket.broadcast.to(meetingId).emit('slide-video-fullscreen-changed', { isFullscreen });
            });
            socket.on('slide-state-change', ({ meetingId, slideId, slideState }) => {
                console.log('slide-state-change');
                setSlideState(meetingId, slideId, slideState);
                socket.broadcast.to(meetingId).emit('slide-state-changed', { slideId, slideState });
            });
            socket.on('meeting-end', ({ meetingId }) => {
                console.log('meeting-end');

                socket.broadcast.to(meetingId).emit('meeting-ended', {});
            });
            socket.on('make-offer', function ({ offer, to }) {
                socket.to(to).emit('offer-made', { offer, by: socket.id });
            });
            socket.on('make-answer', function ({ answer, to }) {
                socket.to(to).emit('answer-made', { answer, by: socket.id });
            });
            socket.on('ice-candidate', function ({ candidate, to }) {
                socket.to(to).emit('ice-candidate', { candidate, by: socket.id });
            });
        });

    }
}

module.exports = socket;
const socketio = require('socket.io');
const { initiateMeeting, joinMeeting, endMeeting, changeSlide } = require('./services/ongoing-meeting-service');
const socket = {
    configure: function (server) {
        const io = socketio(server);
        io.on('connection', (socket) => {
            socket.on('join', ({ username, meetingId }, callback) => {
                console.log('Welcome to meeting!');
                if(!username){
                    username = 'anonymous';
                }
                const meeting = joinMeeting(meetingId, username);
                socket.join(meetingId);
                socket.broadcast.to(meetingId).emit('notification', { text: `${username} has joined the meeting.` });
                callback(meeting);
                //return callback();
            });
            socket.on('slide-change', ({ meetingId, currentSlideId }, callback) => {
                const meeting = changeSlide(meetingId, currentSlideId);
                socket.broadcast.to(meetingId).emit('slide-changed', { meetingId, currentSlideId });
                callback(meeting);
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
                socket.broadcast.to(meetingId).emit('slide-state-changed', { slideId, slideState });
            });
        });
        
    }
}

module.exports = socket;
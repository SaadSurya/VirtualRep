const SLIDE_TYPE = {
    _IMAGE: 'IMG',
    _VIDEO: 'VID',
    _SURVEY: 'SUR'
}
const QUESTION_TYPE = {
    _FREE_TEXT: 'FREE_TEXT',
    _MULTI_SELECT: 'MULTI_SELECT',
    _SINGLE_SELECT: 'SINGLE_SELECT'
}
const _MEETINGS = [
    {
        id: 1,
        users: [],
        initiator: null,
        currentSlideId: null,
        startTime: null,
        entTime: null,
        slides: [
            {
                id: 1,
                type: SLIDE_TYPE._IMAGE,
                url: '/documents/company1/product1/image1.jpeg'
            },
            {
                id: 2,
                type: SLIDE_TYPE._IMAGE,
                url: '/documents/company1/product1/image2.jpeg'
            },
            {
                id: 3,
                type: SLIDE_TYPE._IMAGE,
                url: '/documents/company1/product1/image3.jpeg'
            },
            {
                id: 4,
                type: SLIDE_TYPE._IMAGE,
                url: '/documents/company1/product1/image4.jpeg'
            },
            {
                id: 5,
                type: SLIDE_TYPE._VIDEO,
                url: '/documents/company1/product1/video1.mp4',
                thumbnail: '/documents/company1/product1/video1_thumbnail.png'
            },
            {
                id: 6,
                type: SLIDE_TYPE._SURVEY,
                survey: {
                    surveyId: 1,
                    surveyName: 'Survey 1',
                    questions: [
                        {
                            id: 1,
                            text: 'Question text goes here...?',
                            type: QUESTION_TYPE._FREE_TEXT
                        },
                        {
                            id: 2,
                            text: 'Another Question text goes here...?',
                            type: QUESTION_TYPE._MULTI_SELECT,
                            options: [
                                { value: 1, text: 'Option 1' },
                                { value: 2, text: 'Option 2' },
                                { value: 3, text: 'Option 3' }
                            ]
                        },
                        {
                            id: 3,
                            text: 'Yet another Question text goes here...?',
                            type: QUESTION_TYPE._SINGLE_SELECT,
                            options: [
                                { value: 'A', text: 'Option 1' },
                                { value: 'B', text: 'Option 2' },
                                { value: 'C', text: 'Option 3' }
                            ]
                        }
                    ]
                }

            }
        ]
    }
];

const getMeetingById = (id) => {
    return _MEETINGS.find(meeting => meeting.id == id);
}

module.exports = { getMeetingById }
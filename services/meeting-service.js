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
                type: SLIDE_TYPE._SURVEY,
                survey: {
                    id: 1,
                    name: 'Acute Coronary Syndrome (ACS) Challenge',
                    description: 'Before we start our discussion, please answer this brief survey.',
                    questions: [
                        {
                            id: 1,
                            text: 'Acute coronary syndromes, just like heart failure and stroke, are much more likely in people who have certain risk factors. These include:',
                            type: QUESTION_TYPE._SINGLE_SELECT,
                            options: [
                                { value: 'S', text: 'Smoking' },
                                { value: 'D', text: 'Diabetes' },
                                { value: 'C', text: 'High cholesterol' },
                                { value: 'B', text: 'High blood pressure' },
                                { value: 'F', text: 'Family history' },
                                { value: 'A', text: 'All above' }
                            ]
                        }
                    ]
                }

            },
            {
                id: 2,
                type: SLIDE_TYPE._IMAGE,
                url: '/documents/company1/product1/image1.jpeg'
            },
            {
                id: 3,
                type: SLIDE_TYPE._IMAGE,
                url: '/documents/company1/product1/image2.jpeg'
            },
            {
                id: 4,
                type: SLIDE_TYPE._IMAGE,
                url: '/documents/company1/product1/image3.jpeg'
            },
            {
                id: 5,
                type: SLIDE_TYPE._IMAGE,
                url: '/documents/company1/product1/image4.jpeg'
            },
            {
                id: 6,
                type: SLIDE_TYPE._VIDEO,
                url: '/documents/company1/product1/video1.mp4',
                thumbnail: '/documents/company1/product1/video1_thumbnail.png'
            },
            {
                id: 7,
                type: SLIDE_TYPE._SURVEY,
                survey: {
                    id: 2,
                    name: 'Diabetic Survey of Distant Engagement',
                    description: 'We would like to have your opinion in relation to management of diabetic patients.',
                    questions: [
                        {
                            id: 1,
                            text: 'How many diabetic patients do you see in a month?',
                            type: QUESTION_TYPE._MULTI_SELECT,
                            options: [
                                { value: 1, text: '\< 10' },
                                { value: 2, text: '10 - 20' },
                                { value: 3, text: '21 - 30' },
                                { value: 4, text: '\> 30' }
                            ]
                        },
                        {
                            id: 2,
                            text: 'Which group of oral anti-diabetics do you prefer to treat your newly diagnosed diabetic patients?',
                            type: QUESTION_TYPE._MULTI_SELECT,
                            options: [
                                { value: 1, text: 'Sulfonylureas (Gliclazide, Glibenclamide, Glimepiride)' },
                                { value: 2, text: 'Biguanides (Metformin)' },
                                { value: 3, text: 'DPP4 Inhibitors (Sitagliptin, Linagliptin)' },
                                { value: 4, text: 'SGLT2 Inhibitors (Dapagliflozin, Empagliflozin)' },
                                { value: 5, text: 'Thiazolidinediones (Pioglitazone)' },
                                { value: 6, text: 'Meglitinides (Repaglinide)' },
                                { value: 7, text: 'Alpha-glucosidase Inhibitors (Acarbose)' },
                            ]
                        },
                        {
                            id: 3,
                            text: 'What is the main reason for your preference?',
                            type: QUESTION_TYPE._MULTI_SELECT,
                            options: [
                                { value: 1, text: 'Efficacy' },
                                { value: 2, text: 'Safety' },
                                { value: 3, text: 'Dosage convenience' },
                                { value: 4, text: 'Patient affordability' },
                                { value: 5, text: 'HbA1c control' },
                                { value: 6, text: 'No/minimum microvascular/macrovascular complications with long-term use' }
                            ]
                        },
                        {
                            id: 4,
                            text: 'Which group of oral anti-diabetics in your opinion is most beneficial for reducing progression of renal failure?',
                            type: QUESTION_TYPE._FREE_TEXT
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
import Notice from '../models/Notice.js';

 
 
 
const addNotice = async (req, res) => {
    const { title, content, postedBy } = req.body;

    try {
        const notice = new Notice({
            title,
            content,
            postedBy
        });

        const createdNotice = await notice.save();
        res.status(201).json(createdNotice);
    } catch (error) {
        res.status(400).json({ message: 'Invalid notice data', error: error.message });
    }
};

 
 
 
const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find({}).sort({ date: -1 });
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { addNotice, getNotices };

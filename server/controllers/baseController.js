// ./server/controllers/baseController.js

exports.getBaseResponse = (req, res) => {
    res.status(200).json({ message: 'Use host:port/helloworld for testing' });
};

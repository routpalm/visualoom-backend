// ./server/controllers/baseController.js


exports.getBaseResponse = (req, res) => {
    console.log('Base route accessed');
    res.send("Hello World!");
    // res.status(200).json({ message: 'Use host:port/helloworld for testing' });
};

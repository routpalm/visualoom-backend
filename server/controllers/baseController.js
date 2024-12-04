// ./server/controllers/baseController.js


// Provides response for base url, directing
// the user to the GitHub repo.


exports.getBaseResponse = (req, res) => {
    console.log('Base route accessed');
    res.send("API Documentation aailable at https://github.com/routpalm/visualoom-backend");
    // res.status(200).json({ message: 'Use host:port/helloworld for testing' });
};

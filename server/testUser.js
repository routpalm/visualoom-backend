const { sequelize, User } = require('./models');

const testUserModel = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        // Test User creation
        const user = await User.create({
            googleId: '123456',
            email: 'test@example.com',
            name: 'Test User',
        });

        console.log('User Created:', user);

        // Test User retrieval
        const foundUser = await User.findOne({ where: { googleId: '123456' } });
        console.log('User Found:', foundUser);

        // Test duplicate email or googleId
        try {
            await User.create({
                googleId: '123456',
                email: 'test@example.com',
                name: 'Duplicate Test',
            });
        } catch (error) {
            console.error('Duplicate Test Error:', error);
        }
    } catch (err) {
        console.error('Test Error:', err);
    }
};

testUserModel();

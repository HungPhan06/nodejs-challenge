const authentication = require('../middleware/auth');

module.exports = (app) => {
    app.group('/api', (router) => {
        router.group('/v1', (v1) => {
            v1.use('/auth', require('./public/auth'));
            v1.use('/products', require('./public/product'));
            v1.use('/categories', require('./public/category'));
            v1.use('/subcategories', require('./public/subcategory'));

            v1.group('', (protectedRoutes) => {
                protectedRoutes.use(authentication);
                protectedRoutes.use('/products', require('./protected/product'));
            });
        });
    });
};
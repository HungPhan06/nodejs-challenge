const authentication = require('../middleware/auth');
const optionalAuthentication = require('../middleware/optionalAuth');

module.exports = (app) => {
    app.group('/api', (router) => {
        router.group('/v1', (v1) => {
            v1.use('/auth', require('./public/auth'));
            v1.group('', (optAuthRoute) => {
                optAuthRoute.use(optionalAuthentication)
                optAuthRoute.use('/products', require('./public/product'));
                optAuthRoute.use('/categories', require('./public/category'));
                optAuthRoute.use('/subcategories', require('./public/subcategory'));
            });
            v1.group('', (protectedRoutes) => {
                protectedRoutes.use(authentication);
                protectedRoutes.use('/products', require('./protected/product'));
            });
        });
    });
};
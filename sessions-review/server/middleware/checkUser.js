module.exports = function( req, res, next ) {

    if ( !req.session.user ) {
        req.session.user = { id: 0, first: 'Jimmy', last: 'Neutron', age: 10, favColor: 'blue', userType: 'chicken' };
    } 

    next();
};
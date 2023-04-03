const { body, validationResult } = require('express-validator');

exports.userValidation = [ 
    body('email', 'Invalid email id').isEmail(),
    body('name', 'Name have at least 5 character').isLength({ min: 5}),
    body('password', 'Password have at least 5 character').isLength({ min: 5}),
    
    (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    next();
}]
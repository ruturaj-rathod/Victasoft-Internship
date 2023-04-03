const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    // console.log("At send token" + token);

    //cookie options
    const options = {
        expires: new Date(
            Date.now() + 1000 * 60 * 60 * 24 
        ),
        httpOnly : true
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        auth_token: token,
        email: user.email
    });
}

module.exports = sendToken;
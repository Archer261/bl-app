export const isAdmin = (req, res, next) => {
    // Check if the user is an admin
    if (req.user && req.user.isAdmin) {
        console.log(req.user)
        // User is an admin, proceed to the next middleware or route handler
        next();
    } else {
        // User is not an admin, return an error response
        res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }
};

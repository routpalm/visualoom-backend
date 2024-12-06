// ./server/middleware/authMiddleware.js
//
// Author - Nick Anthony
// Created - 11/1/2024
//
// Middleware to ensure that the user is authenticated before allowing access
// to certain routes.
//
// Description:
// This middleware function is used to protect routes that require the user
// to be authenticated. It checks if the user is logged in (authenticated)
// and if so, allows the request to proceed to the next middleware or route handler.
// If the user is not authenticated, they are redirected to the Google authentication page.


/**
 * Middleware to check if the user is authenticated.
 *
 * This function checks whether the user is authenticated using the `req.isAuthenticated()`
 * method provided by Passport.js. If the user is authenticated, it calls `next()` to
 * allow the request to proceed. If not, it redirects the user to the Google authentication page.
 *
 * @param {Object} req - The request object containing user session information.
 * @param {Object} res - The response object used to send a redirect if not authenticated.
 * @param {Function} next - The next middleware function to call if authenticated.
 */
function ensureAuthenticated(req, res, next) {
    // If the user is authenticated, proceed to the next middleware or route handler
    if (req.isAuthenticated()) {
      return next();
    }
    // If the user is not authenticated, redirect them to the Google login page
    res.redirect('/auth/google');
  }

  // Export middleware
  module.exports = ensureAuthenticated;

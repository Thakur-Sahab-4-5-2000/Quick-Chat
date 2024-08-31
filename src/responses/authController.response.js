const authControllerResponseMessage = {
  login: {
    success: {
      status: 200,
      message: "Login successful.",
    },
    failure: {
      invalidCredentials: {
        status: 401,
        message: "Invalid credentials.",
      },
      general: {
        status: 500,
        message: "An error occurred during login.",
      },
    },
  },
  registration: {
    success: {
      status: 201,
      message: "Registration successful.",
    },
    failure: {
      emailExists: {
        status: 400,
        message: "Email already exists.",
      },
      usernameExists: {
        status: 400,
        message: "Username already exists.",
      },
      general: {
        status: 500,
        message: "An error occurred during registration.",
      },
    },
  },
  refreshToken: {
    success: {
      status: 200,
      message: "Token refreshed successfully.",
    },
    failure: {
      noToken: {
        status: 400,
        message: "No refresh token provided.",
      },
      invalidToken: {
        status: 401,
        message: "Invalid refresh token.",
      },
      general: {
        status: 500,
        message: "An error occurred while refreshing the token.",
      },
    },
  },
};

export default authControllerResponseMessage;
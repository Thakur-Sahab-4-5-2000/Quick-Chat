const chartGroupResponseMessage = {
  createChartGroup: {
    success: {
      status: 201,
      message: "Chart group created successfully.",
    },
    failure: {
      invalidData: {
        status: 400,
        message: "Invalid data provided.",
      },
      general: {
        status: 500,
        message: "An error occurred during chart group creation.",
      },
      notFound: {
        status: 401,
        message: "You don't have permission to create this chat group.",
      },
      exist: {
        status: 201,
        message: "Group already exits try another title for this group.",
      },
    },
  },
  updateChartGroup: {
    success: {
      status: 200,
      message: "Chart group updated successfully.",
    },
    failure: {
      notFound: {
        status: 404,
        message: "Chart group not found.",
      },
      invalidData: {
        status: 400,
        message: "Invalid data provided.",
      },
      general: {
        status: 500,
        message: "An error occurred during chart group update.",
      },
    },
  },
  deleteChartGroup: {
    success: {
      status: 200,
      message: "Chart group deleted successfully.",
    },
    failure: {
      notFound: {
        status: 404,
        message: "Chart group not found.",
      },
      general: {
        status: 500,
        message: "An error occurred during chart group deletion.",
      },
    },
  },
  getChartGroup: {
    success: {
      status: 200,
      message: "Chart group retrieved successfully.",
    },
    failure: {
      notFound: {
        status: 404,
        message: "Chart group not found.",
      },
      general: {
        status: 500,
        message: "An error occurred while retrieving the chart group.",
      },
    },
  },
};

export default chartGroupResponseMessage;

import { clerkClient } from "@clerk/express";

// Middleware to protect educator routes
export const protectEducator = async (req, res, next) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No authentication info found.",
      });
    }

    const userId = req.auth.userId;
    const user = await clerkClient.users.getUser(userId);

    // Check if role exists and is educator
    if (user.publicMetadata?.role !== "educator") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Educator access only.",
      });
    }

    next();
  } catch (error) {
    console.error("Error in protectEducator middleware:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

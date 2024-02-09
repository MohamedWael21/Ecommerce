import catchAsyncError from "../middleware/catchAsyncError";
import User from "../models/users";
import { NextFunction, Request, Response } from "express";
import MyError from "../utils/MyError";
import sendToken from "../utils/jwtToken";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";
export const registerUser = catchAsyncError(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "this is a simple id",
        url: "profileurl",
      },
    });
    sendToken(user, 201, res);
  }
);

export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new MyError("Please Enter Email and Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new MyError("Invalid email or password", 401));
    }
    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new MyError("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
  }
);

export const logout = catchAsyncError(async (req: Request, res: Response) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export const forgetPassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new MyError("User Not Found", 404));
    }

    const resetToken = user.getPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset url is : \n\n ${resetPasswordUrl} if you have not requested this email then, please ignore it`;

    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (err: any) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new MyError(err.message, 500));
    }
  }
);

export const resetPassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // hash incoming token to compare against database
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedResetToken,
      resetPasswordExpire: { $gt: new Date() },
    });
    if (!user) {
      return next(
        new MyError("Reset Password Token  is Invalid or has been expired", 400)
      );
    }
    if (req.body.password !== req.body.confirmPassword) {
      return next(new MyError("Password doesn't match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
  }
);

export const getUserDetails = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  }
);

export const updatePassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = user?.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      return next(new MyError("Old passwrod is incorrect.", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new MyError("Password does not match", 400));
    }

    if (user) {
      user.password = req.body.newPassword;
      await user.save();
      sendToken(user, 200, res);
    }
  }
);

export const updateProfile = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    // cloudinary here

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      user,
    });
  }
);

// get all users (admin)
export const getAllUsers = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  }
);

// get single user (admin)
export const getSingleUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new MyError("User Not Found", 404));
    }
    res.status(200).json({
      success: true,
      user,
    });
  }
);

export const updateUserRole = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUserData = {
      role: req.body.role,
    };

    let user = await User.findById(req.params.id);
    if (!user) {
      return next(new MyError("User not Found", 404));
    }

    user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      user,
    });
  }
);

export const deleteUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new MyError("User not Found", 404));
    }
    // cloudinary here
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User Deleted successfully",
    });
  }
);

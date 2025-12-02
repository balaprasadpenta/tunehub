import {User} from "../models/user.model.js"

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const existingUser = await User.findOne({ clerkId: id });

    if (!existingUser) {
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }
    res.status(200).json({ success: true });
    res.send("User is created");
  } catch (error) {
    console.log("error in auth callback", error);
    next(error)
  }
};

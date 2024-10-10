import Business from "../models/businessModel.js";
import Owner from "../models/ownerModel.js";

//Business Registration
export const registerBusiness = async (req, res) => {
  const { businessname, openingTime, closingTime, emailId, number } = req.body;
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  const [openHour, openMinute] = openingTime.split(":").map(Number);
  const [closeHour, closeMinute] = closingTime.split(":").map(Number);

  try {
    const user = await Business.findOne({ businessname, emailId, number });
    if (user) {
      return res.status(400).json("Business already register");
    }
    if (!timeRegex.test(openingTime) || !timeRegex.test(closingTime)) {
      return res
        .status(400)
        .json("Opening and closing times must be in HH:mm format");
    }
    if (
      closeHour < openHour ||
      (closeHour === openHour && closeMinute <= openMinute)
    ) {
      return res
        .status(400)
        .json("Closing time must be later than opening time");
    }

    const newBusiness = new Business(req.body);
    await newBusiness.save();
    res.status(201).json("Business created successfully");
  } catch (err) {
    res.status(500).json(`Error : ${err}`);
  }
};

//Owner Registration
export const registerOwner = async (req, res) => {
  const { fullname, emailId, number } = req.body;
  try {
    const user = await Owner.findOne({ fullname, emailId, number });
    if (user) {
      return res.status(400).json("Owner already register");
    }
    const newOwner = new Owner(req.body);
    await newOwner.save();
    res.status(201).json("Owner created successfully");
  } catch (err) {
    res.status(500).json(`Error : ${err}`);
  }
};

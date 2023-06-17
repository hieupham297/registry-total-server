const ttdkModel = require("../models/ttdk.model");
const carModel = require("../models/car.model");
const userModel = require("../models/user.model");
const personModel = require("../models/personal.model");
const organModel = require("../models/organ.model");

// Hàm đăng ký tài khoản cho 1 trung tâm đăng kiểm
const createAcc = async (req, res) => {
  const {
    userName,
    displayName,
    email,
    password,
    address,
    region,
    phoneNumber,
    represent,
    position,
    code,
  } = req.body;
  try {
    const existedTTDK = await ttdkModel.findOne({ email });
    if (existedTTDK) {
      return res.json({ error: "TTDK Existed" });
    }
    await ttdkModel.create({
      userName,
      displayName,
      email,
      password,
      address,
      region,
      phoneNumber,
      represent,
      position,
      code,
      status: "Đang hoạt động",
    });
    await userModel
      .create({
        userName,
        displayName,
        email,
        password,
        role: "ttdk",
      })
      .catch((err) => console.log(err));
    res.send({ status: "Oke", message: "Tạo tài khoản mới thành công" });
  } catch (error) {
    console.log(error);
    res.send({ status: "Failed to create new account" });
  }
};

const deleteAcc = async (req, res) => {
  try {
    const { email } = req.params;

    // Tìm và xóa tài khoản dựa trên mã code
    const deletedCenter = await ttdkModel.findOneAndDelete({ email });
    const deletedAcc = await userModel.findOneAndDelete({ email });

    if (!deletedCenter || !deletedAcc) {
      return res.status(404).json({
        status: "Error",
        message: "Account not found",
      });
    }
    res.send({ status: "Successful", data: deletedCenter });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: error, message: "Internal Server Error" });
  }
};

// Lấy ra tất cả thông tin của các trung tâm đăng kiểm đã được đăng ký hệ thống
const getAllCenter = async (req, res) => {
  try {
    const ttdkList = await ttdkModel.find({});
    res.send({ status: "Successful", data: ttdkList });
  } catch (error) {
    console.log(error);
    res.send({ status: "Failed" });
  }
};

const getAllCar = async (req, res) => {
  try {
    const carList = await carModel.find({ isCensored: true });
    let ownerInfo = null;
    const updatedCarList = await Promise.all(
      carList.map(async (car) => {
        if (car.object === "Cá nhân") {
          ownerInfo = await personModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        } else if (car.object === "Cơ quan") {
          ownerInfo = await organModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        }
        return car.toObject();
      })
    );
    res.send({ status: "Successful", data: { carList: updatedCarList } });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: error, message: "Internal Server Error" });
  }
};

const getCarByRegion = async (req, res) => {
  try {
    const { region } = req.params;

    // tìm kiếm các trung tâm trong khu vực
    const centers = await ttdkModel.find({ region: region });

    if (centers.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No centers found in the specified region",
      });
    }
    const centerCodes = centers.map((center) => {
      return center.code;
    });
    const carList = await carModel.find({
      regisCenter: { $in: centerCodes },
      isCensored: true,
    });
    const updatedCarList = await Promise.all(
      carList.map(async (car) => {
        if (car.object === "Cá nhân") {
          ownerInfo = await personModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        } else if (car.object === "Cơ quan") {
          ownerInfo = await organModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        }
        return car.toObject();
      })
    );
    res.send({ status: "Successful", data: { carList: updatedCarList } });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: error, message: "Internal Server Error" });
  }
};

const getCarByCenter = async (req, res) => {
  try {
    const { code } = req.params;

    const center = await ttdkModel.findOne({ code: code });
    if (!center) {
      return res.status(404).json({
        status: "Error",
        message: "No centers found",
      });
    }

    const carList = await carModel.find({
      regisCenter: code,
      isCensored: true,
    });
    const updatedCarList = await Promise.all(
      carList.map(async (car) => {
        if (car.object === "Cá nhân") {
          ownerInfo = await personModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        } else if (car.object === "Cơ quan") {
          ownerInfo = await organModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        }
        return car.toObject();
      })
    );
    res.send({ status: "Successful", data: { carList: updatedCarList } });
  } catch (error) {
    console.log();
    res.status(500).send({ status: error, message: "Internal Server Error" });
  }
};

const getCarByMonthYear = async (req, res) => {
  try {
    const { month, year } = req.params;

    const startDay = new Date(year, month - 1, 1);
    const endDay = new Date(year, month, 0, 23, 59, 59);

    const carList = await carModel.find({
      regisDate: {
        $gte: startDay,
        $lte: endDay,
      },
      isCensored: true,
    });

    const updatedCarList = await Promise.all(
      carList.map(async (car) => {
        if (car.object === "Cá nhân") {
          ownerInfo = await personModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        } else if (car.object === "Cơ quan") {
          ownerInfo = await organModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        }
        return car.toObject();
      })
    );
    res.send({ status: "Successful", data: { carList: updatedCarList } });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: error, message: "Internal Server Error" });
  }
};

const getCarByQuarterYear = async (req, res) => {
  try {
    const { quarter, year } = req.params;

    const startQuarter = (parseInt(quarter) - 1) * 3 + 1;
    const endQuarter = startQuarter + 2;

    const startDay = new Date(year, startQuarter - 1, 1);
    const endDay = new Date(year, endQuarter, 0, 23, 59, 59);

    const carList = await carModel.find({
      regisDate: {
        $gte: startDay,
        $lte: endDay,
      },
      isCensored: true,
    });

    const updatedCarList = await Promise.all(
      carList.map(async (car) => {
        if (car.object === "Cá nhân") {
          ownerInfo = await personModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        } else if (car.object === "Cơ quan") {
          ownerInfo = await organModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        }
        return car.toObject();
      })
    );
    res.send({ status: "Successful", data: { carList: updatedCarList } });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: error, message: "Internal Server Error" });
  }
};

const getCarByYear = async (req, res) => {
  try {
    const { year } = req.params;

    const startDay = new Date(year, 0, 1);
    const endDay = new Date(year, 11, 31, 23, 59, 59);

    const carList = await carModel.find({
      regisDate: {
        $gte: startDay,
        $lte: endDay,
      },
      isCensored: true,
    });

    const updatedCarList = await Promise.all(
      carList.map(async (car) => {
        if (car.object === "Cá nhân") {
          ownerInfo = await personModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        } else if (car.object === "Cơ quan") {
          ownerInfo = await organModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        }
        return car.toObject();
      })
    );
    res.send({ status: "Successful", data: { carList: updatedCarList } });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: error, message: "Internal Server Error" });
  }
};

const getExpiringCars = async (req, res) => {
  try {
    const currentDay = new Date();

    const tempDay = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth() + 1,
      currentDay.getDate()
    );

    const expiringCars = await carModel.find({
      expirationDate: {
        $gte: currentDay,
        $lte: tempDay,
      },
      isCensored: true,
    });
    const updatedCarList = await Promise.all(
      expiringCars.map(async (car) => {
        if (car.object === "Cá nhân") {
          ownerInfo = await personModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        } else if (car.object === "Cơ quan") {
          ownerInfo = await organModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        }
        return car.toObject();
      })
    );
    res.send({ status: "Successful", data: { carList: updatedCarList } });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: error, message: "Internal Server Error" });
  }
};

const getExpiringCarsByRegion = async (req, res) => {
  const { region } = req.params;

  try {
    const currentDay = new Date();

    const tempDay = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth() + 1,
      currentDay.getDate()
    );

    // tìm kiếm các trung tâm trong khu vực
    const centers = await ttdkModel.find({ region: region });
    if (centers.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No centers found in the specified region",
      });
    }
    const centerCodes = centers.map((center) => {
      return center.code;
    });
    const expiringCars = await carModel.find({
      regisCenter: { $in: centerCodes },
      expirationDate: {
        $gte: currentDay,
        $lte: tempDay,
      },
      isCensored: true,
    });

    const updatedCarList = await Promise.all(
      expiringCars.map(async (car) => {
        if (car.object === "Cá nhân") {
          ownerInfo = await personModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        } else if (car.object === "Cơ quan") {
          ownerInfo = await organModel.findOne({
            licensePlate: car.licensePlate,
          });
          return { ...car.toObject(), ownerInfo };
        }
        return car.toObject();
      })
    );
    res.send({ status: "Successful", data: { carList: updatedCarList } });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: error, message: "Internal Server Error" });
  }
};

const updateCenter = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  try {
    const {
      userName: newUserName,
      displayName: newDisplayName,
      phoneNumber,
      code,
      address,
      region,
      represent,
      position,
      password: newPassword,
      status,
    } = req.body;

    const updatedCenter = await ttdkModel.findOneAndUpdate(
      { email: email },
      {
        userName: newUserName,
        displayName: newDisplayName,
        phoneNumber,
        code,
        address,
        region,
        represent,
        position,
        password: newPassword,
        status,
      },
      { new: true }
    );
    if (newUserName || newDisplayName || newPassword) {
      const user = await userModel.findOneAndUpdate(
        { email: email },
        {
          password: newPassword,
          userName: newUserName,
          displayName: newDisplayName,
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          status: "Error",
          message: "No users found",
        });
      }
    }
    res.send({ status: "Successful", data: updatedCenter });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

module.exports = {
  createAcc,
  updateCenter,
  getAllCenter,
  getAllCar,
  getCarByRegion,
  getCarByCenter,
  getCarByMonthYear,
  getCarByQuarterYear,
  getCarByYear,
  getExpiringCars,
  getExpiringCarsByRegion,
  deleteAcc,
};

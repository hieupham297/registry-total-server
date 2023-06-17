const ttdkModel = require("../models/ttdk.model");
const carModel = require("../models/car.model");
const personModel = require("../models/personal.model");
const organModel = require("../models/organ.model");

const approve = async (req, res) => {
  const { licensePlate } = req.params;

  try {
    const updatedCar = await carModel.findOneAndUpdate(
      { licensePlate },
      { isCensored: true },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ error: "Không tìm thấy chiếc xe" });
    }

    res.json({ status: "Successful", data: updatedCar });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

const getInfo = async (req, res) => {
  try {
    const { email } = req.params;
    const userInfo = await ttdkModel.findOne({ email });
    console.log(userInfo);
    res.send({ status: "Successful", data: userInfo });
  } catch (error) {
    res.send({ status: "Failed" });
  }
};

const getStatistics = async (req, res) => {
  try {
    const { regisCenter } = req.params;
    const carList = await carModel.find({ regisCenter, isCensored: true });
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
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

const unapprovedList = async (req, res) => {
  try {
    const { regisCenter } = req.params;
    const carList = await carModel.find({ regisCenter, isCensored: false });
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
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

const getByMonthYear = async (req, res) => {
  try {
    const { regisCenter, month, year } = req.params;

    const startDay = new Date(year, month - 1, 1);
    const endDay = new Date(year, month, 0, 23, 59, 59);

    const carList = await carModel.find({
      regisCenter,
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
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

const getByQuarterYear = async (req, res) => {
  try {
    const { regisCenter, quarter, year } = req.params;

    const startQuarter = (parseInt(quarter) - 1) * 3 + 1;
    const endQuarter = startQuarter + 2;

    const startDay = new Date(year, startQuarter - 1, 1);
    const endDay = new Date(year, endQuarter, 0, 23, 59, 59);

    const carList = await carModel.find({
      regisCenter,
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
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

const getByYear = async (req, res) => {
  try {
    const { regisCenter, year } = req.params;

    const startDay = new Date(year, 0, 1);
    const endDay = new Date(year, 11, 31, 23, 59, 59);

    const carList = await carModel.find({
      regisCenter,
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
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

const getExpiringCars = async (req, res) => {
  try {
    const { regisCenter } = req.params;
    const currentDay = new Date();

    const tempDay = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth() + 1,
      currentDay.getDate()
    );
    console.log(tempDay);

    // currentday < expirationDate < currentDay + 1 thang
    const expiringCars = await carModel.find({
      regisCenter,
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
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

module.exports = {
  getInfo,
  getStatistics,
  unapprovedList,
  getByMonthYear,
  getByQuarterYear,
  getByYear,
  getExpiringCars,
  approve,
};

const { Edu } = require("../model/eduSchema");

const postEdu = async (req, res) => {
  try {
    const { city, street, center_name, branch, rating } = req.body;
    const existingEdu = await Edu.findOne({ center_name });

    if (existingEdu) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan royxatdan o'tgan o'quv markazi mavjud",
      });
    } else {
      const newEdu = new Edu({
        city,
        street,
        center_name,
        branch,
        rating,
      });
      await newEdu.save();
      return res.status(201).json({
        success: true,
        message: "Ro'yhatdan o'tish muvaffaqiyatli amalga oshirildi",
        data: newEdu,
      });
    }
  } catch (error) {
    console.error("Xato:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Royxatdan otish jarayonida xatolik yuz berdi",
    });
  }
};

const getEdus = async (req, res) => {
  try {
    const edus = await Edu.find();
    res.json({
      success: true,
      message: "Barcha foydalanuvchilar royxati olingan",
      innerData: edus,
    });
  } catch (error) {
    console.error("Xato:", error);
    res.status(500).json({
      success: false,
      message:
        "Server xatosi: Foydalanuvchilar royxati olishda xatolik yuz berdi",
    });
  }
};

module.exports = { postEdu, getEdus };

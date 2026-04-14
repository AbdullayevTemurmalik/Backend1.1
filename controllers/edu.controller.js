const { Edu } = require("../model/eduSchema");

//  ----------------Post edu-----------------

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

//  ----------------Get edus-----------------

const getEdus = async (req, res) => {
  try {
    const edus = await Edu.find();
    res.json({
      success: true,
      message: "Barcha o'quv markazlari olingan",
      innerData: edus,
    });
  } catch (error) {
    console.error("Xato:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumot olishda xatolik yuz berdi",
    });
  }
};

//  ----------------Get edu by id-----------------

const getEduById = async (req, res) => {
  try {
    const eduId = req.params.id;

    const edu = await Edu.findById(eduId);
    if (!edu) {
      return res.status(404).json({ message: "Edu not found" });
    }

    res.json({ message: "Edu found", edu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  ----------------Delete edu by id-----------------

const deleteEduById = async (req, res) => {
  try {
    const eduId = req.params.id;

    const deletedEdu = await Edu.findByIdAndDelete(eduId);

    if (!deletedEdu) {
      return res.status(404).json({
        success: false,
        message: "O'quv markazi topilmadi",
      });
    }

    res.json({
      success: true,
      message: "O'quv markazi muvaffaqiyatli o'chirildi",
      data: deletedEdu,
    });
  } catch (error) {
    console.error("Xato:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: O'chirishda xatolik yuz berdi",
    });
  }
};

//  ----------------Update edu by id-----------------

const updateEdu = async (req, res) => {
  try {
    const { id } = req.params;
    const { city, street, center_name, branch, rating } = req.body;

    const updatedEdu = await Edu.findByIdAndUpdate(
      id,
      { city, street, center_name, branch, rating },
      { new: true },
    );
    if (!updatedEdu) {
      return res.status(404).json({
        success: false,
        message: "Edu not found!",
      });
    }
    res.json({
      success: true,
      message: "Edu updated successfully!",
      data: updatedEdu,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update edu",
    });
  }
};

// ----------------Search Edus-----------------

const searchEdus = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Qidiruv so'rovi noto'g'ri kiritildi",
      });
    }

    const result = await Edu.find({
      $or: [
        { center_name: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { branch: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Bunday o'quv markazi topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Qidiruvda xatolik:", error);
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi",
    });
  }
};

module.exports = {
  postEdu,
  getEdus,
  getEduById,
  deleteEduById,
  updateEdu,
  searchEdus,
};

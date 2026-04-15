const { House } = require("../model/houseShema");

//  ----------------Post House (Uy qo'shish)-----------------

const postHouse = async (req, res) => {
  try {
    const { region, city, house_number, street, family_members, location } =
      req.body;

    // Bir xil manzilga ega uyni tekshirish (ixtiyoriy, lekin mantiqan to'g'ri)
    const existingHouse = await House.findOne({
      region,
      city,
      street,
      house_number,
    });

    if (existingHouse) {
      return res.status(400).json({
        success: false,
        message: "Ushbu manzilda uy allaqachon ro'yxatdan o'tgan",
      });
    }

    const newHouse = new House({
      region,
      city,
      house_number,
      street,
      family_members,
      location,
    });

    await newHouse.save();
    return res.status(201).json({
      success: true,
      message: "Uy muvaffaqiyatli ro'yxatdan o'tkazildi",
      data: newHouse,
    });
  } catch (error) {
    console.error("Xato:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Uy qo'shishda xatolik yuz berdi",
    });
  }
};

//  ----------------Get Houses (Barcha uylarni olish)-----------------

const getHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.json({
      success: true,
      message: "Barcha uylar ma'lumotlari olindi",
      innerData: houses,
    });
  } catch (error) {
    console.error("Xato:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xatolik yuz berdi",
    });
  }
};

//  ----------------Get House by ID (ID orqali olish)-----------------

const getHouseById = async (req, res) => {
  try {
    const { id } = req.params;
    const house = await House.findById(id);

    if (!house) {
      return res.status(404).json({
        success: false,
        message: "Uy topilmadi",
      });
    }

    res.json({
      success: true,
      message: "Uy topildi",
      data: house,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//  ----------------Delete House by ID (O'chirish)-----------------

const deleteHouseById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHouse = await House.findByIdAndDelete(id);

    if (!deletedHouse) {
      return res.status(404).json({
        success: false,
        message: "O'chirilishi kerak bo'lgan uy topilmadi",
      });
    }

    res.json({
      success: true,
      message: "Uy muvaffaqiyatli o'chirildi",
      data: deletedHouse,
    });
  } catch (error) {
    console.error("Xato:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: O'chirishda xatolik yuz berdi",
    });
  }
};
//  ----------------Update House by id-----------------

const updateHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { region, city, house_number, street, family_members, location } =
      req.body;

    const updatedHouse = await House.findByIdAndUpdate(
      id,
      {
        region,
        city,
        house_number,
        street,
        family_members,
        location,
      },
      { returnDocument: "after" },
    );

    if (!updatedHouse) {
      return res.status(404).json({
        success: false,
        message: "Yangilanishi kerak bo'lgan uy topilmadi!",
      });
    }

    res.json({
      success: true,
      message: "Uy ma'lumotlari muvaffaqiyatli yangilandi!",
      data: updatedHouse,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Uy ma'lumotlarini yangilashda xatolik yuz berdi",
    });
  }
};

// ----------------Search Houses (Qidiruv)-----------------

const searchHouses = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Qidiruv so'rovi kiritilmadi",
      });
    }

    const result = await House.find({
      $or: [
        { region: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { street: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Qidiruv bo'yicha hech qanday uy topilmadi",
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
  postHouse,
  getHouses,
  getHouseById,
  deleteHouseById,
  updateHouse,
  searchHouses,
};

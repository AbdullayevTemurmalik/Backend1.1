const Book = require("../model/bookSchema");

//  ----------------Post book-----------------

const postBook = async (req, res) => {
  try {
    const { title, author, publishYear, pages, genre, price } = req.body;

    const existingBook = await Book.findOne({ title, author });

    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "Bu kitob allaqachon bazada mavjud",
      });
    } else {
      const newBook = new Book({
        title,
        author,
        publishYear,
        pages,
        genre,
        price,
      });

      await newBook.save();
      return res.status(201).json({
        success: true,
        message: "Kitob muvaffaqiyatli qo'shildi",
        data: newBook,
      });
    }
  } catch (error) {
    console.error("Xato:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Kitob qo'shishda xatolik yuz berdi",
    });
  }
};

//  ----------------Get books-----------------

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json({
      success: true,
      message: "Barcha kitoblar ro'yxati olingan",
      innerData: books,
    });
  } catch (error) {
    console.error("Xato:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Kitoblar ro'yxatini olishda xatolik yuz berdi",
    });
  }
};

//  ----------------Get book by id-----------------

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Kitob topilmadi",
      });
    }

    res.json({
      success: true,
      message: "Kitob topildi",
      book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Ichki server xatosi",
    });
  }
};

//  ----------------Delete book by id-----------------

const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Kitob topilmadi",
      });
    }

    res.json({
      success: true,
      message: "Kitob muvaffaqiyatli o'chirildi",
      data: deletedBook,
    });
  } catch (error) {
    console.error("Xato:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: O'chirishda xatolik yuz berdi",
    });
  }
};

//  ----------------Update book by id-----------------

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear, pages, genre, price } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear, pages, genre, price },
      { returnDocument: "after" },
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Yangilanishi kerak bo'lgan kitob topilmadi!",
      });
    }

    res.json({
      success: true,
      message: "Kitob muvaffaqiyatli yangilandi!",
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Kitobni yangilashda xatolik yuz berdi",
    });
  }
};

// ----------------Search books-----------------

const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Qidiruv so'rovi noto'g'ri kiritildi",
      });
    }

    const result = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Bunday kitob topilmadi",
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
  postBook,
  getBooks,
  getBookById,
  deleteBookById,
  updateBook,
  searchBooks,
};

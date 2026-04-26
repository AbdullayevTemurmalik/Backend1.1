const express = require("express");
const BookRoute = express.Router();
const {
  postBook,
  getBooks,
  getBookById,
  deleteBookById,
  updateBook,
  searchBooks,
} = require("../controllers/book.controller");

const {
  registerBookValidationSchema,
  updateBookValidationSchema,
} = require("../validation/bookValidation");

const validationSchema = (Schema) => (req, res, next) => {
  const validationResult = Schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      success: false,
      message: validationResult.error.details[0].message,
    });
  }
  next();
};

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: Kitoblarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /book/create:
 *   post:
 *     summary: Yangi kitob qo'shish
 *     tags: [Book]
 *     description: Tizimga yangi kitob ma'lumotlarini kiritish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - publishYear
 *               - pages
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 description: Kitob nomi
 *               author:
 *                 type: string
 *                 description: Muallif ismi
 *               publishYear:
 *                 type: number
 *                 description: Nashr etilgan yili
 *               pages:
 *                 type: number
 *                 description: Sahifalar soni
 *               genre:
 *                 type: string
 *                 description: Janri (Drama, Fantasy, Science, Other)
 *               price:
 *                 type: number
 *                 description: Kitob narxi
 *     responses:
 *       201:
 *         description: Kitob muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Ichki server xatosi
 */
BookRoute.post(
  "/create",
  validationSchema(registerBookValidationSchema),
  postBook,
);

/**
 * @swagger
 * /book/all:
 *   get:
 *     summary: Barcha kitoblarni olish
 *     tags: [Book]
 *     description: Bazadagi barcha kitoblar ro'yxatini qaytaradi
 *     responses:
 *       200:
 *         description: Kitoblar ro'yxati muvaffaqiyatli olindi
 *       500:
 *         description: Ichki server xatosi
 */
BookRoute.get("/all", getBooks);

/**
 * @swagger
 * /book/search:
 *   get:
 *     summary: Kitoblarni qidirish
 *     tags: [Book]
 *     description: Nomi, muallifi yoki janri bo'yicha qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Qidiruv so'zi
 *     responses:
 *       200:
 *         description: Qidiruv natijalari qaytarildi
 *       404:
 *         description: Kitob topilmadi
 */
BookRoute.get("/search", searchBooks);

/**
 * @swagger
 * /book/{id}:
 *   get:
 *     summary: ID bo'yicha kitobni olish
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Kitobning MongoDB ID-si
 *     responses:
 *       200:
 *         description: Kitob ma'lumotlari qaytarildi
 *       404:
 *         description: Kitob topilmadi
 */
BookRoute.get("/:id", getBookById);

/**
 * @swagger
 * /book/{id}:
 *   delete:
 *     summary: Kitobni o'chirish
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O'chirilishi kerak bo'lgan kitob ID-si
 *     responses:
 *       200:
 *         description: Kitob muvaffaqiyatli o'chirildi
 *       404:
 *         description: Kitob topilmadi
 */
BookRoute.delete("/:id", deleteBookById);

/**
 * @swagger
 * /book/{id}:
 *   put:
 *     summary: Kitob ma'lumotlarini yangilash
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishYear:
 *                 type: number
 *               pages:
 *                 type: number
 *               genre:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Kitob muvaffaqiyatli yangilandi
 *       400:
 *         description: Validatsiya xatosi
 *       404:
 *         description: Kitob topilmadi
 */
BookRoute.put("/:id", validationSchema(updateBookValidationSchema), updateBook);

module.exports = { BookRoute };

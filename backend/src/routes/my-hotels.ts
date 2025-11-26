import express, { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary"; // ✅ fixed import
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

const router = express.Router();

// Upload multiple images to Cloudinary
async function uploadImage(imageFiles: Express.Multer.File[]): Promise<string[]> {
  const uploadPromises = imageFiles.map(async (img) => {
    const b64 = img.buffer.toString("base64");
    const dataURI = `data:${img.mimetype};base64,${b64}`;
    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  });

  return Promise.all(uploadPromises);
}

// POST /api/my-hotels
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is Required"),
    body("city").notEmpty().withMessage("City is Required"),
    body("country").notEmpty().withMessage("Country is Required"),
    body("description").notEmpty().withMessage("Description is Required"),
    body("type").notEmpty().withMessage("Type is Required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price is Required"),
    body("facilities").notEmpty().isArray().withMessage("Facilities is Required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      const imageUrls = await uploadImage(imageFiles);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (e) {
      console.error("Error creating Hotel:", e);
      res.status(500).json({ message: "Something went wrong: " + e });
    }
  }
);

// GET all hotels
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (e) {
    res.status(500).json({ message: "Error finding hotels" });
  }
});

// GET hotel by ID
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findOne({ _id: req.params.id, userId: req.userId });
    res.json(hotel);
  } catch (e) {
    res.status(500).json({ message: "Error fetching hotel data" });
  }
});

// UPDATE hotel
router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        { _id: req.params.hotelId, userId: req.userId },
        updatedHotel,
        { new: true }
      );

      if (!hotel) return res.status(404).json({ message: "Hotel not found" });

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImage(files);

      hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];
      await hotel.save();

      res.status(201).json(hotel);
    } catch (e) {
      console.error("Error updating hotel:", e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;

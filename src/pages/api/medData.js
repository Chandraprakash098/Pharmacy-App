import MedData from "@/models/MedData";
import db from "@/utils/db";

export default async function handler(req, res) {
  await db.connect();

  try {
    if (req.method === "POST") {
      // Existing POST logic
      const medicines = req.body;
      if (!Array.isArray(medicines)) {
        return res
          .status(400)
          .json({ error: "Request body should be an array of medicines" });
      }

      const savedMedicines = await Promise.all(
        medicines.map(async (med) => {
          const medicine = new MedData({
            name: med.name,
            price: med.price,
            description: med.description,
            img: med.img,
          });
          return await medicine.save();
        })
      );

      res.status(200).json({
        message: "Medicines saved successfully",
        data: savedMedicines,
      });
    } else if (req.method === "GET") {
      // New GET logic
      const medicines = await MedData.find({});
      res.status(200).json(medicines);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "An error occurred while processing the request",
      details: error.message,
    });
  } finally {
    await db.disconnect();
  }
}

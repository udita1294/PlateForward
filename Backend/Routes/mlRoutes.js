import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/analyze-food", async (req, res) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/predict", req.body);
        res.json({
            success: true,
            ml_result: response.data
        });
    } catch (error) {
    res.status(500).json({
      success: false,
      message: "ML service error",
      error: error.message
    });
    }
});

export default router;

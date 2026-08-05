const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Lưu Key Free đã tạo ra
const activeFreeTokens = new Set();

// Danh sách Key Premium bí mật (Chỉ lưu ở Server, tuyệt đối không lộ ra HTML)
const PREMIUM_KEYS = [
    "Ch33m-22Bv-66Yb-UUHB-Premium",
    "Ch33m-Bvvg-66hg-Uggb-Premium"
];

// [1] Trả về giao diện HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// [2] API: Tạo Key Free (Cheem-xxxx-xxxx-xxxx)
app.get('/api/generate', (req, res) => {
    const randomPart1 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart3 = Math.random().toString(36).substring(2, 6).toUpperCase();

    const newKey = `Cheem-${randomPart1}-${randomPart2}-${randomPart3}`;
    activeFreeTokens.add(newKey);

    return res.status(200).json({
        success: true,
        key: newKey,
        expiresIn: "24 Hours"
    });
});

// [3] API: Kiểm tra Key từ Script Lua Roblox
app.get('/api/verify', (req, res) => {
    const key = req.query.key;
    if (!key) {
        return res.status(400).json({ valid: false, reason: "No key provided" });
    }

    const cleanKey = key.trim();

    // 1. Kiểm tra Key Premium
    if (PREMIUM_KEYS.includes(cleanKey)) {
        return res.status(200).json({ valid: true, type: "PREMIUM" });
    }

    // 2. Kiểm tra Key Free
    if (activeFreeTokens.has(cleanKey)) {
        return res.status(200).json({ valid: true, type: "FREEMIUM" });
    }

    return res.status(200).json({ valid: false, reason: "Key không đúng hoặc đã hết hạn!" });
});

// [QUAN TRỌNG NHẤT] Dòng này bắt buộc phải có để Vercel chạy được API Serverless
module.exports = app;

// Dành cho khi chạy thử dưới máy tính cá nhân (localhost)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server chạy tại port ${PORT}`));
}

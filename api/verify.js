// Danh sách Key Premium vĩnh viễn (Không bao giờ hết hạn)
const PREMIUM_KEYS = [
    "Ch33m-22Bv-66Yb-UUHB-Premium",
    "Ch33m-Bvvg-66hg-Uggb-Premium"
];

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ valid: false, message: 'Method not allowed' });
    }

    const key = req.query.key;
    if (!key) {
        return res.status(400).json({ valid: false, reason: "No key provided" });
    }

    const cleanKey = key.trim();

    // 1. Kiểm tra Key Premium (Vĩnh viễn, không tính thời gian hết hạn)
    if (PREMIUM_KEYS.includes(cleanKey)) {
        return res.status(200).json({ 
            valid: true, 
            type: "PREMIUM", 
            expires: "Never" 
        });
    }

    // 2. Kiểm tra Key Free định dạng Freemium-xxxx-xxxx-xxxx
    if (global.activeFreeTokens && global.activeFreeTokens.has(cleanKey)) {
        return res.status(200).json({ 
            valid: true, 
            type: "FREEMIUM", 
            expires: "24 Hours" 
        });
    }

    return res.status(200).json({ valid: false, reason: "Key không hợp lệ hoặc đã hết hạn!" });
}

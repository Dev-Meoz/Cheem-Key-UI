global.activeFreeTokens = global.activeFreeTokens || new Set();

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    // Tạo key ngầm định dạng mới
    const randomPart1 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart3 = Math.random().toString(36).substring(2, 6).toUpperCase();

    const newKey = `Freemium-${randomPart1}-${randomPart2}-${randomPart3}`;
    global.activeFreeTokens.add(newKey);

    // Trả về trạng thái tối giản, không lộ key ra ngoài API response trực tiếp
    return res.status(200).json({
        success: true,
        status: "ONLINE",
        message: "Key generated and registered successfully system online"
    });
}

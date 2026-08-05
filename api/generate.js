global.activeFreeTokens = global.activeFreeTokens || new Set();

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    // Tạo các phần ngẫu nhiên
    const randomPart1 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart3 = Math.random().toString(36).substring(2, 6).toUpperCase();

    // Định dạng mới theo yêu cầu: Freemium-xxxx-xxxx-xxxx
    const newKey = `Freemium-${randomPart1}-${randomPart2}-${randomPart3}`;
    
    global.activeFreeTokens.add(newKey);

    return res.status(200).json({
        success: true,
        key: newKey,
        expiresIn: "24 Hours"
    });
}

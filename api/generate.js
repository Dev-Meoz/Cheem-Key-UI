// Biến toàn cục tạm lưu token trên Serverless
global.activeFreeTokens = global.activeFreeTokens || new Set();

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    // Tạo các phần ngẫu nhiên cho key
    const randomPart1 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart3 = Math.random().toString(36).substring(2, 6).toUpperCase();

    // Định dạng: Cheem-xxxx-xxxx-xxxx
    const newKey = `Cheem-${randomPart1}-${randomPart2}-${randomPart3}`;
    
    // Lưu vào danh sách token hoạt động
    global.activeFreeTokens.add(newKey);

    return res.status(200).json({
        success: true,
        key: newKey,
        expiresIn: "24 Hours"
    });
}

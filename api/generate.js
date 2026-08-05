global.activeFreeTokens = global.activeFreeTokens || new Set();

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const randomPart1 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart3 = Math.random().toString(36).substring(2, 6).toUpperCase();

    const newKey = `Freemium-${randomPart1}-${randomPart2}-${randomPart3}`;
    global.activeFreeTokens.add(newKey);

    // Bắt buộc phải có trường "key" để index.html nhận diện và hiển thị cho người dùng copy
    return res.status(200).json({
        success: true,
        key: newKey,
        status: "ONLINE",
        message: "Key generated successfully"
    });
}

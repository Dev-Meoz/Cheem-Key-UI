global.activeFreeTokens = global.activeFreeTokens || new Set();
// Lưu các phiên đã vượt link thành công (có thể dùng Redis/DB nếu muốn lưu lâu dài)
global.validSessions = global.validSessions || new Set();

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { token, session } = req.query;

    // KIỂM TRA BẢO MẬT: Bắt buộc phải có token phiên làm việc hợp lệ từ hệ thống vượt link chuyển về
    // Chống tuyệt đối việc gõ chay link ?auth=true hay vào thẳng web chính mà không qua link rút gọn
    const isValidBypass = session && global.validSessions.has(session);

    if (!isValidBypass) {
        return res.status(403).json({ 
            success: false, 
            message: "Truy cập bị chặn! Bạn chưa hoàn thành vượt link quảng cáo." 
        });
    }

    // Nếu đã vượt link chuẩn xác, tiến hành xóa session đó đi để chống spam (1 session chỉ dùng 1 lần)
    global.validSessions.delete(session);

    // Tạo Key Free định dạng Freemium-xxxx-xxxx-xxxx
    const randomPart1 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomPart3 = Math.random().toString(36).substring(2, 6).toUpperCase();

    const newKey = `Freemium-${randomPart1}-${randomPart2}-${randomPart3}`;
    global.activeFreeTokens.add(newKey);

    return res.status(200).json({
        success: true,
        key: newKey,
        status: "ONLINE",
        message: "Key generated successfully"
    });
}

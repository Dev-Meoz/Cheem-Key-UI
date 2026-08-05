global.validSessions = global.validSessions || new Set();

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    // Tạo một mã phiên ngẫu nhiên độc nhất cho lần vượt link này
    const sessionId = 'ss_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
    
    // Lưu tạm vào server
    global.validSessions.add(sessionId);

    // Trả về URL đích hoàn chỉnh kèm theo session để cấu hình vào Work.ink/LootLab
    const websiteUrl = "https://cheem-keysystem.vercel.app/?session=" + sessionId;

    return res.status(200).json({
        success: true,
        targetUrl: websiteUrl,
        sessionId: sessionId
    });
}

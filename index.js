const axios = require('axios');

module.exports = async (req, res) => {
    // CORS bypass headers set karna
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // StarMaker ke official database par hit karna secure way me
        const response = await axios.get(`https://m.starmakerstudios.com/profile/api/getProfileInfo?userId=${userId}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://m.starmakerstudios.com/'
            }
        });

        if (response.data && response.data.data) {
            return res.status(200).json(response.data.data);
        } else {
            return res.status(404).json({ error: 'User not found on StarMaker' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Server connection failed', details: error.message });
    }
};


const { Firestore } = require('@google-cloud/firestore');

async function getHistoriesHandler(request, h) {
    try {
        // Inisialisasi Firestore
        const db = new Firestore();
        
        // Ambil semua dokumen dari koleksi predictions
        const snapshot = await db.collection('predictions').get();
        
        // Format data sesuai spesifikasi
        const histories = snapshot.docs.map(doc => ({
            id: doc.id,
            history: {
                result: doc.data().result,
                createdAt: doc.data().createdAt,
                suggestion: doc.data().suggestion,
                id: doc.id
            }
        }));

        return h.response({
            status: 'success',
            data: histories
        }).code(200);
        
    } catch (error) {
        console.error('Error fetching histories:', error);
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam mengambil riwayat prediksi'
        }).code(500);
    }
}

module.exports = getHistoriesHandler;
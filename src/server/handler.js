const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    
    // Validasi input: pastikan gambar ada
    if (!image) {
        return h.response({
            status: 'fail',
            message: 'Image is required',
        }).code(400);
    }
    
    // Validasi ukuran file: maksimal 1MB
    if (image.hapi && image.hapi.size > 1000000) {
        return h.response({
            status: 'fail',
            message: 'Payload content length greater than maximum allowed: 1000000',
        }).code(413);
    }
    
    const { model } = request.server.app;
    
    try {
        // Prediksi menggunakan model
        const { confidenceScore, label, suggestion } = await predictClassification(model, image);
        
        // Generate ID dan timestamp
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();
        
        // Struktur data yang akan dikembalikan
        const data = {
            id,
            result: label,
            suggestion,
            createdAt,
        };
        
        // Simpan data hasil prediksi
        await storeData(id, data);
        
        // Kembalikan respon berhasil
        return h.response({
            status: 'success',
            message: 'Model is predicted successfully',
            data,
        }).code(201);
        
    } catch (error) {
        // Tangani kesalahan prediksi atau penyimpanan
        console.error('Error during prediction:', error);
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi',
        }).code(400);
    }
}

module.exports = postPredictHandler;
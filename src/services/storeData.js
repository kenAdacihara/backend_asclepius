const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
  // Inisialisasi Firestore
  const db = new Firestore();

  // Ambil koleksi `predictions`
  const predictCollection = db.collection('predictions');

  // Simpan data menggunakan `id` sebagai nama dokumen
  return predictCollection.doc(id).set(data);
}

module.exports = storeData;
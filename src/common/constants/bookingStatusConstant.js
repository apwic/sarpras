const bookingStatusConstant = {
    PENDING: { name: 'PENDING', value: 'Pengajuan Baru Diterima' },
    CANCELED: { name: 'CANCELED', value: 'Peminjaman Dibatalkan' },
    REJECTED: { name: 'REJECTED', value: 'Pengajuan Ditolak' },
    ON_VERIFICATION: { name: 'ON_VERIFICATION', value: 'Proses Verifikasi' },
    WAITING_FOR_PAYMENT: {
        name: 'WAITING_FOR_PAYMENT',
        value: 'Menunggu Pembayaran',
    },
    PAYMENT_SUCCESS: { name: 'PAYMENT_SUCCESS', value: 'Pembayaran Berhasil' },
    ENDED: { name: 'ENDED', value: 'Peminjaman Berakhir' },
    WAITING_FOR_RATING: {
        name: 'WAITING_FOR_RATING',
        value: 'Menunggu Penilaian',
    },
    DONE: { name: 'DONE', value: 'Selesai' },
};

export default bookingStatusConstant;

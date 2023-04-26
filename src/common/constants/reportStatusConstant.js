const reportStatusConstant = {
    PENDING: { name: 'PENDING', value: 'Pending' },
    IN_PROGRESS: { name: 'IN_PROGRESS', value: 'Sedang di Proses' },
    WAITING_FOR_RATING: {
        name: 'WAITING_FOR_RATING',
        value: 'Menunggu Penilaian',
    },
    DONE: { name: 'DONE', value: 'Selesai' },
    CANCELED: { name: 'CANCELED', value: 'Dibatalkan' },
};

export default reportStatusConstant;

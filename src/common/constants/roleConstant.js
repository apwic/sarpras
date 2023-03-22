const roleConstant = {
    BASIC_USER: { name: 'BASIC_USER', value: 'Dosen/Tendik' },
    ADMIN: { name: 'ADMIN', value: 'Admin Manajemen Data' },
    SANITATION_STAFF: { name: 'SANITATION_STAFF', value: 'Staff Kebersihan' },
    DEFECT_STAFF: { name: 'DEFECT_STAFF', value: 'Staff Kerusakan' },
    SAFETY_STAFF: { name: 'SAFETY_STAFF', value: 'Staff Keamanan' },
    LOSS_STAFF: { name: 'LOSS_STAFF', value: 'Staff Kehilangan' },
    BOOKING_STAFF: { name: 'BOOKING_STAFF', value: 'Staff Peminjaman' },
    SUPER_USER: { name: 'SUPER_USER', value: 'Super User' },
};

export const findRoleName = (roleName) => {
    switch (roleName) {
        case roleConstant.BASIC_USER.name:
            return roleConstant.BASIC_USER.value;
        case roleConstant.ADMIN.name:
            return roleConstant.ADMIN.value;
        case roleConstant.SANITATION_STAFF.name:
            return roleConstant.SANITATION_STAFF.value;
        case roleConstant.DEFECT_STAFF.name:
            return roleConstant.DEFECT_STAFF.value;
        case roleConstant.SAFETY_STAFF.name:
            return roleConstant.SAFETY_STAFF.value;
        case roleConstant.LOSS_STAFF.name:
            return roleConstant.LOSS_STAFF.value;
        case roleConstant.BOOKING_STAFF.name:
            return roleConstant.BOOKING_STAFF.value;
        case roleConstant.SUPER_USER.name:
            return roleConstant.SUPER_USER.value;
        default:
            return 'Unknown';
    }
};

export default roleConstant;

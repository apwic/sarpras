const _storage = window.localStorage

export const storage = {
    getToken: () => {
        const token = _storage.getItem('token')
        return token ? token.replace(/^"(.+(?="$))"$/, '$1') : null
    },
    setToken: (token) => _storage.setItem('token', token),
    removeCreds: () => {
        _storage.removeItem('token')
    },
}
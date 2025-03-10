
export function getAccessTokenCookie(): string | false {
    const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='))?.split('=')[1];

    if (accessToken) {
        return accessToken;
    } else {
        return false;
    }
}

export function getRefreshTokenCookie(): string | false {
    const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refresh='))?.split('=')[1];

    if (refreshToken) {
        return refreshToken;
    } else {
        return false;
    }
}

import { create } from 'zustand'

interface UserState {
    userProfile: any
    setUserProfile: (user: any) => void
}

const useUserProfileStore = create<UserState>((set) => ({
    userProfile: null,
    setUserProfile: (user) =>
        set({
            userProfile: user,
        })
}))

export default useUserProfileStore;

import { defineStore } from 'pinia';
import type { UserDescription } from '@/components/defines/types';

export const UserInformationStore = defineStore('userInformation', {
    state: (): UserDescription => {
        return {
            guestStatus: true,
            username: ""
        }
    },
    actions: {
        setInformation(data: UserDescription) {
            this.guestStatus = data.guestStatus;
            this.username = data.username;
        }
    }
});
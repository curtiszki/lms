<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { sizeLimits } from './defines/constants';
import { config } from './defines/config';

const enum LoginResults {
    USERNAME_NO_ERR,
    USERNAME_INVALID_CHARACTER,
    USERNAME_NOT_FOUND,
    PASSWORD_NO_ERR,
    INVALID,
    NO_ERR,
    PASSWORD_NOT_IDENTICAL,
    USERNAME_TAKEN,
    REGISTRATION_ERROR,
    SUCCESSFUL_REGISTRATION,
    SERVER_ERROR
};

// Verification for login input
const loginNotifications = {
    usernameError: ref(LoginResults.USERNAME_NO_ERR),
    loginError: ref(LoginResults.NO_ERR),
    registerError: ref(LoginResults.NO_ERR),
    regUsernameError: ref(LoginResults.USERNAME_NO_ERR),
    regPasswordError: ref(LoginResults.PASSWORD_NO_ERR)
};

const notificationMsg = {
    [LoginResults.USERNAME_INVALID_CHARACTER] : 'Username contains an invalid character (alphanumeric only).',
    [LoginResults.INVALID] : 'Incorrect username or password.',
    [LoginResults.USERNAME_NO_ERR] : '',
    [LoginResults.USERNAME_NOT_FOUND] : 'Username does not exist.',
    [LoginResults.PASSWORD_NO_ERR] : '',
    [LoginResults.USERNAME_TAKEN] : 'Username is already taken.',
    [LoginResults.NO_ERR] : '',
    [LoginResults.PASSWORD_NOT_IDENTICAL] : 'Passwords do not match.',
    [LoginResults.REGISTRATION_ERROR] : "Something went wrong during registration",
    [LoginResults.SUCCESSFUL_REGISTRATION] : "Successfully created an account!",
    [LoginResults.SERVER_ERROR] : "A server error occurred."

}

interface userRequest {
    username: string,
    password: string
}

const register = ref(true);
const usernameRef = ref('');
const passwordRef = ref('');
    
const registerUsername = ref('');
const registerPassword = ref('');
const registerSecondaryRef = ref('');


const verifyUsername = (refField: Ref<string, string>) : boolean => {
    // any non-alphanumeric
    const regex = /[^a-z0-9]/i;
    return regex.test(refField.value);
}

const verifyRegister = async () : Promise<void> => {
    if (verifyUsername(registerUsername)) {
        loginNotifications.regUsernameError.value = LoginResults.USERNAME_INVALID_CHARACTER;
        return;
    }
    loginNotifications.regUsernameError.value = LoginResults.USERNAME_NO_ERR;

    if (registerPassword.value !== registerSecondaryRef.value) {
        loginNotifications.regPasswordError.value = LoginResults.PASSWORD_NOT_IDENTICAL;
        return;
    }
    loginNotifications.regPasswordError.value = LoginResults.PASSWORD_NO_ERR;

    // Make API call to try to register
    const data : userRequest = {
        username: registerUsername.value,
        password: registerPassword.value
    }

    const postRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        const target = [config.SITE_BASE_URL, 'users', 'register'].join('/');
        const response = await fetch(target, postRequest);
        if (response.status != 201) {
            // if username is taken
            if (response.status == 409) {
                loginNotifications.registerError.value = LoginResults.USERNAME_TAKEN;
                return;
            }
            else {
                throw new Error('Unknown or generic issue');
            }
        }
            
        const msg = 'Successfully created the account: '+ registerUsername.value + '!';
        registerUsername.value = '';
        registerPassword.value = '';
        registerSecondaryRef.value = '';

        notificationMsg[LoginResults.SUCCESSFUL_REGISTRATION] = msg;
        loginNotifications.registerError.value = LoginResults.SUCCESSFUL_REGISTRATION;
    }
    catch (e) {
        // Parse the error, add more to this later
        loginNotifications.registerError.value = LoginResults.REGISTRATION_ERROR;
        return;
    }
}

const verifyLogin = async () : Promise<void> => {
    if (verifyUsername(usernameRef)) {
        loginNotifications.usernameError.value = LoginResults.USERNAME_INVALID_CHARACTER
        return
    }
    loginNotifications.usernameError.value = LoginResults.USERNAME_NO_ERR;

    const request : userRequest = {
        username : usernameRef.value,
        password : passwordRef.value
    };
    // send request for authorization
    const postRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(request)
    };

    const target = [config.SITE_BASE_URL, 'users', 'auth'].join('/');
    try {
        const response = await fetch(target, postRequest);
        if (!response.ok) {
            if (response.status != 401) {
                loginNotifications.loginError.value = LoginResults.SERVER_ERROR;
            }
            else {
                loginNotifications.loginError.value = LoginResults.INVALID;
            }
        }
        else {
            usernameRef.value = '';
            passwordRef.value = '';
            loginNotifications.loginError.value = LoginResults.NO_ERR;
        }
    } catch(e) {
        loginNotifications.loginError.value = LoginResults.INVALID;
    }

}
</script>

<template>
    <div class="w-full max-w-md">
        <form v-show="register.valueOf()" class="bg-transparent mb-4" v-on:submit.prevent="verifyLogin">
            <div class="text-3xl font-bold green mb-2">
                <h3>Login</h3>
            </div>
            <p class="mb-2">Don&apos;t an account? <a v-on:click="register = !register" class="link green">Register</a></p>
            <div class="my-4">
                <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </label>
                <input type="text" class="input" :class="{error: (loginNotifications.usernameError.value != LoginResults.USERNAME_NO_ERR)}" :maxlength="sizeLimits.username" required aria-required="true" v-model="usernameRef">
                <span class="msg" :class="[(loginNotifications.registerError.value == LoginResults.SUCCESSFUL_REGISTRATION) ? 'success-msg' : 'error-msg']" :v-show="loginNotifications.usernameError.value">{{notificationMsg[loginNotifications.usernameError.value]}}</span>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input class="input" 
                    id="password" type="password" placeholder="******************" v-model="passwordRef" :maxlength="sizeLimits.password" required aria-required="true">
            </div>
            <span class="error-msg" :v-show="loginNotifications.loginError.value != LoginResults.NO_ERR">{{ notificationMsg[loginNotifications.loginError.value] }}</span>
            <div class="flex flex-row gap-y-0 gap-x-8 items-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign In
                </button>
                <RouterLink to="/home" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Continue as Guest
                </RouterLink>
                <!--
                 TODO
                <RouterLink class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="#">
                    Forgot Password?
                </RouterLink>
                -->
            </div>
        </form>
        <form v-show="!register.valueOf()" class="bg-transparent mb-4" v-on:submit.prevent="verifyRegister" ref="registerForm">
            <div class="text-3xl font-bold green mb-2">
                <h3>Register</h3>
            </div>
            <div class="mb-4">
                <label for="reg-username" class="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </label>
                <input id="reg-username" type="text" class="input" :class="{error: (loginNotifications.regUsernameError.value != LoginResults.USERNAME_NO_ERR)}" :maxlength="sizeLimits.username" required aria-required="true" v-model="registerUsername">
                <span class="msg" :class="[(loginNotifications.registerError.value == LoginResults.SUCCESSFUL_REGISTRATION) ? 'success-msg' : 'error-msg']" :v-show="loginNotifications.regUsernameError.value">{{notificationMsg[loginNotifications.regUsernameError.value]}}</span>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="reg-password">
                    Password
                </label>
                <input class="input" 
                    id="reg-password" type="password" placeholder="******************" v-model="registerPassword" :maxlength="sizeLimits.password" required aria-required="true">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="reg-confirm-password">
                    Confirm Password
                </label>
                <input class="input" 
                    id="reg-confirm-password" type="password" placeholder="******************" v-model="registerSecondaryRef" :maxlength="sizeLimits.password" required aria-required="true">
                    <span class="msg" :class="[(loginNotifications.registerError.value == LoginResults.SUCCESSFUL_REGISTRATION) ? 'success-msg' : 'error-msg']" :v-show="loginNotifications.regPasswordError.value === LoginResults.PASSWORD_NOT_IDENTICAL">{{notificationMsg[loginNotifications.regPasswordError.value]}}</span>
            </div>
            <span class="msg" :class="[(loginNotifications.registerError.value == LoginResults.SUCCESSFUL_REGISTRATION) ? 'success-msg' : 'error-msg']" :v-show="loginNotifications.registerError.value != LoginResults.NO_ERR">{{ notificationMsg[loginNotifications.registerError.value] }}</span>
            <div class="flex flex-row gap-y-0 gap-x-8 items-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" v-on:click="register = !register">
                    Go Back
                </button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Register
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
@reference 'tailwindcss';
.input {
    @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight outline-transparent focus:outline-amber-100 focus:outline-1;
}
.error {
    @apply border-red-500;
}
.msg {
    @apply text-sm block mt-4 mb-6 italic;
}
.error-msg {
    @apply text-red-500;
}

.success-msg {
    @apply text-green-500;
}

.link {
    @apply hover:cursor-pointer;
}
</style>
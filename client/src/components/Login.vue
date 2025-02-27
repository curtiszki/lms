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
    USERNAME_TAKEN
};

// Verification for login input
const loginErrors = {
    usernameError: ref(LoginResults.USERNAME_NO_ERR),
    loginError: ref(LoginResults.NO_ERR),
    registerError: ref(LoginResults.NO_ERR),
    regUsernameError: ref(LoginResults.USERNAME_NO_ERR),
    regPasswordError: ref(LoginResults.PASSWORD_NO_ERR)
};

const errorMsg = {
    [LoginResults.USERNAME_INVALID_CHARACTER] : 'Username contains an invalid character (alphanumeric only).',
    [LoginResults.INVALID] : 'Incorrect username or password.',
    [LoginResults.USERNAME_NO_ERR] : '',
    [LoginResults.USERNAME_NOT_FOUND] : 'Username does not exist.',
    [LoginResults.PASSWORD_NO_ERR] : '',
    [LoginResults.USERNAME_TAKEN] : 'Username is already taken.',
    [LoginResults.NO_ERR] : '',
    [LoginResults.PASSWORD_NOT_IDENTICAL] : 'Passwords do not match.',
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
        loginErrors.regUsernameError.value = LoginResults.USERNAME_INVALID_CHARACTER;
        return;
    }
    loginErrors.regUsernameError.value = LoginResults.USERNAME_NO_ERR;

    if (registerPassword.value !== registerSecondaryRef.value) {
        loginErrors.regPasswordError.value = LoginResults.PASSWORD_NOT_IDENTICAL;
        return;
    }
    loginErrors.regPasswordError.value = LoginResults.PASSWORD_NO_ERR;

    // Make API call to try to register
    const data = {
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
        const response = await fetch(`'${[config.SITE_BASE_URL, 'register', 'users'].join('/')}'`, postRequest);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const json = await response.json();
    }
    catch (e) {
        // Parse the error, add more to this later
        loginErrors.registerError.value = LoginResults.USERNAME_TAKEN;
        console.error(e);
        return;
    }
}

const verifyLogin = () : void => {
    if (verifyUsername(usernameRef)) {
        loginErrors.usernameError.value = LoginResults.USERNAME_INVALID_CHARACTER
        return
    }
    loginErrors.usernameError.value = LoginResults.USERNAME_NO_ERR;
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
                <input type="text" class="input" :class="{error: (loginErrors.usernameError.value != LoginResults.USERNAME_NO_ERR)}" :maxlength="sizeLimits.username" required aria-required="true" v-model="usernameRef">
                <span class="text-red-500 text-sm italic" :v-show="loginErrors.usernameError.value">{{errorMsg[loginErrors.usernameError.value]}}</span>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input class="input" 
                    id="password" type="password" placeholder="******************" v-model="passwordRef" :maxlength="sizeLimits.password" required aria-required="true">
            </div>
            <span :v-show="loginErrors.loginError.value != LoginResults.NO_ERR">{{ errorMsg[loginErrors.loginError.value] }}</span>
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
        <form v-show="!register.valueOf()" class="bg-transparent mb-4" v-on:submit.prevent="verifyRegister">
            <div class="text-3xl font-bold green mb-2">
                <h3>Register</h3>
            </div>
            <div class="mb-4">
                <label for="reg-username" class="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </label>
                <input id="reg-username" type="text" class="input" :class="{error: (loginErrors.regUsernameError.value != LoginResults.USERNAME_NO_ERR)}" :maxlength="sizeLimits.username" required aria-required="true" v-model="registerUsername">
                <span class="text-red-500 text-sm italic" :v-show="loginErrors.regUsernameError.value">{{errorMsg[loginErrors.regUsernameError.value]}}</span>
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
                    <span class="text-red-500 text-sm italic" :v-show="loginErrors.regPasswordError.value === LoginResults.PASSWORD_NOT_IDENTICAL">{{errorMsg[loginErrors.regPasswordError.value]}}</span>
            </div>
            <span :v-show="loginErrors.registerError.value != LoginResults.NO_ERR">{{ errorMsg[loginErrors.loginError.value] }}</span>
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

.link {
    @apply hover:cursor-pointer;
}
</style>
<template>
    <div class="w-full max-w-md">
        <form class="bg-transparent mb-4">
            <div class="mb-4">
                <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </label>
                <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800">
            </div>
            <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
            </label>
            <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
            <p class="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Sign In
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
            </a>
        </div>
        </form>
        <p>Don&apos;t an account? <a href="#" class="green">Register</a></p>
    </div>
</template>
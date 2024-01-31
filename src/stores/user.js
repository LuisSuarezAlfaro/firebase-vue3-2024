import {defineStore} from "pinia"
import {ref} from "vue";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../fireBaseConfig.js";
import router from "../router.js";

import {useDataBaseStore} from "./database.js"

export const useUserStore = defineStore("user", () => {
    const userData = ref();
    const loadingUser = ref(false);
    const loadingSession = ref(false);

    const registerUser = async (email, password) => {
        loadingUser.value = true;
        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            userData.value = {email: user.email, uid: user.uid};
            router.push("/");
        } catch (error) {
            console.log(error)
        } finally {
            loadingUser.value = false;
        }
    }

    const loginUser = async (email, password) => {
        loadingUser.value = true;
        try {
            const {user} = await signInWithEmailAndPassword(auth, email, password);
            userData.value = {email: user.email, uid: user.uid};
            router.push("/");
        } catch (error) {
            console.log(error)
        } finally {
            loadingUser.value = false;
        }
    }

    const logoutUser = async () => {
        try {
            const useDataBase = useDataBaseStore();
            useDataBase.$reset();

            await signOut(auth);
            userData.value = null;
            router.push("/login");
        } catch (error) {
            console.log(error)
        }
    }

    const currentUser = () => {
        let unsubscribe;
        return new Promise((resolve, reject) => {
            unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    userData.value = {email: user.email, uid: user.uid};
                } else {
                    userData.value = null;
                }
                resolve(user);
            });
        }).then((user) => {
            unsubscribe();
            return user;
        });
    }

    return {
        userData,
        loadingUser,
        loadingSession,
        registerUser,
        loginUser,
        logoutUser,
        currentUser
    }
})
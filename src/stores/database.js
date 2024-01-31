import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where} from "firebase/firestore/lite";
import {auth, db} from "../fireBaseConfig.js";
import {defineStore} from "pinia";
import {ref} from "vue";
import {nanoid} from 'nanoid';
import router from "../router.js";

export const useDataBaseStore = defineStore("database", () => {

    const documents = ref([])
    const loadingDoc = ref(false)

    function $reset() {
        documents.value = [];
    }

    const getUrl = async (id) => {
        try {
            const refDoc = doc(db, "urls", id);
            const objSpan = await getDoc(refDoc);

            if (!objSpan.exists()) {
                throw new Error("No existe el documento");
            }

            if (objSpan.data().user !== auth.currentUser.uid) {
                throw new Error("No le pertenece ese documento");
            }

            return objSpan.data().name;
        } catch (error) {
            console.log(error);
        } finally {

        }
    }

    const getUrls = async () => {
        loadingDoc.value = true;
        try {
            if (documents.value.length !== 0) {
                return;
            }
            const q = query(
                collection(db, 'urls'),
                where("user", "==", auth.currentUser.uid))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => {
                documents.value.push({id: doc.id, ...doc.data()})
            })
        } catch (error) {
            console.log(error)
        } finally {
            loadingDoc.value = false;
        }
    }

    const addUrl = async (name) => {
        try {
            const objDoc = {
                name: name,
                short: nanoid(6),
                user: auth.currentUser.uid
            };
            const docRef = await addDoc(collection(db, "urls"), objDoc);
            documents.value.push({
                    ...objDoc,
                    id: docRef.id
                }
            )
        } catch (error) {
            console.log(error);
        } finally {

        }
    }

    const updateUrl = async (id, name) => {
        try {
            const refDoc = doc(db, "urls", id);

            const objSpan = await getDoc(refDoc);
            if (!objSpan.exists()) {
                throw new Error("No existe el documento");
            }

            if (objSpan.data().user !== auth.currentUser.uid) {
                throw new Error("No le pertenece ese documento");
            }

            await updateDoc(refDoc, {name: name});
            documents.value = documents.value.map(item => item.id === id ? ({...item, name: name}) : item);
            router.push("/");
        } catch (error) {
            console.log(error.message);
        } finally {

        }
    }

    const deleteUrl = async (id) => {
        try {
            const refDoc = doc(db, "urls", id);

            const objSpan = await getDoc(refDoc);
            if (!objSpan.exists()) {
                throw new Error("No existe el documento");
            }

            if (objSpan.data().user !== auth.currentUser.uid) {
                throw new Error("No le pertenece ese documento");
            }

            await deleteDoc(refDoc);
            documents.value = documents.value.filter(doc => doc.id !== id);
        } catch (error) {
            console.log(error.message);
        } finally {

        }
    }

    return {
        documents,
        loadingDoc,
        $reset,
        getUrl,
        getUrls,
        addUrl,
        updateUrl,
        deleteUrl,
    }

})
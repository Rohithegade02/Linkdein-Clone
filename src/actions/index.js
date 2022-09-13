import { auth,provider,storage,db } from "../firebase"
import { GET_ARTICLES, SET_LOADING_STATUS, SET_USER } from "./actionType"
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import {onSnapshot,collection,query, addDoc,orderBy } from "firebase/firestore"; 
import {  signInWithPopup } from "firebase/auth";
export const setUser = (payload)=>({
    type:SET_USER,
    user:payload
})

export const setLoading=(status)=>({
    type:SET_LOADING_STATUS,
    status:status
})

export  const getArticles=(payload)=>({
    type:GET_ARTICLES,
    payload:payload
})
export function signInAPI(){
    return(dispatch)=>{
        signInWithPopup(auth,provider)
        .then((payload)=>{
           dispatch(setUser(payload.user))
        })
        .catch((error)=>alert(error.message))
    }
}


export function getUserAuth(){
    return (dispatch)=>{
        auth.onAuthStateChanged(async(user)=>{
            if(user){
                dispatch(setUser(user))
            }
        })
    }
}

export function signOutAPI(){
    return(dispatch)=>{
        auth.signOut()
        .then(()=>{
            dispatch(setUser(null));
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
}
export function postArticleAPI(payload){
    return (dispatch) => {
        dispatch(setLoading(true));
        if(payload.image !==''){
            const uploadref = ref(storage, `images/${payload.image.name}`)
            const upload = uploadBytesResumable(uploadref, payload.image);
                   upload.on('state_changed',(snapshot)=>{
                    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                   
                   console.log(`Progress:${progress}%`)
                   if(snapshot.state ==='RUNNING'){
                    console.log(`Progress:${progress}%`)
                   }
                },error =>console.log(error.code),
                async()=>{
                    const downloadURL=await getDownloadURL(upload.snapshot.ref);
                    const colRef = collection(db, "articles")
                    await addDoc(colRef,({
                        actor:{
                            description:payload.user.email,
                            title:payload.user.displayName,
                            image:payload.user.photoURL,
                            date:payload.user.metadata.lastSignInTime
                          
                        },
                        video:payload.video,
                        sharedImg:downloadURL,
                        comments:0,
                        description:payload.description
                    })
                    

                    )
                    dispatch(setLoading(false));
                }
                
                   )
        }else if(payload.video){
            const colRef = collection(db, "articles")
             addDoc(colRef,({
                actor:{
                    description:payload.user.email,
                    title:payload.user.displayName,
                    image:payload.user.photoURL,
                    date:payload.user.metadata.lastSignInTime

                },
                video:payload.video,
                sharedImg:"",
                comments:0,
                description:payload.description
            })
            )
            dispatch(setLoading(false));
        }
    }
}


export function getArticlesAPI(){
    return(dispatch)=>{
        let payload;
        // const colRef=collection((db,"articles")
        //             ,orderBy('actor.date','desc'))
        //             .onSnapshot((snapshot)=>{
        //                 payload=snapshot.docs.map((doc)=>doc.date())
        //                 console.log(payload)
        //             })
        const q =    query(collection(db, "articles"), orderBy("actor.date",'desc'));
                    onSnapshot(q, (snapshot) => {
                    payload=(snapshot.docs.map((doc) => ({ ...doc.data()}))
                   
                    )

                    dispatch(getArticles(payload))
    })
    }
}
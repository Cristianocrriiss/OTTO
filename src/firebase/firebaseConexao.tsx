import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
 // CONFIGURAÇÕES DO FIREBASE - Substitua pelos seus dados

};

const conexao = initializeApp(firebaseConfig);

const autenticacao = getAuth(conexao)

const firestoreDB = getFirestore(conexao); // 2. CRIAR A INSTÂNCIA DO DB

export { autenticacao, firestoreDB }; // 3. EXPORTAR O firestoreDB TAMBÉM


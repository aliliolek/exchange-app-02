// Імпорт модулів з Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Конфігурація Firebase
const firebaseConfig = {
  // ваша конфігурація
};

// Ініціалізація Firebase App
const app = initializeApp(firebaseConfig);

// Отримання Firestore instance
export const db = getFirestore(app);

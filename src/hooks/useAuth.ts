// hooks/useAuth.js
import { auth } from '@/lib/firebase/firebase-config';
import { User } from 'firebase/auth';
import { useState, useEffect } from 'react';
// Упевніться, що шлях до ініціалізації Firebase Auth вірний

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Прибирання підписки під час демонтажу компоненту
    return () => unsubscribe();
  }, []);

  return currentUser;
};

export default useAuth;

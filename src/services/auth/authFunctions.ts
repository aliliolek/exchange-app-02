import { auth } from '@/lib/firebase/firebase-config';
import { signOut } from 'firebase/auth';

const signOutUser = async () => {
  try {
    // Спочатку вийдіть на клієнтській стороні через Firebase
    await signOut(auth);

    // Потім видаліть сесійні кукі через API-маршрут
    const response = await fetch('/api/signOut', {
      method: 'POST',
    });

    if (response.ok) {
      // Можливо, перенаправте користувача на сторінку входу або головну
      console.log('Ви успішно вийшли з системи');
    } else {
      console.error('Помилка при виході з системи');
    }
  } catch (error) {
    console.error('Помилка при виході:', error);
  }
};

export default signOutUser;

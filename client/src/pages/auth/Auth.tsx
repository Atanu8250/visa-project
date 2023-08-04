import { useState } from 'react';
import styles from '../../styles/auth.module.css';
import Login from './Login';
import Register from './Register';

function Auth() {
     const [isLogin, setIsLogin] = useState<boolean>(true);

     const changeToRegister = (): void => {
          setIsLogin(false)
     }

     const changeToLogin = (): void => {
          setIsLogin(true)
     }

     return (
          <div className={styles.container}>
               {
                    isLogin ? <Login changeToRegister={changeToRegister} /> : <Register changeToLogin={changeToLogin} />
               }
          </div>
     )
}

export default Auth
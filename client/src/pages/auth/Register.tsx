import { useState } from 'react';
import styles from '../../styles/auth.module.css';
import { BiHide, BiShowAlt } from 'react-icons/bi';


type Props = {
  changeToLogin(): void
}

function Register({ changeToLogin }: Props) {
  // State for showing/hiding the password input
  const [showPwd, setShowPwd] = useState<boolean>(false);


  // Function to handle the form submission
  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { email, password } = e.currentTarget;
    console.log('email, password :', email, password)
  };


  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleRegister}>
        <h2 className={styles.title}>Sign up</h2>
        <p className={styles.desc}>Sign up and start managing your candidates!</p>

        <div className={styles['input-grp']}>
          <label htmlFor="email">Enter name</label>
          <input id='email' type="text" placeholder="John Deo" className={styles.input} required />
        </div>
        <div className={styles['input-grp']}>
          <label htmlFor="email">Email address</label>
          <input id='email' type="email" placeholder="johndeo@gmail.com" className={styles.input} required />
        </div>

        <div className={styles['input-grp']}>
          <label htmlFor="create_password">Create password</label>
          <div className={styles['input-pwd']}>
            <input
              id='create_password'
              type={showPwd ? "text" : "password"}
              placeholder={showPwd ? "@john&12" : "******"}
              className={styles.input}
              required />
            {showPwd ?
              <BiHide role="button" onClick={() => setShowPwd(!showPwd)} /> :
              <BiShowAlt role="button" onClick={() => setShowPwd(!showPwd)} />}
          </div>
        </div>

        <div className={styles['input-grp']}>
          <label htmlFor="confirm_email">Confirm password</label>
          <input
            id='confirm_email'
            type={showPwd ? "text" : "password"}
            placeholder={showPwd ? "@john&12" : "******"}
            className={styles.input}
            required />
        </div>

        <p onClick={changeToLogin} className={styles.link}>Already have an account?</p>


        {/* Render the submit button */}
        <button type="submit" className={styles.btn}>
          Register
        </button>

      </form>
    </div>
  );
}

export default Register;

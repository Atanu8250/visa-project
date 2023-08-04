import { useState } from 'react';
import styles from '../../styles/auth.module.css';
import { BiHide, BiShowAlt } from 'react-icons/bi';

type Props = {
     changeToRegister(): void
}


function Login({ changeToRegister }: Props) {
     // State for showing/hiding the password input
     const [showPwd, setShowPwd] = useState<boolean>(false);
     // State for managing the view (login, forget password, verify mail)
     const [view, setView] = useState<"login" | "forget-password" | "verify-mail">("login");

     // Function to handle the login process
     const handleLogin = ({ email, password }: { email: string, password: string }): void => {
          console.log('Logged-in');
          console.log('email:', email);
          console.log('password:', password);
          // Here, you can implement your actual login logic, e.g., making API calls, etc.
     };

     // Function to handle verification email request
     const handleVerifyMail = (email: string): void => {
          console.log('Verify mail');
          console.log('email:', email);
          // Implement your logic for sending verification email
     };

     // Function to handle the "forgot password" flow
     const handleForgetPassword = (email: string): void => {
          console.log('Forgotten password');
          console.log('email:', email);
          // Implement your logic for handling forgot password flow, e.g., sending a reset password link, etc.
     };

     // Function to handle the form submission
     const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
          e.preventDefault();
          const { email, password } = e.currentTarget;

          // Handling different views and their respective actions
          if (view === 'login') {
               // For login view, ensure password is provided
               if (!password) {
                    console.error('Password is required for login');
                    return;
               }
               handleLogin({ email: email.value, password: password.value });
          } else if (view === "verify-mail") {
               // For verify-mail view, handle the email verification process
               handleVerifyMail(email.value);
          } else {
               // For forget-password view, handle the "forgot password" flow
               handleForgetPassword(email.value);
          }
     };

     // Array of view configurations for conditional rendering
     const views = [
          { key: "login", text: "Want to login?", handler: () => setView("login") },
          { key: "verify-mail", text: "Not verified mail?", handler: () => setView("verify-mail") },
          { key: "forget-password", text: "Forgot password?", handler: () => setView("forget-password") },
     ];

     return (
          <div className={styles.container}>
               <form className={styles.form} onSubmit={handleFormSubmit}>
                    <h2 className={styles.title}>Sign in</h2>
                    <p className={styles.desc}>Sign in and start managing your candidates!</p>

                    <div className={styles['input-grp']}>
                         <label htmlFor="email">Email address</label>
                         <input id='email' type="email" placeholder="johndeo@gmail.com" className={styles.input} required />
                    </div>

                    {/* Render password input field for the login view only */}
                    {view === "login" && (
                         <div className={styles['input-grp']}>
                              <label htmlFor="password">Enter password</label>
                              <div className={styles['input-pwd']}>
                                   <input
                                        id='password'
                                        type={showPwd ? "text" : "password"} placeholder={showPwd ? "@john&12" : "******"}
                                        className={styles.input}
                                        required />
                                   {showPwd ?
                                        <BiHide role="button" onClick={() => setShowPwd(!showPwd)} /> :
                                        <BiShowAlt role="button" onClick={() => setShowPwd(!showPwd)} />}
                              </div>
                         </div>
                    )}

                    {/* Render view navigation links */}
                    {views.map((v) => {
                         if (view !== v.key) {
                              return (
                                   <p key={v.key} onClick={v.handler} className={styles.link}>
                                        {v.text}
                                   </p>
                              );
                         }
                         return null;
                    })}

                    {/* Render the submit button */}
                    <button type="submit" className={styles.btn}>
                         {view === 'login' ? "Login" : view === "verify-mail" ? "Send verification mail" : "Forget password"}
                    </button>

                    <p onClick={changeToRegister} className={styles.link}>Create an account</p>
               </form>
          </div>
     );
}

export default Login;

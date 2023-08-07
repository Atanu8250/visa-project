import React from 'react'
import styles from '../styles/navbar.module.css';
// type Props = {}

function Navbar() {
     return (
          <header>
               <div className={styles.logo}>
                    <div>
                         <img src='https://d28wu8o6itv89t.cloudfront.net/images/Visadebitcardpng-1599584312349.png' />
                    </div>
                    <h1>VISA Project</h1>
               </div>
          </header>
     )
}

export default Navbar
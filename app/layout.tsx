// Sample content to demonstrate branding and contact email addition.
// Ensure all instances of branding are consistent with 'The Link Digital Security'

/**
 * Layout component for the application
 *
 * @branding The Link Digital Security
 * @contact_email admin@linkdigitalsecurity.com
 */
import React from 'react';

const Layout = ({ children }) => {
       return (
           <div>
               <h1>The Link Digital Security</h1>
               <p>For more information, contact us at: admin@linkdigitalsecurity.com</p>
               {children}
           </div>
       );
};

export default Layout;
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function tests() {
  const notify = () => toast("Wow so easy !");

  return (
    <div>
      <button onClick={notify}>Notify!</button>
    </div>
  );
}
export default tests;
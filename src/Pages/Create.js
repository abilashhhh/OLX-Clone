import React, { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePage = () => {
  return (
    <Fragment>
      <Header />
      <ToastContainer />
      <Create/>
    </Fragment>
  );
};

export default CreatePage;

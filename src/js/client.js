import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";

const app = document.getElementById('root');
ReactDOM.render(<Layout wraperClass="wrapper-div" headerClass="header" contentClass="page-content" footerClass="footer"/>, app);
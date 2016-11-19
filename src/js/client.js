import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";

const app = document.getElementById('root');
const page_id = app.getAttribute("data-page");

ReactDOM.render(<Layout page_id={page_id}/>, app);
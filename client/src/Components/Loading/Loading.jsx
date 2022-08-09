import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./loading.css";
const Loading = () => (
    <div className="loadingSpinner">
        <ClipLoader size={300} />
    </div>
);

export default Loading;

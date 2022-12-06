import React from 'react';
import ReactLoading from "react-loading";

const Laoding = () => {
    return (
        <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "70vh" }}
            >
                <ReactLoading
                    type="bubbles"
                    color="#1976d2"
                    height={100}
                    width={100}
                />
            </div>
        </>
    )
}

export default Laoding
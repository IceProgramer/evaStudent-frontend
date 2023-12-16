import React, { useEffect } from "react";
import { ErrorBlock } from "antd-mobile";

const NotFoundPage: React.FC = () => {
    useEffect(() => {
        document.body.style.background = 'var(--adm-color-background)'
    }, [])
    return <ErrorBlock title="404 NOT FOUND" fullPage />

};

export default NotFoundPage;

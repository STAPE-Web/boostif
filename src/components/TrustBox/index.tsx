import { useEffect } from 'react';

const TrustpilotWidget = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="trustpilot-widget" data-locale="en-US" data-template-id="5613c9abf85e702406ab8c02" data-businessunit-id="6572fadaba14ca001bdaec13" data-style-height="130px" data-style-width="100%" data-theme="light" data-stars="4,5">
            <a href="https://www.trustpilot.com/review/boostif.com" target="_blank" rel="noopener noreferrer">
                <p>Hello</p>
            </a>
        </div>
    );
};

export default TrustpilotWidget;
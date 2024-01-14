import Trustpilot from '@/assets/Trustpilot';
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
        <div className="Trustpilot" >
            <a href="https://www.trustpilot.com/review/boostif.com" target="_blank" rel="noopener">

                {/* <div className="trustpilot-widget" data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="6572f9d3caf96b587b31b8a1" data-style-height="52px" data-style-width="100%">
                <a style={{ background: "#000!important" }} href="https://www.trustpilot.com/review/boostif.com" target="_blank" rel="noopener">Trustpilot</a>
            </div> */}

                <div>
                    <p>Review us on</p>
                    <Trustpilot />
                </div>
            </a>
        </div>
    );
};

export default TrustpilotWidget;
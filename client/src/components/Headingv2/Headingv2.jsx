import "./Headingv2.css";

const Heading = ({ title }) => {
    return (
        <div className="headingv2-wrap">
            <h2 className="headingv2">
                {title}
            </h2>
            <div className="headingv2-ghost">{title}</div>
        </div>
    );
};

export default Heading;

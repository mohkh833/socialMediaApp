import ReactJsAlert from "reactjs-alert";

export const Alert = ({  color, title, status, type }) => {
    return (
            <ReactJsAlert
            className="alert"
            type={type} // success, warning, error, info
            title={title} // title you want to display
            status={true} // true or false
            color={color}
            Close={status}
            />
    );
};

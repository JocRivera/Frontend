import OpenModal from "../../../utilities/forms/login/OpenModal.jsx"
import Login from "../../../utilities/forms/login/LoginForm.jsx"
export default function HandleLogin() {
    return (
        <>
            <OpenModal login={(onClose) =>
            (<Login
                onSubmit={(data) => {
                    console.log(data);
                    onClose();
                }}
                onClose={onClose}
            />)
            } formId="login-form" size="md" />
        </>
    );
}
import OpenModal from "../../../utilities/forms/login/OpenModal.jsx"
import Login from "../../../utilities/forms/login/LoginForm.jsx"
export default function HandleLogin() {
    return (
        <>
            <OpenModal login={(onClose) =>
            (<Login
                onSubmit={() => {
                }}
            />)
            } formId="login-form" size="md" />
        </>
    );
}
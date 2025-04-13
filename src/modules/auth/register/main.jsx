import OpenModal from "../../../utilities/forms/register/OpenModal.jsx"
import Register from "../../../utilities/forms/register/RegisterForm.jsx"
export default function HandleRegister() {
    return (
        <>
            <OpenModal register={(onClose) =>
            (<Register
                onSubmit={(data) => {
                    console.log(data);
                    onClose();
                }}
                onClose={onClose}
            />)
            } formId="register-form" size="lg" />
        </>
    );
}


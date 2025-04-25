import OpenModal from "../../../utilities/forms/register/OpenModal.jsx"
import Register from "../../../utilities/forms/register/RegisterForm.jsx"
export default function HandleRegister() {
    return (
        <>
            <OpenModal register={() =>
            (<Register
                onSubmit={(data) => {
                    console.log(data);
                }}
            />)
            } formId="register-form" size="lg" />
        </>
    );
}


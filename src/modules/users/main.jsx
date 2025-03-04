import React from "react";
import TableComponent from "../../utilities/table/TableComponent";
import UserForm from "../../utilities/forms/users/UserForm";

export default function UsersManagement() {
    const userColumns = [
        { uid: "name", name: "User Name" },
        { uid: "email", name: "Email" },
        { uid: "phone", name: "Phone" },
        { uid: "status", name: "Status" },
    ]
    const initialVisibleColumns = ["user", "email", "phone", "status"]
    const statusOptions = [{ name: "Active", uid: "active" }, { name: "Inactive", uid: "inactive" }];
    const users = [
        {
            id: 1,
            name: "John Doe",
            email: "John@Doe",
            phone: "123456789",
            status: "active",

        },
        {
            id: 2,
            name: "Jane Doe",
            email: "Jane@Doe",
            phone: "123456789",
            status: "active",
        },
    ]

    return (
        <div>
            <TableComponent data={users}
                initialVisibleColumns={initialVisibleColumns}
                statusOptions={statusOptions}
                columns={userColumns}
                formId="user-form"
                Dynamic={(onclose) =>
                    <UserForm
                        onSubmit={(data) => {
                            console.log(data);
                        }}
                        onClose={onclose}
                    />
                }

            />
        </div>
    )

}

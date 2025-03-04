import React from "react";
import TableComponent from "../../utilities/table/TableComponent";
import ClientForm from "../../utilities/forms/clients/ClientForm";
export default function ClientsManagement() {
    const clientColumns = [
        { uid: "client", name: "Client Name" },
        { uid: "email", name: "Email" },
        { uid: "phone", name: "Phone" },
        { uid: "status", name: "Status" },
    ]
    const initialVisibleColumns = ["client", "email", "phone", "status"]
    const statusOptions = [{ name: "Active", uid: "active" }, { name: "Inactive", uid: "inactive" }];
    const clients = [
        {
            id: 1,
            client: "John Doe",
            email: "John@Doe",
            phone: "123456789",
            status: "active",
        },
        {
            id: 2,
            client: "Jane Doe",
            email: "Jane@Doe",
            phone: "123456789",
            status: "active",
        },
    ]


    return (
        <div>
            <TableComponent data={clients}
                initialVisibleColumns={initialVisibleColumns}
                statusOptions={statusOptions}
                columns={clientColumns}
                formId="client-form"
                Dynamic={(onclose) =>
                    <ClientForm
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
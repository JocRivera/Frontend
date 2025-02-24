import React from "react";
import { CircularProgress } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import TableComponent from "../../utilities/table/TableComponent";
import SettingForm from "../../utilities/forms/settings/SettingForm";
export default function SettingsManagement() {
    const settingColumns = [
        { uid: "rol", name: "Rol" },
        { uid: "description", name: "Description" },
        { uid: "status", name: "Status" },
        { uid: "actions", name: "Actions" }
    ];
    const initialVisibleColumns = ["rol", "description", "status", "actions"];
    const statusOptions = [{ name: "Active", uid: "active" }, { name: "Inactive", uid: "inactive" }];
    const [settings, setSettings] = React.useState([
        {
            id: 1,
            rol: "Setting 1",
            description: "Description 1",
            status: "active",
        },
        {
            id: 2,
            rol: "Setting 2",
            description: "Description 2",
            status: "active",
        },
    ]);
    const handleAddSetting = (formData) => {
        const newSetting = {
            id: settings.length + 1,
            rol: formData.rol,
            description: formData.description,
            status: "active",
        };
        setSettings([...settings, newSetting]);
    }
    return (
        <div className="settings-container">
            <TableComponent
                columns={settingColumns}
                data={settings}
                initialVisibleColumns={initialVisibleColumns}
                statusOptions={statusOptions}
                Dynamic={(onClose) => (
                    <SettingForm
                        onSubmit={(data) => {
                            handleAddSetting(data);
                        }}
                        onClose={onClose}
                    />
                )}
                formId="setting-form"
                size="sm"
            />
        </div>

    );
}
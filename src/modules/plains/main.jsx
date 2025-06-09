import React, { useState, useEffect } from "react";
import PlainsCard from "../../utilities/plains/plainsCard";
import PlanForm from "../../utilities/forms/plains/PlanForm";
import PlanService from "../../services/plones/Fetch";
export default function PlainsManagement() {
    const [plains, setPlains] = useState([]);
    const planService = new PlanService();
    const loadPlains = async () => {
        try {
            const data = await planService.fetchPlans();
            setPlains(data);
        } catch (error) {
            console.error("Error loading plains:", error);
        }
    }
    useEffect(() => {
        loadPlains();
    }, []);

    const handleAddPlan = (data) => {
        planService.addPlan(data)
            .then((newPlan) => {
                setPlains((prev) => [...prev, newPlan]);
            })
            .catch((error) => {
                console.error("Error adding plan:", error);
            });
    }
    const handleEditPlan = async (data) => {
        try {
            const updatedPlan = await planService.editPlan(data.id, data);

            // Actualizar el estado con el plan modificado
            setPlains((prev) => prev.map((plan) =>
                plan.id === data.id ? { ...plan, ...updatedPlan } : plan
            ));

            // Opcionalmente, recargar todos los planes para asegurar sincronización
            await loadPlains();

        } catch (error) {
            console.error("Error editing plan:", error);
        }
    }

    return (

        <PlainsCard data={plains}
            formId="plan-form"
            size="3xl"
            editPlains={(handleEditPlan)}
            Dynamic={(onClose, data, onEdit) => (
                <PlanForm
                    onSubmit={(data) => {
                        handleAddPlan(data);
                    }}
                    onClose={onClose}
                    initialData={data}
                    onEdit={onEdit}
                    size="5xl"
                />
            )} />

    )
}
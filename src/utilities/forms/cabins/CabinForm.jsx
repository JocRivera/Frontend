//formulario con select para agregar imagen de cabina

import React, { useState } from 'react';
import { Input, } from "@nextui-org/react";
import { Form } from "@nextui-org/form";

export default function CabinForm() {
    return(
        <Form
            id="cabin-form"
            className="items-center justify-center w-full space-y-4"
            validationBehavior="native"
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            onSubmit={handleSubmit}
        />
    )
}
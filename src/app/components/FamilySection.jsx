"use client"

import React, { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';

const FamilySection = ({ control, register, errors }) => {
    const { fields: familyFields, append: appendFamily, remove: removeFamily } = useFieldArray({
        control,
        name: 'family'
    });

    const [family, setFamily] = useState([
        { name: '', lastName: '', ci: '' }
    ]);

    const removeFamilyMember = (index) => {
        const newFamily = [...family];
        newFamily.splice(index, 1);
        setFamily(newFamily);
        removeFamily(index);
    };

    const addFamilyMember = () => {
        appendFamily({ name: '', lastName: '', ci: '' });
        setFamily([...family, { name: '', lastName: '', ci: '' }]);
    };

    useEffect(() => {
        if (familyFields.length === 0) {
            appendFamily({ ...family });
        }
    }, []);

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Miembros de la Familia</h2>
            {familyFields.map((member, index) => (
                <div key={member.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={`family[${index}].name`} className="block text-gray-700 font-bold mb-2">Nombre</label>
                            <input
                                type="text"
                                id={`family[${index}].name`}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                {...register(`family.${index}.name`, { required: true })}
                            />
                            {errors?.family?.[index]?.name && <p className="text-red-600">Este campo es obligatorio</p>}
                        </div>

                        <div>
                            <label htmlFor={`family[${index}].lastName`} className="block text-gray-700 font-bold mb-2">Apellido</label>
                            <input
                                type="text"
                                id={`family[${index}].lastName`}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                {...register(`family.${index}.lastName`, { required: true })}
                            />
                            {errors?.family?.[index]?.lastName && <p className="text-red-600">Este campo es obligatorio</p>}
                        </div>

                        <div>
                            <label htmlFor={`family[${index}].ci`} className="block text-gray-700 font-bold mb-2">CI</label>
                            <input
                                type="text"
                                id={`family[${index}].ci`}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                {...register(`family.${index}.ci`, { required: true })}
                            />
                            {errors?.family?.[index]?.ci && <p className="text-red-600">Este campo es obligatorio</p>}
                        </div>
                    </div>
                    {index !== 0 &&
                        <button
                            type="button"
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
                            onClick={() => removeFamilyMember(index)}
                        >
                            Eliminar
                        </button>}
                </div>
            ))}
            <button
                type="button"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={addFamilyMember}
            >
                Agregar Miembro de la Familia
            </button>
        </div>
    );
}

export default FamilySection;

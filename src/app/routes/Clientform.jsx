"use client"

import React, { useEffect } from 'react';
import { useFieldArray, useForm, } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, getErrorMessages } from '@/app/validations/userSchema';
import FarmSection from '@/app/components/FarmSection';
import WorkersSection from '@/app/components/WorkersSection';
import FamilySection from '@/app/components/FamilySection';
import { useParams } from 'next/navigation';


const Clientform = () => {

    const params = useParams();

    const { register, handleSubmit, watch, reset, setValue, formState: { errors }, control } = useForm({
        resolver: zodResolver(userSchema),
    });

    const hasRuc = watch("hasRuc", "false");

    useEffect(() => {
        const fetchClientData = async () => {
            if (params.id) {
                try {
                    const response = await axios.get(`/api/client/${params.id}`);
                    const clientData = response.data; 

                    setValue("name", clientData.name || "");
                    setValue("lastName", clientData.lastName || "");
                    setValue("ci", clientData.ci || "");
                    setValue("dateOfBirth", clientData.dateOfBirth || "");
                    setValue("gender", clientData.gender || "");
                    setValue("hasRuc", clientData.hasRuc ? "true" : "false");
                    setValue("rucNumber", clientData.rucNumber || "");

                    if (clientData.hasFarm) {
                        setValue("hasFarm", "true");
                        setValue("farmHa", clientData.farmHa || "");
                        setValue("farmName", clientData.farmName || "");
                        clientData.crops.forEach((crop, index) => {
                            setValue(`crops[${index}]`, crop);
                        });
                    } else {
                        setValue("hasFarm", "false");
                    }

                    if (clientData.family && clientData.family.length > 0) {
                        clientData.family.forEach((member, index) => {
                            setValue(`family[${index}].name`, member.name || "");
                            setValue(`family[${index}].lastName`, member.lastName || "");
                            setValue(`family[${index}].ci`, member.ci || "");
                        });
                    }

                    if (clientData.hasWorkers) {
                        setValue("hasWorkers", "true");
                        setValue("totalWorkers", clientData.totalWorkers || "");
                        setValue("menWorkers", clientData.menWorkers || "");
                        setValue("womanWorkers", clientData.womanWorkers || "");
                        setValue("over18Workers", clientData.over18Workers || "");
                        setValue("under18Workers", clientData.under18Workers || "");
                        setValue("minorWorkersOcuppacion", clientData.minorWorkersOcuppacion || "");

                        if (clientData.hasPregnandWorkers) {
                            setValue("hasPregnandWorkers", "true");
                            setValue("pregnandWorkers", clientData.pregnandWorkers || "");
                            setValue("pregnandWorkersOcuppacion", clientData.pregnandWorkersOcuppacion || "");
                        } else {
                            setValue("hasPregnandWorkers", "false");
                        }
                    } else {
                        setValue("hasWorkers", "false");
                    }

                } catch (error) {
                    console.error('Error al obtener los datos del cliente:', error);
                }
            }
        };

        fetchClientData();
    }, []);

    const onSubmit = async (data) => {
        if (!params.id) {
            try {
                const convertedData = {
                    ...data,
                    hasRuc: data.hasRuc === 'true',
                    hasFarm: data.hasFarm === 'true',
                    hasWorkers: data.hasWorkers === 'true',
                    hasPregnandWorkers: data.hasPregnandWorkers === 'true',
                    farmHa: parseFloat(data.farmHa),
                    totalWorkers: parseInt(data.totalWorkers),
                    menWorkers: parseInt(data.menWorkers),
                    womanWorkers: parseInt(data.womanWorkers),
                    over18Workers: parseInt(data.over18Workers),
                    under18Workers: parseInt(data.under18Workers),
                    pregnandWorkers: parseInt(data.pregnandWorkers),
                };
                const response = await axios.post('api/client', convertedData);
                swal("Cliente guardado!", "los datos del cliente se guardaron", "success");
                reset();
            } catch (error) {
                swal("Error al enviar el formulario", `${error}`, "error");
                console.error('Error al enviar el formulario:', error);
            }
        } else {
            try {
                const convertedData = {
                    ...data,
                    hasRuc: data.hasRuc === 'true',
                    hasFarm: data.hasFarm === 'true',
                    hasWorkers: data.hasWorkers === 'true',
                    hasPregnandWorkers: data.hasPregnandWorkers === 'true',
                    farmHa: parseFloat(data.farmHa),
                    totalWorkers: parseInt(data.totalWorkers),
                    menWorkers: parseInt(data.menWorkers),
                    womanWorkers: parseInt(data.womanWorkers),
                    over18Workers: parseInt(data.over18Workers),
                    under18Workers: parseInt(data.under18Workers),
                    pregnandWorkers: parseInt(data.pregnandWorkers),
                };
                const response = await axios.put('/api/client/' + params.id, convertedData);
                swal("Datos actualizados!", "los datos del cliente se actualizaron", "success");
                reset();
            } catch (error) {
                swal("Error al enviar el formulario", `${error}`, "error");
                console.error('Error al enviar el formulario:', error);
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-3xl mx-auto p-8 w-[80%] my-5 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-8 text-center">Formulario de Registro</h1>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre *</label>
                            <input type="text" id="name" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                {...register("name")} />
                            {errors.name?.message &&
                                <p>{errors.name?.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Apellido *</label>
                            <input type="text" id="lastName" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                {...register("lastName")} />
                            {errors.lastName?.message &&
                                <p>{errors.lastName?.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="ci" className="block text-gray-700 font-bold mb-2">Cédula de Identidad (CI) *</label>
                            <input type="number" id="ci" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                {...register("ci")} />
                            {errors.ci?.message &&
                                <p>{errors.ci?.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="dateOfBirth" className="block text-gray-700 font-bold mb-2">Fecha de Nacimiento *</label>
                            <input type="date" id="dateOfBirth" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                {...register("dateOfBirth")} />
                            {errors.dateOfBirth?.message &&
                                <p>{errors.dateOfBirth?.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">Género *</label>
                        <select id="gender"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("gender")}>
                            <option value="">Seleccione</option>
                            <option value="male">Masculino</option>
                            <option value="female">Femenino</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="hasRuc" className="block text-gray-700 font-bold mb-2">¿Tiene RUC?</label>
                        <select
                            id="hasRuc"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("hasRuc")}
                        >
                            <option value="false">No</option>
                            <option value="true">Sí</option>
                        </select>
                    </div>

                    {hasRuc === 'true' && (
                        <div>
                            <label htmlFor="rucNumber" className="block text-gray-700 font-bold mb-2">Número de RUC</label>
                            <input type="text" id="rucNumber" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                {...register("rucNumber")} />
                            {errors.rucNumber?.message &&
                                <p>{errors.rucNumber?.message}</p>}
                        </div>
                    )}

                    <FarmSection
                        control={control}
                        register={register}
                        errors={errors}
                        watch={watch}
                        setValue={setValue}
                    />

                    <WorkersSection
                        register={register}
                        errors={errors}
                        watch={watch}
                    />

                    <FamilySection
                        control={control}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />


                    {errors && Object.keys(errors).length > 0 && (
                        <div className="error-messages">
                            <ul>
                                {Object.entries(getErrorMessages(errors)).map(([key, message]) => (
                                    <li key={key}>{message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600">
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Clientform
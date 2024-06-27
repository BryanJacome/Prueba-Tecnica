"use client"

import React from 'react';
import { useFieldArray } from 'react-hook-form';

const FarmSection = ({ control, register, errors, watch, setValue }) => {
    const { fields: cropFields, append: appendCrop, remove: removeCrop } = useFieldArray({
        control,
        name: 'crops',
    });

    const handleCropKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const crop = event.target.value
            if (crop) {
                appendCrop({ crop: crop });
                setValue('newCrop', '');
            }
        }
    };

    const hasFarm = watch("hasFarm", "false");

    return (
        <>
            <div>
                <label htmlFor="hasFarm" className="block text-gray-700 font-bold mb-2">¿Tiene finca?</label>
                <select
                    id="hasFarm"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    {...register("hasFarm")}
                >
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                </select>
            </div>

            {hasFarm === 'true' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="farmHa" className="block text-gray-700 font-bold mb-2">Hectáreas de la finca</label>
                        <input type="number" id="farmHa" min={"1"} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("farmHa")} />
                    </div>

                    <div>
                        <label htmlFor="farmName" className="block text-gray-700 font-bold mb-2">Nombre de la finca</label>
                        <input type="text" id="farmName" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("farmName")} />
                    </div>

                    <div>
                        <label htmlFor="crops" className="block text-gray-700 font-bold mb-2">Cultivos</label>
                        <input type="text" id="newCrop" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("newCrop")}
                            onKeyDown={handleCropKeyDown}
                        />
                        {errors.crops?.message &&
                            <p>{errors.crops?.message}</p>}
                        <ul className='flex flex-row flex-wrap my-2 gap-2'>
                            {cropFields.map((item, index) => (
                                <li key={item.id}
                                    className='px-2 py-1 bg-blue-500 text-white font-bold rounded-md'>
                                    {item.crop}
                                    <button className="ml-2" onClick={() => removeCrop(index)}>x</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default FarmSection;

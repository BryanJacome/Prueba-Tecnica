import React from 'react';

const WorkersSection = ({ register, errors, watch }) => {
    const hasWorkers = watch("hasWorkers", "false");
    const hasPregnandWorkers = watch("hasPregnandWorkers", "false");

    return (
        <>
            <div>
                <label htmlFor="hasWorkers" className="block text-gray-700 font-bold mb-2">¿Tiene trabajadores?</label>
                <select
                    id="hasWorkers"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    {...register("hasWorkers")}
                >
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                </select>
            </div>

            {hasWorkers === 'true' && (
                <div>
                    <div>
                        <label htmlFor="workerCount" className="block text-gray-700 font-bold mb-2">Número de trabajadores</label>
                        <input type="number" id="totalWorkers" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("totalWorkers")} />
                    </div>

                    <div>
                        <label htmlFor="workerCount" className="block text-gray-700 font-bold mb-2">Trabajadores hombre</label>
                        <input type="number" id="menWorkers" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("menWorkers")} />
                    </div>

                    <div>
                        <label htmlFor="workerCount" className="block text-gray-700 font-bold mb-2">Trabajadores mujeres</label>
                        <input type="number" id="womanWorkers" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("womanWorkers")} />
                    </div>

                    <div>
                        <label htmlFor="workerCount" className="block text-gray-700 font-bold mb-2">Trabajadores mayores de edad</label>
                        <input type="number" id="over18Workers" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("over18Workers")} />
                    </div>

                    <div>
                        <label htmlFor="workerCount" className="block text-gray-700 font-bold mb-2">Trabajadores menores de edad</label>
                        <input type="number" id="under18Workers" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("under18Workers")} />
                    </div>

                    <div>
                        <label htmlFor="workerCount" className="block text-gray-700 font-bold mb-2">Ocupación de los trabajadores menores de edad</label>
                        <input type="text" id="minorWorkersOcuppacion" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("minorWorkersOcuppacion")} />
                    </div>
                </div>
            )}

            <div>
                <label htmlFor="hasPregnandWorkers" className="block text-gray-700 font-bold mb-2">¿Tiene trabajadores embarazadas?</label>
                <select
                    id="hasPregnandWorkers"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    {...register("hasPregnandWorkers")}
                >
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                </select>
            </div>

            {hasPregnandWorkers === 'true' && (
                <div>
                    <div>
                        <label htmlFor="pregnantWorkerCount" className="block text-gray-700 font-bold mb-2">Número de trabajadores embarazadas</label>
                        <input type="number" id="pregnandWorkers" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("pregnandWorkers")} />
                    </div>

                    <div>
                        <label htmlFor="workerCount" className="block text-gray-700 font-bold mb-2">Ocupación de las trabajadoras hembarazadas</label>
                        <input type="text" id="pregnandWorkersOcuppacion" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            {...register("pregnandWorkersOcuppacion")} />
                    </div>
                </div>
            )}
        </>
    );
}

export default WorkersSection;

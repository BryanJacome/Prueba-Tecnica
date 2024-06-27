import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ModalClient = ({ client, closeModal }) => {
    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[50%] max-h-[500px] overflow-auto relative">
                <div>
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                        <h3 className="text-2xl mb-4">
                            Detalles del Cliente
                        </h3>
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            onClick={closeModal}
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Nombre</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700">{client.name}</dd>
                        </div>

                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Apellido</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700">{client.lastName}</dd>
                        </div>

                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Cédula</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700">{client.ci}</dd>
                        </div>

                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de Nacimiento</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700">{client.dateOfBirth}</dd>
                        </div>

                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">RUC</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700">{client.hasRuc ? 'Sí' : 'No'}</dd>
                        </div>

                        {client.hasRuc && (
                            <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Número de RUC</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700">{client.rucNumber}</dd>
                            </div>
                        )}

                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Género</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700">{client.gender}</dd>
                        </div>

                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Tiene Finca</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700">{client.hasFarm ? 'Sí' : 'No'}</dd>
                        </div>

                        {client.hasFarm && (
                            <>
                                <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Hectáreas de la Finca</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{client.farmHa}</dd>
                                </div>

                                <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Nombre de la Finca</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{client.farmName}</dd>
                                </div>

                                <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Cultivos</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">
                                        {client.crops.map((crop, index) => (
                                            <span key={index} className="mr-2">{crop.crop} - </span>
                                        ))}
                                    </dd>
                                </div>
                            </>
                        )}

                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Familiares</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700">
                                {client.family.map((member, index) => (
                                    <div key={index}>
                                        <p>{member.name} {member.lastName}</p>
                                        <p>Cédula: {member.ci}</p>
                                    </div>
                                ))}
                            </dd>
                        </div>

                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Tiene Trabajadores</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700">{client.hasWorkers ? 'Sí' : 'No'}</dd>
                        </div>

                        {client.hasWorkers && (
                            <>
                                <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Total de Trabajadores</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{client.totalWorkers}</dd>
                                </div>

                                <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Trabajadores Hombres</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{client.menWorkers}</dd>
                                </div>

                                <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Trabajadoras Mujeres</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{client.womanWorkers}</dd>
                                </div>

                                <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Trabajadores Mayores de 18 años</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{client.over18Workers}</dd>
                                </div>

                                <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Trabajadores Menores de 18 años</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{client.under18Workers}</dd>
                                </div>

                                <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Ocupación de Trabajadores Menores</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{client.minorWorkersOcuppacion}</dd>
                                </div>

                                <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Tiene Trabajadores Embarazadas</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{client.hasPregnandWorkers ? 'Sí' : 'No'}</dd>
                                </div>

                                {client.hasPregnandWorkers && (
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Número de Trabajadoras Embarazadas</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700">{client.pregnandWorkers}</dd>
                                    </div>
                                )}

                                {client.hasPregnandWorkers && (
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Ocupación de Trabajadoras Embarazadas</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700">{client.pregnandWorkersOcuppacion}</dd>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="flex justify-end mt-4">
                        <button type="button" onClick={closeModal} className="bg-blue-500 text-white py-2 px-4 rounded-lg">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalClient;

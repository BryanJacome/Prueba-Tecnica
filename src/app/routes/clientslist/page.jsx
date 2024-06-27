"use client"

import ModalClient from '@/app/components/ModalClient';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import swal from 'sweetalert';

async function loadClients() {
    const { data } = await axios.get("http://localhost:3000/api/client");
    return data;
}

function ClientList() {
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const router = useRouter();

    useEffect(() => {
        loadClients().then(data => setClients(data));
    }, []);

    const handleDelete = async (clientId) => {
        swal({
            title: "¿Estás seguro?",
            text: "Se eliminará un cliente",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    try {
                        await axios.delete(`http://localhost:3000/api/client/${clientId}`);
                        setClients(clients.filter(client => client.id !== clientId));
                        swal("¡Cliente eliminado!", {
                            icon: "success",
                        });
                    } catch (error) {
                        console.error("Failed to delete client:", error);
                    }
                } else {
                    swal("Cliente a salvo");
                }
            });
    }

    const openModal = (client) => {
        setSelectedClient(client);
        setShowModal(true);
    }

    const closeModal = () => {
        setSelectedClient(null);
        setShowModal(false);
    }

    return (
        <div className="w-full h-screen p-5">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Client List</h1>
            {showModal && <ModalClient client={selectedClient} closeModal={closeModal} />}
            <div className="overflow-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 border-b border-gray-300 text-center">Nombre</th>
                            <th className="py-3 px-4 border-b border-gray-300 text-center">Apellido</th>
                            <th className="py-3 px-4 border-b border-gray-300 text-center">Cédula</th>
                            <th className="py-3 px-4 border-b border-gray-300 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, index) => (
                            <tr key={index} className="text-center">
                                <td className="bg-[white] py-4 px-4 border-b border-gray-200">{client.name}</td>
                                <td className="bg-[white] py-4 px-4 border-b border-gray-200">{client.lastName}</td>
                                <td className="bg-[white] py-4 px-4 border-b border-gray-200">{client.ci}</td>
                                <td className="bg-[white] py-4 px-4 border-b border-gray-200">
                                    <button onClick={() => openModal(client)} className="text-blue-500 hover:text-blue-700 mx-2">
                                        <FaEye />
                                    </button>
                                    <button onClick={() =>{router.push(`/routes/edit/${client.id}`)}} className="text-yellow-500 hover:text-yellow-700 mx-2">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(client.id)} className="text-red-500 hover:text-red-700 mx-2">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClientList;

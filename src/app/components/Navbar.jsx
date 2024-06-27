"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Navbar() {
    const router = useRouter();

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="text-white text-lg font-bold">Mi Aplicación</div>
                <div className="flex space-x-4">
                    <Link href="/">
                        Inicio
                    </Link>
                    <Link href="/routes/clientslist">
                        Clientes
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

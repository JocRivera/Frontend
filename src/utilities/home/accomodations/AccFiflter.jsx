import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import AccCard from './AccCard';

function AccFilter() {
    const [filterActive, setFilterActive] = useState('cabaña');

    return (
        <main className="w-full px-4 py-8 mx-auto max-w-7xl">
            <header className="mb-8 text-center">
                <nav className="flex justify-center">
                    <div className="flex p-1 bg-gray-100 shadow-sm rounded-xl">
                        <Button
                            className={`px-6 py-3 mx-1 rounded-lg font-semibold transition-all duration-300 ${filterActive === 'cabaña'
                                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                : 'bg-transparent text-gray-600 hover:text-blue-600 hover:bg-white'
                                }`}
                            onClick={() => setFilterActive('cabaña')}
                        >
                            Cabañas
                        </Button>
                        <Button
                            className={`px-6 py-3 mx-1 rounded-lg font-semibold transition-all duration-300 ${filterActive === 'habitacion'
                                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                : 'bg-transparent text-gray-600 hover:text-blue-600 hover:bg-white'
                                }`}
                            onClick={() => setFilterActive('habitacion')}
                        >
                            Habitaciones
                        </Button>
                    </div>
                </nav>
            </header>

            <section className="min-h-[400px]">
                <AccCard type={filterActive} />
            </section>
        </main>
    );
}

export default AccFilter;
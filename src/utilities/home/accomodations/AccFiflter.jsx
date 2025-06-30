import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import AccCard from './AccCard';

function AccFilter() {
    const [filterActive, setFilterActive] = useState('cabaña');

    return (
        <main className='py-16 mt-4'>
            <div className="relative mb-8 -mt-8 text-center">
                <h2 className="pb-2 text-3xl font-bold sm:text-4xl">
                    Nuestros <span className="font-bold text-blue-600">Alojamientos</span>
                </h2>
                <div className="absolute bottom-0 w-32 h-1 transform -translate-x-1/2 bg-blue-600 rounded-full left-1/2"></div>
            </div>
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

            <section >
                <AccCard type={filterActive} />
            </section>
        </main>
    );
}

export default AccFilter;
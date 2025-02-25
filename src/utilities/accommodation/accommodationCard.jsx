import { Card, CardHeader, CardFooter, Image, Button, Input } from "@nextui-org/react";
import { SearchIcon } from "../table/SearchIcon";
import ModalView from "../table/OpenModal";
import React from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

export default function AccommodationCard({ data, Dynamic, formId, size }) {
    const [filterValue, setFilterValue] = React.useState("");
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-3">
                <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Search by name..."
                    startContent={<SearchIcon />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />
                <ModalView FormComponent={Dynamic} formId={formId} size={size} />
            </div>
            <Carousel responsive={responsive}
                infinite={true}
            >
                {data.map((data) => (
                    < Card
                        key={data.id}
                        isFooterBlurred
                        className=" h-[474px] py-4 mx-2" >
                        <Image
                            removeWrapper
                            alt="Card example background"
                            className="z-0 object-cover w-full h-full scale-125 -translate-y-6"
                            src="https://hosterialoslagos.com/wp-content/uploads/2024/09/IMG_5384-768x541.jpg"
                        />
                        <CardFooter className="absolute bottom-0 z-10 justify-between bg-white/30 border-t-1 border-zinc-100/50">
                            <div>
                                <p className="font-bold text-black uppercase text-large ">Nombre cabaña</p>
                                <p className="text-black uppercase text-tiny">$299.99</p>
                                <p>
                                    <span className="text-black text-tiny">Descripcion del plan, servicios que incluye</span>
                                </p>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <Button
                                    className="text-white text-tiny bg-black/20"
                                    color="default"
                                    radius="lg"
                                    size="sm"
                                    variant="flat"
                                >
                                    Detalles
                                </Button>
                                <Button className="text-tiny" color="primary" radius="full" size="sm">
                                    Editar
                                </Button>
                                <Button className="text-tiny" color="danger" radius="full" size="sm">
                                    Eliminar
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>))}

            </Carousel>
        </div>
    );
}
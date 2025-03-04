import { Card, CardHeader, CardFooter, Image, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { SearchIcon } from "../table/SearchIcon";
import { ChevronDownIcon } from "../table/ChevronDownIcon.jsx";
import ModalView from "../table/OpenModal";
import OpenEditModal from "../accommodation/OpenEditModal";
import { capitalize } from "../table/utils.jsx";
import React from "react";
import Carousel from "react-multi-carousel";

export default function AccommodationCard({ statusOptions, data, Dynamic, formId, size, deleteAccommodation, editAccommodation }) {
    const [filterValue, setFilterValue] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const responsive = {
        superLargeDesktop: {
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

    const filteredItems = React.useMemo(() => {
        let filteredData = [...data];

        // Search filter
        if (hasSearchFilter) {
            filteredData = filteredData.filter((item) =>
                item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
                item.description.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== "all" && Array.from(statusFilter).length !== 0) {
            filteredData = filteredData.filter((item) =>
                Array.from(statusFilter).includes(item.status)
            );
        }

        return filteredData;
    }, [data, filterValue, statusFilter]);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-3">
                <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Search"
                    startContent={<SearchIcon />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />
                <div className="flex gap-3">
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                Status
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Status Columns"
                            closeOnSelect={false}
                            selectedKeys={statusFilter}
                            selectionMode="multiple"
                            onSelectionChange={setStatusFilter}
                        >
                            {statusOptions.map((status) => (
                                <DropdownItem key={status.uid} className="capitalize">
                                    {capitalize(status.name)}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <ModalView FormComponent={Dynamic} formId={formId} size={size} />
                </div>
            </div>
            <Carousel
                responsive={responsive}
                infinite={true}
                className="z-0"
            >
                {filteredItems.map((item) => (
                    <Card
                        key={item.id}
                        isFooterBlurred
                        className="h-[474px] py-4 mx-2"
                    >
                        <Image
                            removeWrapper
                            alt="Card example background"
                            className="z-0 object-cover w-full h-full scale-125 -translate-y-6"
                            src={item.image || "https://hosterialoslagos.com/wp-content/uploads/2024/09/IMG_5384-768x541.jpg"}
                        />
                        <CardFooter className="absolute bottom-0 z-10 justify-between bg-white/30 border-t-1 border-zinc-100/50">
                            <div>
                                <p className="font-bold text-black uppercase text-large">{item.name}</p>
                                <p className="text-black uppercase text-tiny">{item.price}</p>
                                <p>
                                    <span className="text-black text-tiny">{item.description}</span>
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
                                <OpenEditModal
                                    FormComponent={Dynamic}
                                    formId={formId}
                                    data={item}
                                    onEdit={editAccommodation}
                                />
                                <Button
                                    className="text-tiny"
                                    color="danger"
                                    radius="full"
                                    size="sm"
                                    onClick={() => deleteAccommodation(item.id)}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </Carousel>
        </div>
    );
}
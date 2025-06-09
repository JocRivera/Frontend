import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import PlanService from "../../../services/plones/Fetch";
import { useState, useEffect } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
    UtensilsCrossed,
    Fish,
    Flower,
    Heart,
    Pizza,
    EggFried,
    Sandwich
} from "lucide-react";

const planService = new PlanService();

const Cardcomponent = ({ data }) => {
    const [plan, setPlan] = useState([]);
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
    const commonMeals = ["Desayuno", "Almuerzo", "Cena", "Refrigerio", "Coctel de bienvenida", "Pezca", "Cena romantica"];

    const iconsService = Object.fromEntries(
        commonMeals.map(meal => [meal, <UtensilsCrossed />])
    );

    iconsService["Spa"] = <Flower />;
    iconsService["Bar"] = <Fish />;
    iconsService["Cena romantica"] = <Heart />;
    iconsService["Coctel de bienvenida"] = <Heart />;
    iconsService["Pezca"] = <Fish />;
    iconsService["Cena"] = <Pizza />;
    iconsService["Desayuno"] = <EggFried />;
    iconsService["Refrigerio"] = <Sandwich />;

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await planService.fetchPlans();
                console.log("Fetched plans:", response);
                setPlan(response);
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };
        fetchPlans();
    }
        , []);

    return (
        <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
        >
            {plan.map((plan) => (
                <Card isFooterBlurred className="h-[474px] py-4 mx-2" key={plan.id}>
                    <Image
                        removeWrapper
                        alt="Card example background"
                        className="z-0 object-cover w-full h-full scale-125 -translate-y-6"
                        src={plan.imagen || "https://hosterialoslagos.com/wp-content/uploads/2024/09/IMG_5384-768x541.jpg"}
                    />
                    <CardFooter className="absolute bottom-0 z-10 justify-between bg-white/30 border-t-1 border-zinc-100/50">
                        <div>
                            <p className="font-bold text-black uppercase text-large">{plan.name}</p>
                            <p className="text-black uppercase text-tiny">${plan.price || "299.99"}</p>
                            <p>
                                <span className="text-black text-tiny">{plan.descripcion || "Descripcion del plan, servicios que incluye"}</span>
                                <div className="flex gap-2 mt-2">
                                    {plan.idService?.map((servicio) => (
                                        <span key={servicio.id} className="text-black text-tiny">{iconsService[servicio.name]} {/* Icono basado en el nombre */}
                                        </span>
                                    ))}
                                </div>
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
                                Reserva
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </Carousel>
    );

}

export default Cardcomponent;
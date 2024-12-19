
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
const Cardcomponent = ({ data }) => {
    return (
        <Card isFooterBlurred className=" h-[474px] py-4 mx-2">
            <Image
                removeWrapper
                alt="Card example background"
                className="z-0 object-cover w-full h-full scale-125 -translate-y-6"
                src="https://hosterialoslagos.com/wp-content/uploads/2024/09/IMG_5384-768x541.jpg"
            />
            <CardFooter className="absolute bottom-0 z-10 justify-between bg-white/30 border-t-1 border-zinc-100/50">
                <div>
                    <p className="font-bold text-black uppercase text-large ">Nombre Plan</p>
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
                        Reserva
                    </Button>
                </div>

            </CardFooter>
        </Card>
    );
}

export default Cardcomponent;
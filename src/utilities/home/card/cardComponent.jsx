
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
const Cardcomponent = () => {
    return (
        <Card isFooterBlurred className=" h-[474px]">
            <Image
                removeWrapper
                alt="Card example background"
                className="z-0 object-cover w-full h-full scale-125 -translate-y-6"
                src="https://hosterialoslagos.com/wp-content/uploads/2024/09/IMG_5384-768x541.jpg"
            />
            <CardFooter className="absolute bottom-0 z-10 justify-between bg-white/30 border-t-1 border-zinc-100/50">
                <div>
                    <p className="text-black text-tiny">Available soon.</p>
                    <p className="text-black text-tiny">Get notified.</p>
                </div>
                <Button className="text-tiny" color="primary" radius="full" size="sm">
                    Notify Me
                </Button>
            </CardFooter>
        </Card>
    );
}

export default Cardcomponent;
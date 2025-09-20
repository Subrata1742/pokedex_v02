import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Shiny = ({ P }) => {
  const images = [P.Shinyimage, P.image];
  return (
    <Carousel className="animate-fadeInUp w-[70vw] md:w-[30vw] md:h-[60vh] mt-6 bg-transparent">
      <CarouselContent>
        {images.map((slot, index) => (
          <CarouselItem
            key={index}
            className=" flex justify-center items-center"
          >
            <Card
              className=" bg-slate-600/40 gap-0.5 w-fit h-[55vh]
               border-slate-700 shadow-lg flex flex-col text-white"
            >
              <CardHeader>
                <CardTitle className="capitalize font-bold text-center text-xl py-2 shadow mx-auto ">
                  {P.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="mb-2">
                <Image
                  src={slot}
                  alt={P.name}
                  width={300}
                  height={300}
                  quality={100}
                  priority
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" bg-transparent md:bg-slate-600/40 size-12 md:size-14" />
      <CarouselNext className="bg-transparent md:bg-slate-600/40 size-12 md:size-14" />
    </Carousel>
  );
};

export default Shiny;

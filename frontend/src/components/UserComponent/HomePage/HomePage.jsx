import React from "react";
import Navbar from "../Navbar/Navbar";
import { Button } from '../../ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../ui/carousel";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function CarouselDemo() {
    return (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}


const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />
            <CarouselDemo />
            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto p-6">
                    {/* Welcome Section */}
                    <h1 className="text-4xl font-bold text-center mb-8">Welcome to ExamSystem</h1>
                    <p className="text-center text-lg text-gray-600 mb-12">
                        Your one-stop platform for managing exams, grievances, and academic processes.
                    </p>
                    <div className="bg-red-500 text-red p-4">
                        Tailwind is working!
                    </div>
                    <div className="bg-primary text-red p-4">
                        This is a div with the primary background color.
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4">
                &copy; Built By Atharva Chavan(atharva2003chavan@gmail.com)
            </footer>
        </div>
    );
};

export default HomePage;

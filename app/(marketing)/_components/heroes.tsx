import Image from "next/image";

export const Heroes = () => {
    const heroes = ( <div className="flex flex-col items-center justify-center max-w-5xl">
        <div className="flex items-center">
            <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] m:w-[400px] md:h-[400px]">
            <Image 
            src="/documents.svg"
            fill
            alt="documents"
            className="object-contain dark:hidden"
            />
             <Image 
            src="/documents-dark.svg"
            fill
            alt="documents"
            className="object-contain dark:block hidden"
            />
            </div>
            <div className="relative h-[400px] w-[400px] hidden md:block">
            <Image 
            src="reading.svg"
            fill
            alt="reading"
            className="dark:hidden"
            />
             <Image 
            src="/read-dark.png"
            fill
            alt="documents"
            className="object-contain dark:block hidden"
            />
            </div>
        </div>
    </div>)


    return (
       heroes
    )
}
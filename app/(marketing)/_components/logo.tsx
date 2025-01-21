import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/botion-logo-light.svg"
        priority
        alt="Logo"
        width={40}
        height={40}
        className="dark:hidden"
      />
      <Image
        src="/botion-logo-dark.svg"
        priority
        alt="Logo"
        width={40}
        height={40}
        className="hidden dark:block"
      />
      <p className="font-semibold">Botion</p>
    </div>
  );
};
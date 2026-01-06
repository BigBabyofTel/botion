'use client';

import { MenuIcon } from 'lucide-react';
import Title from '@/app/(main)/_components/title';
import Banner from './banner';
import { Menu } from './menu';
import { Publish } from './publish';
import { Id } from '@/convex/_generated/dataModel';

//typing the props passed into the  navbar component
interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
  documentId?: string;
}

export const Navbar = ({
  isCollapsed,
  onResetWidth,
  documentId,
}: NavbarProps) => {
  //function to set the params and access this page

  return (
    <>
      <nav className="bg-background dark:bg-background-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Title initialData={null as any} />
          <div className="flex items-center gap-x-2">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Publish initialData={null as any} />
            <Menu documentId={documentId as Id<'documents'>} />
          </div>
        </div>
      </nav>
      {documentId && <Banner documentId={documentId as Id<'documents'>} />}
    </>
  );
};

export default Navbar;

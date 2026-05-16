import React from 'react';
import { cn } from '@/lib/utils';
import { GridPattern } from '@/components/ui/GridPattern';

function getRandomPattern(length?: number): [x: number, y: number][] {
  length = length ?? 5;
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}

export function GridCard({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'group relative isolate z-0 flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a] px-5 py-4 transition-colors duration-75',
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0">
        <div className="absolute -inset-[25%] -skew-y-12 [mask-image:linear-gradient(225deg,black,transparent)]">
          <GridPattern
            width={30}
            height={30}
            x={0}
            y={0}
            squares={getRandomPattern(5)}
            className="fill-white/[0.03] stroke-white/[0.06] absolute inset-0 size-full translate-y-2 transition-transform duration-150 ease-out group-hover:translate-y-0"
          />
        </div>
        <div
          className={cn(
            'absolute -inset-[10%] opacity-0 blur-[50px] transition-opacity duration-150 group-hover:opacity-10',
            'bg-[conic-gradient(#ffffff_0deg,#666666_117deg,#333333_180deg,#666666_240deg,#ffffff_360deg)]',
          )}
        />
      </div>
      {children}
    </div>
  );
}

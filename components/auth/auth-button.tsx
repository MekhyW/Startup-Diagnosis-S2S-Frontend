'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AuthButtonProps {
  className?: string;
}

export function AuthButton({ className }: AuthButtonProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Button variant="outline" disabled className={cn('min-w-[120px]', className)}>
        Carregando...
      </Button>
    );
  }

  if (session) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {session.user?.name || session.user?.email}
            </span>
            {session.user?.name && session.user?.email && (
              <span className="text-xs text-muted-foreground">
                {session.user.email}
              </span>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut()}
          className="ml-2"
        >
          Sair
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => signIn('google')}
      className={cn('min-w-[120px]', className)}
    >
      Entrar com Gmail
    </Button>
  );
}
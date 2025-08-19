'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Container } from '@/app/components/Container';
import Link from 'next/link';

const errorMessages: Record<string, string> = {
  Configuration: 'Há um problema com a configuração do servidor.',
  AccessDenied: 'Você não tem permissão para fazer login.',
  Verification: 'O token de verificação expirou ou já foi usado.',
  Default: 'Ocorreu um erro durante a autenticação.',
};

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  
  const errorMessage = error && errorMessages[error] 
    ? errorMessages[error] 
    : errorMessages.Default;

  return (
    <Container className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-red-600">Erro de Autenticação</h1>
          <p className="text-muted-foreground">
            {errorMessage}
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full" size="lg">
            <Link href="/auth/signin">
              Tentar Novamente
            </Link>
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Se o problema persistir, entre em contato com o suporte.
          </p>
        </div>
      </div>
    </Container>
  );
}
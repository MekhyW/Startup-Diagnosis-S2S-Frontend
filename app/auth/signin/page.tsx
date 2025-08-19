'use client';

import { signIn, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Container } from '@/app/components/Container';

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push('/');
      }
    });
  }, [router]);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Bem-vindo ao Startup Diagnosis</h1>
          <p className="text-muted-foreground">
            Faça login com seu email Link ou conta do Gmail para acessar a plataforma.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? 'Entrando...' : 'Entrar com o Gmail'}
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Seu email será usado para identificação durante a sessão de entrevista
            e garantir o acesso seguro à plataforma.
          </p>
        </div>
      </div>
    </Container>
  );
}
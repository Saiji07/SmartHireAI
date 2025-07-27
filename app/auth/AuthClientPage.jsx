"use client";

import React from 'react';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { createBrowserClient } from '@supabase/ssr';
import { useUser } from '@/context/UserDetailContext';

// Note: The component name is updated for clarity
export default function AuthClientPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useUser();
    const redirectTo = searchParams.get('redirectTo') || '/dashboard';

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    useEffect(() => {
        if (user) {
            router.push(redirectTo);
        }
    }, [user, router, redirectTo]);

    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='flex flex-col items-center border rounded-2xl p-8 '>
                <Image
                    src={"/logo1.png"} alt='Smart Hire AI'
                    width={400} height={100}
                    className='w-[180px] rounded 20-xl'
                />
                <div className='flex flex-col items-center mt-5'>
                    <Image
                        src={"/login.jpg"} alt='Smart Hire AI'
                        width={900} height={900}
                        className='w-[400px] h-[250px] rounded 2-xl'
                    />
                    <h2 className='text-2xl font-bold text-center mt-5'>Welcome To SmartHire AI </h2>
                    <p className='text-gray-500 text-center'>Sign in With Google Authentication </p>
                    <Button onClick={signInWithGoogle} className='mt-7 w-full'>Login With Google</Button>
                </div>
            </div>
        </div>
    );
}

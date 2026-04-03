import React from 'react'
import { Button } from './ui/button'

export default function CTA({ text, mobile }: { text: string; mobile?: boolean }) {
    return (
        <Button className={`rounded-full bg-primary p-6 text-base capitalize font-medium text-white transition-transform duration-160 ease-out hover:bg-gold active:scale-[0.97] tracking-tighter ${mobile ? "inline-flex w-full" : "hidden md:inline-flex"}`}>
            {text}
        </Button>
    )
}

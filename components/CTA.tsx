import React from 'react'
import { Button } from './ui/button'

export default function CTA({ text }: { text: string }) {
    return (
        <Button className="hidden rounded-full bg-primary p-6 text-base capitalize font-medium text-white transition-transform duration-160 ease-out hover:bg-gold active:scale-[0.97] md:inline-flex tracking-tighter">
            {text}
        </Button>
    )
}

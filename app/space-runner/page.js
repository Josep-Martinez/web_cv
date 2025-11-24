// app/space-runner/page.js
"use client";

import React from "react";
import SpaceRunnerGame from "../components/space-runner/SpaceRunnerGame";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SpaceRunnerPage() {
    return (
        <div className="w-full h-screen bg-black overflow-hidden relative">
            <SpaceRunnerGame isPage={true} />

            {/* Back Button (Optional, as game has close button, but good for UX) */}
            <Link
                href="/works"
                className="absolute top-4 left-4 z-[70] p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
                <ArrowLeft size={24} />
            </Link>
        </div>
    );
}

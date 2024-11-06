import Image from "next/image"

export default function Component() {
    return (
        <div className="relative min-h-[600px] overflow-hidden bg-gradient-to-t from-[#fafafa] via-[#21482a] to-[#1B2E20]">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(67,56,202,0.1),transparent_50%)]" />
            <div className="container mx-auto px-4 py-20 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-[#c4f0ce] text-transparent bg-clip-text mb-6">
                            Welcome to Gizzia Forum!
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 mb-8">
                            Here, we can share knowledge, experiences, and tips on nutrition and healthy living. Feel free to ask questions, learn, and of course, share information with others!
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-8">
                                <Image
                                    src="/logo.png"
                                    alt="Miller"
                                    width={300}
                                    height={100}
                                    className="opacity-50 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[400px] hidden lg:block">
                        {/* Floating avatars with different animations */}
                        <div className="absolute animate-float-slow" style={{ top: '5%', left: '10%' }}>
                            <Image src="/foto1.jpg" alt="Community member" width={60} height={60} className="rounded-full" />
                        </div>
                        <div className="absolute animate-float-slow delay-200" style={{ top: '15%', right: '15%' }}>
                            <Image src="/foto2.jpeg" alt="Community member" width={60} height={60} className="rounded-full" />
                        </div>
                        <div className="absolute animate-float-slow delay-500" style={{ top: '30%', left: '25%' }}>
                            <Image src="/foto3.jpg" alt="Community member" width={60} height={60} className="rounded-full" />
                        </div>
                        <div className="absolute animate-float-slow delay-700" style={{ top: '45%', right: '30%' }}>
                            <Image src="/foto4.jpg" alt="Community member" width={60} height={60} className="rounded-full" />
                        </div>
                        <div className="absolute animate-float-slow delay-300" style={{ top: '60%', left: '20%' }}>
                            <Image src="/foto5.jpg" alt="Community member" width={60} height={60} className="rounded-full" />
                        </div>
                        <div className="absolute animate-float-slow delay-1000" style={{ top: '75%', right: '25%' }}>
                            <Image src="/foto6.jpg" alt="Community member" width={60} height={60} className="rounded-full" />
                        </div>
                        <div className="absolute animate-float-slow" style={{ top: '85%', left: '35%' }}>
                            <Image src="/foto7.jpg" alt="Community member" width={60} height={60} className="rounded-full" />
                        </div>
                        <div className="absolute animate-float-slow delay-200" style={{ top: '10%', right: '40%' }}>
                            <Image src="/foto8.avif" alt="Community member" width={60} height={60} className="rounded-full" />
                        </div>
                        <div className="absolute animate-float-slow delay-500" style={{ top: '25%', left: '45%' }}>
                            <Image src="/foto9.avif" alt="Community member" width={60} height={60} className="rounded-full" />
                        </div>
                        <div className="absolute animate-float-slow delay-700" style={{ top: '40%', right: '5%' }}>
                            <Image src="/foto10.jpg" alt="Community member" width={60} height={60} className="rounded-full" />
                        </div>
                        <div className="absolute animate-float-slow delay-300" style={{ top: '55%', left: '5%' }}>
                            <Image src="/foto11.jpg" alt="Community member" width={60} height={60} className="rounded-full" />
                        </div>
                        <div className="absolute animate-float-slow delay-1000" style={{ top: '70%', right: '45%' }}>
                            <Image src="/foto12.jpg" alt="Community member" width={60} height={60} className="rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
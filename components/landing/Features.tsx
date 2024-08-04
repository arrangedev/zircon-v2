const stats = [
    { id: 1, name: 'Developers have gotten jobs through Zircon', value: '80+' },
    { id: 2, name: 'All educational content on Zircon is free', value: '$0' },
    { id: 3, name: 'All Zircon users report being able to learn faster', value: '100%' },
    { id: 4, name: 'Zircon is creating hundreds of new Solana devs, weekly', value: '300' },
]

export default function Features() {
    return (
        <div className="text-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center gap-y-2">
                        <h2 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance ">
                            Escape tutorial hell. Forever.
                        </h2>
                        <p className="text-lg leading-8 text-gray-400 max-w-xl mx-auto">
                            Zircon helps new and advanced Solana developers developer their skills 10x faster with curated instructional materal.
                        </p>
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.id} className="flex flex-col bg-gray-200/10 p-8 gap-y-1">
                                <dt className="text-sm font-semibold leading-6 text-gray-400">{stat.name}</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-white">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
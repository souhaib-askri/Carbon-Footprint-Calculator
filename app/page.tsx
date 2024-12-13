import React from 'react';

export default function Page() {
    return (
        <div className='flex-1 overflow-auto'>
            <div className="font-sans p-6 max-w-7xl mx-auto ">
                <header className="text-center my-40">
                    <h1 className="text-4xl font-bold text-primary mb-4">Reducing Carbon Footprint for a Better Environment</h1>
                    <p className="text-xl text-foreground">
                        Small actions today can have a significant impact on the planet tomorrow. Learn how to reduce your carbon footprint!
                    </p>
                </header>

                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-primary mb-4">What is Carbon Footprint?</h2>
                    <p className="text-lg leading-relaxed text-foreground mb-6">
                        A carbon footprint is the total amount of greenhouse gases emitted into the atmosphere due to human activities,
                        expressed as tons of CO2 equivalent. These gases, such as carbon dioxide (CO2), methane (CH4), and nitrous oxide
                        (N2O), trap heat in the Earth's atmosphere, contributing to global warming.
                    </p>
                    <p className="text-lg leading-relaxed text-foreground mb-6">
                        Human activities, including energy production, transportation, food consumption, and waste management, contribute
                        significantly to the carbon footprint. The larger the carbon footprint, the greater the environmental impact.
                    </p>
 
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-primary mb-4">How to Reduce Your Carbon Footprint</h2>
                    <p className="text-lg leading-relaxed text-foreground mb-6">
                        There are many ways to reduce your carbon footprint. Every small action contributes to a healthier planet. Here
                        are some key actions you can take to make a difference:
                    </p>
                    <ul className="list-disc pl-8 text-lg text-foreground mb-6">
                        <li>1. <strong>Use public transport</strong> or walk instead of driving to reduce emissions from fossil fuels.</li>
                        <li>2. <strong>Reduce, Reuse, and Recycle:</strong> Minimize waste and buy recycled products whenever possible.</li>
                        <li>3. <strong>Switch to renewable energy:</strong> Support solar, wind, or hydroelectric power to reduce reliance on fossil fuels.</li>
                        <li>4. <strong>Eat a plant-based diet:</strong> The agriculture industry is a major contributor to greenhouse gases, so eating less meat can have a significant impact.</li>
                        <li>5. <strong>Improve home energy efficiency:</strong> Insulate your home, turn off unused appliances, and use energy-efficient light bulbs.</li>
                    </ul>

                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-primary mb-4">The Benefits of Reducing Your Carbon Footprint</h2>
                    <p className="text-lg leading-relaxed text-foreground mb-6">
                        By reducing your carbon footprint, you contribute to:
                    </p>
                    <ul className="list-disc pl-8 text-lg text-foreground mb-6">
                        <li><strong>Mitigating climate change:</strong> Lower emissions help limit the effects of global warming.</li>
                        <li><strong>Improving public health:</strong> Reducing air pollution improves air quality and lowers the risk of respiratory diseases.</li>
                        <li><strong>Enhancing biodiversity:</strong> A reduced carbon footprint helps protect ecosystems and wildlife habitats.</li>
                        <li><strong>Saving money:</strong> Many eco-friendly choices, like reducing energy use or driving less, also save money in the long run.</li>
                    </ul>
 
                </section>

                <footer className="text-center mt-16 text-sm text-foreground">
                    <p>&copy; 2024. Every action counts towards a greener planet. Let's make the change!</p>
                </footer>
            </div>
        </div>
    );
}

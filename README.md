# Dark Sun

### How to get this running at home

I haven't done a lot of setting up to get this to work elsewhere, so bear with me. This assumes you have WAMP running, and the project (at least the php & media files) are located in its www folder under /DarkSun; this will be necessary for loading models and textures
Once you have the project unzipped, run `npm install` from the command prompt, in the Dark Sun folder.
Make sure WAMP is running, then run `npm start`. This will start the client-side server

Pitfalls

-   If you get errors saying 'could not load' and 'failed to fetch', WAMP is not running
-   If you get errors saying 'Access to image blocked by CORS`, the getmedia.php script is in the wrong place
-   If you get errors saying 'Unexpected token < in JSON at position 0', the media folder is in the wrong place

### Gameplay

This is a top-down spaceship shooter with RPG elements. Salvage parts off the enemy ships you destroy, to increase your ship's power. Rather than
collecting fully working ship upgrades, you must collect multiple inner components of a part before having a functioning version. You can then upgrade that part with new components as you go. But you must be careful; too much damage to your ship will leave your parts with broken components, and no way to fix them.

The type of ship you build is entirely up to you. Ships are constructed from a core block (containing the pilot), and all attachable parts have their own hull. If you have ever played Battleships Forever or Warning Forever, these ships will look similar to that, but each part hull has a specific purpose.

The types of parts available will vary widely, enabling many strategies in engaging enemies. You may choose to attack with lots of machine guns, or large cannons. You might prefer rockets, or rely on beam cannons. You could even go for stealthy options, and hack the computers of your oponents until their systems fail. Defensive options will vary just as much.

You will face a wide variety of enemy ships, from different species. Each will attack you in different ways. Resources and energy will be a constant concern. Various engine types will provide power from different sources, some cheaper to operate than others. Certain weapons (and defensive measures) will demand great shifts in power flow, which can only be handled with energy capacitors.

### Acquiring Equipment

Enemy ships will be composed in the same manner as the player ship. During combat, if the player is able & lucky enough, they can target some portions of an enemy ship, so that the other parts can be salvaged. (A ship is still functional so long as the ship core isn't destroyed.)

Once a ship's core takes enough damage, it explodes. This has a chance to damage parts it was connected to. Either way, the parts it was connected to will begin drifting slowly through space, since there is nothing to control its movements. Players will then use a grappling hook to snatch the part and pull it to their ship.

Each part collected in the game will come with a hull. This is mostly a large chunk of metal, and is usually not in the best shape (it was, after all, part of the losing ship). If a player has the parts, they can grind the hull into metal scraps, which can be used for other purposes such as gun ammunition and repairing other hulls.

Inner components of a part are specific to the type of part that is collected, and can only be used in the same type of part. Parts will come in many levels, some levels having access to a wider range of components. Components can also have modifier properties, which can change the performance of that part in any number of ways. (This is akin to how Diablo II items could have magical attributes added to them). Components of a part can also be scrapped, and can provide a wider range of resources (circuitry, for example).

### Part Types

Ships can be outfitted with a wide variety of parts. Here are just some of them

-   Engines. These will provide power in the form of electricity for your entire ship. Power production will vary based on demand, reducing production to save fuel when demand is lower.

    -   Solar. Simple panels of cells. They can take up lots of room, though. Unfortunately, they lose their effectiveness if you are too far away from a star
        -   Panel (stackable). Absorbs energy
        -   Inverter. Converts electricity to a more useful voltage
    -   Diesel / gasoline crank engine. These work with air recyclers that can extract carbon from the exhaust, putting the air back into the engine. They still require fuel to run, and benefit from having more oxygen
        -   Crankshaft
        -   Valve assembly
        -   Timing computer
        -   Fuel-air mixer - These can be carburetor, fuel injectors, or hybrid units
        -   Gas carbon extractor - Extracts carbon from the exhaust gasses, so that the air can be used again
        -   Alternator - converts engine power to electricity for the ship
    -   Hydrogen fuel cells, combine a mix of materials to produce heat
    -   RadioIsotope ThermalElectric Generators. Low power but lasts forever (in game speak, at least)
    -   Nuclear fission with steam turbine
    -   Nuclear fission with molten salt

-   Capacitors. Energy storage devices that are provided to aid in running various parts. Many parts will require large amounts of energy to run, sometimes for short periods of time. Other parts may suddenly draw more power than your engine outputs. Capacitors are designed to carry the power load so your engines can catch up with demand.
    -   Electrode Capacitor. This is a basic unit
    -   M
-   Thrusters. Allows your ship to move around. Thrusters come in a wide variety of sizes and methods for thrust.
-   Storage. Provides storage of items. Item storage can be expanded by adding on however many storage parts you wish. However, the more you carry, the heavier your ship becomes.
-   Fluid Storage. Stores fluids and gasses of various types, including fuel. Many fluid storage parts allow more than one type to be stored in it, by way of shifting walls within it; the number of fluids will be limited, along with the total capacity.
-   Scrap makers. Turns unwanted or broken parts into scrap metal and other materials, for use in building other things with it. These require power to run, and can be turned off during combat.
-   Ammo assemblers. Turns scrap metal into ammunition for your guns and cannons. Ammo types produced by this can range between metal spheres for rail guns to sophisticated smart missiles, depending on how capable the assembler is and the materials you have available.
-   Component assemblers. Turns scrap and other materials into part components or whole parts. Components that the player wishes to build must be broken down by this to determine how it works. It may take several tries to properly scan and produce the part the player wishes to build. This process can require a lot of energy.

### Offensive Options

Ship can be equipped with weapons of many types. Here are a few

-   Projectile weapons. This can range between gatlin guns that fire small rounds rapidly, rifles that are focused on range, to cannons that fire high-mass rounds with long reload times, and everything in between.
-   Plasma. Fires small shells that are super-heated, burning holes through enemy ships. Requires a lot of energy to fire, but still effective. Heavy-metal armor and shields are effective at absorbing damage from this.
-   Explosive warheads. Fires with less mass than cannons, but explodes on impact. Capable of dealing extreme damage
-   Lasers. Shoots a steady stream of light, rapidly heating hulls and melting equipment
-   Rockets and missiles. Larger projectiles that fire with a propellant, increasing its speed. They can be equipped with guidance systems, between low and high complexity, affecting how their payloads are delivered.
    -   Explosive warheads. Simple, but can cause extreme damage if detonated in the right spot
    -   Acidic warheads. A small explosion spreads the acid over a wide area
    -   EMP warheads. Generates a poweful electric pulse on the enemy ship. To those not prepared for this, it can disable the entire ship. It generally disables only one part, and can destroy electronic components.
    -   Anti-shield warheads. When this impacts a shield, it sends a feedback loop into the shield generator, disabling it. Ineffective on anything else. Shield generators can be equipped with repair modules to correct this, or other methods to restart the shield
    -   Cyber crack warhead. When used on electronic-based parts, will hack into their systems and attempt to take over the part. When successful, this virus will continue trying to take over other connected parts. If the victim isn't prepared for this, will take over the entire ship, turning it to work for you instead of your enemies. Ship parts can be equipped with cyber security measures to prevent such attacks
-   Blades, saws and jaws. Several melee style weapons will be available for close-quarters combat

### Defensive Options

Your ship (and enemy ships) will have a large number of defensive options. Here are just a few

-   Armor plating. Raw weight in heavy armor. It is very effective against projectile fire, even heavy rounds. However, it is very heavy, leaving your ship slow to move around unless using larger thrusters
-   Reactive Armor. Lighter armor plates that explode when hit. While effective, it doesn't last very long in combat, and requires fresh explosives to repair
-   Defense cannon. Small cannons that shoots at a high fire rate at incoming projectiles. This is mostly effective against missiles and slower moving rockets.
-   Optical Stealth. Hide your ship by projecting images of what is behind you. This stealth can be overcome with light-beacon drones
-   Radar Stealth. Hide your ship from radar detection
-   Radar scrambling drones. Launch small drones that emit radar signals to confuse enemy radar systems
-   Shield Generators. Creates a bubble-type shield that blocks all enemy fire. These have a limited size to them, and can only take so many shots before being overloaded.

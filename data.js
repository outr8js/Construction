// SoCal Construction Pricing Data 2024-2025
// Prices are based on research from LA and Orange County markets

const PRICING_DATA = {
    // County-specific multipliers (OC is slightly higher in some areas)
    countyMultipliers: {
        la: 1.0,
        oc: 1.08 // OC typically 5-10% higher
    },

    // Labor rates by trade (hourly)
    laborRates: {
        la: {
            generalLaborer: { min: 22, max: 35 },
            carpenter: { min: 45, max: 65 },
            electrician: { min: 75, max: 150 },
            plumber: { min: 75, max: 150 },
            hvacTech: { min: 75, max: 125 },
            painter: { min: 30, max: 50 },
            tileInstaller: { min: 40, max: 70 },
            roofer: { min: 50, max: 100 },
            concreteMason: { min: 50, max: 80 },
            drywall: { min: 40, max: 60 },
            framer: { min: 35, max: 55 }
        },
        oc: {
            generalLaborer: { min: 24, max: 38 },
            carpenter: { min: 48, max: 70 },
            electrician: { min: 80, max: 160 },
            plumber: { min: 80, max: 160 },
            hvacTech: { min: 80, max: 135 },
            painter: { min: 32, max: 55 },
            tileInstaller: { min: 45, max: 75 },
            roofer: { min: 55, max: 110 },
            concreteMason: { min: 55, max: 85 },
            drywall: { min: 45, max: 65 },
            framer: { min: 38, max: 60 }
        }
    },

    // Job categories and items
    categories: [
        {
            id: 'adu',
            name: 'ADU Construction',
            icon: 'home',
            colorClass: 'cat-adu',
            jobs: [
                {
                    id: 'adu-new-detached',
                    name: 'New Detached ADU',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 300, max: 450 }, oc: { min: 325, max: 475 } },
                    description: 'Complete new construction of detached accessory dwelling unit',
                    laborPercent: 45,
                    materialPercent: 40,
                    permitPercent: 5,
                    overheadPercent: 10,
                    hoursPerUnit: 0.5,
                    materials: [
                        { name: 'Foundation & Concrete', percentOfMaterial: 15 },
                        { name: 'Framing & Lumber', percentOfMaterial: 20 },
                        { name: 'Roofing Materials', percentOfMaterial: 10 },
                        { name: 'Electrical & Plumbing', percentOfMaterial: 20 },
                        { name: 'HVAC System', percentOfMaterial: 10 },
                        { name: 'Insulation & Drywall', percentOfMaterial: 10 },
                        { name: 'Flooring & Finishes', percentOfMaterial: 10 },
                        { name: 'Windows & Doors', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Permit costs typically $5,000-$20,000 in LA/OC',
                        'Solar panels required for new CA construction',
                        'Plan check takes 2-3 months average',
                        'ADUs under 750 sq ft may qualify for fee waivers'
                    ]
                },
                {
                    id: 'adu-attached',
                    name: 'Attached ADU',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 250, max: 400 }, oc: { min: 275, max: 425 } },
                    description: 'ADU attached to existing structure, shares some infrastructure',
                    laborPercent: 45,
                    materialPercent: 38,
                    permitPercent: 5,
                    overheadPercent: 12,
                    hoursPerUnit: 0.45,
                    materials: [
                        { name: 'Foundation Extension', percentOfMaterial: 12 },
                        { name: 'Framing & Lumber', percentOfMaterial: 18 },
                        { name: 'Roofing Materials', percentOfMaterial: 10 },
                        { name: 'Electrical & Plumbing', percentOfMaterial: 22 },
                        { name: 'HVAC Extension', percentOfMaterial: 10 },
                        { name: 'Insulation & Drywall', percentOfMaterial: 12 },
                        { name: 'Flooring & Finishes', percentOfMaterial: 11 },
                        { name: 'Windows & Doors', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Lower cost due to shared infrastructure with main house',
                        'Requires structural assessment of existing building',
                        'May need firewall separation depending on code'
                    ]
                },
                {
                    id: 'garage-conversion',
                    name: 'Garage to ADU Conversion',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 200, max: 350 }, oc: { min: 220, max: 375 } },
                    description: 'Convert existing garage into living space ADU',
                    laborPercent: 50,
                    materialPercent: 35,
                    permitPercent: 5,
                    overheadPercent: 10,
                    hoursPerUnit: 0.4,
                    materials: [
                        { name: 'Flooring (over slab)', percentOfMaterial: 15 },
                        { name: 'Insulation & Drywall', percentOfMaterial: 20 },
                        { name: 'Electrical Upgrades', percentOfMaterial: 15 },
                        { name: 'Plumbing (new bath/kitchen)', percentOfMaterial: 20 },
                        { name: 'HVAC Installation', percentOfMaterial: 12 },
                        { name: 'Windows & Doors', percentOfMaterial: 10 },
                        { name: 'Kitchen/Bath Fixtures', percentOfMaterial: 8 }
                    ],
                    notes: [
                        'Most cost-effective ADU option',
                        'Permit cost ~$1,500 for conversion',
                        'May require raising floor for proper drainage',
                        'Parking replacement may be required'
                    ]
                },
                {
                    id: 'jadu',
                    name: 'Junior ADU (JADU)',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 150, max: 275 }, oc: { min: 165, max: 295 } },
                    description: 'Small ADU within existing home (max 500 sq ft)',
                    laborPercent: 50,
                    materialPercent: 32,
                    permitPercent: 5,
                    overheadPercent: 13,
                    hoursPerUnit: 0.35,
                    materials: [
                        { name: 'Interior Walls', percentOfMaterial: 20 },
                        { name: 'Electrical Work', percentOfMaterial: 18 },
                        { name: 'Plumbing (efficiency kitchen)', percentOfMaterial: 22 },
                        { name: 'Flooring', percentOfMaterial: 15 },
                        { name: 'Doors & Hardware', percentOfMaterial: 10 },
                        { name: 'Finishes', percentOfMaterial: 15 }
                    ],
                    notes: [
                        'Max 500 sq ft per CA law',
                        'Must be within existing home footprint',
                        'Often lowest permit fees',
                        'Can share bathroom with main home'
                    ]
                }
            ]
        },
        {
            id: 'remodel',
            name: 'Remodeling',
            icon: 'layout',
            colorClass: 'cat-remodel',
            jobs: [
                {
                    id: 'kitchen-full',
                    name: 'Full Kitchen Remodel',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 250, max: 500 }, oc: { min: 275, max: 550 } },
                    description: 'Complete kitchen renovation including cabinets, counters, appliances',
                    laborPercent: 40,
                    materialPercent: 45,
                    permitPercent: 3,
                    overheadPercent: 12,
                    hoursPerUnit: 0.6,
                    materials: [
                        { name: 'Cabinets', percentOfMaterial: 35 },
                        { name: 'Countertops', percentOfMaterial: 20 },
                        { name: 'Appliances', percentOfMaterial: 20 },
                        { name: 'Flooring', percentOfMaterial: 8 },
                        { name: 'Plumbing Fixtures', percentOfMaterial: 7 },
                        { name: 'Electrical/Lighting', percentOfMaterial: 5 },
                        { name: 'Backsplash & Finishes', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Average LA kitchen remodel: $76,000-$160,000',
                        'Cabinet quality greatly affects total cost',
                        'Custom cabinets vs stock can double material costs',
                        'Permit required for electrical/plumbing changes'
                    ]
                },
                {
                    id: 'kitchen-minor',
                    name: 'Minor Kitchen Remodel',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 100, max: 200 }, oc: { min: 110, max: 220 } },
                    description: 'Cosmetic updates: cabinet refacing, new counters, backsplash',
                    laborPercent: 45,
                    materialPercent: 40,
                    permitPercent: 2,
                    overheadPercent: 13,
                    hoursPerUnit: 0.3,
                    materials: [
                        { name: 'Cabinet Refacing/Doors', percentOfMaterial: 30 },
                        { name: 'Countertops', percentOfMaterial: 30 },
                        { name: 'Backsplash', percentOfMaterial: 15 },
                        { name: 'Hardware & Fixtures', percentOfMaterial: 10 },
                        { name: 'Paint & Finishes', percentOfMaterial: 10 },
                        { name: 'Lighting Updates', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Typically under $25,000',
                        'No permit usually needed for cosmetic work',
                        'Good ROI for resale value'
                    ]
                },
                {
                    id: 'bathroom-full',
                    name: 'Full Bathroom Remodel',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 400, max: 850 }, oc: { min: 450, max: 950 } },
                    description: 'Complete bathroom renovation with new fixtures, tile, vanity',
                    laborPercent: 45,
                    materialPercent: 40,
                    permitPercent: 3,
                    overheadPercent: 12,
                    hoursPerUnit: 0.75,
                    materials: [
                        { name: 'Tile (floor & walls)', percentOfMaterial: 30 },
                        { name: 'Vanity & Countertop', percentOfMaterial: 20 },
                        { name: 'Shower/Tub', percentOfMaterial: 20 },
                        { name: 'Plumbing Fixtures', percentOfMaterial: 15 },
                        { name: 'Toilet', percentOfMaterial: 5 },
                        { name: 'Lighting & Exhaust', percentOfMaterial: 5 },
                        { name: 'Mirror & Accessories', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'LA average: $18,000-$40,000',
                        'OC luxury bathrooms can exceed $80,000',
                        'Permit required for plumbing/electrical changes',
                        'Old homes may need plumbing upgrades'
                    ]
                },
                {
                    id: 'bathroom-budget',
                    name: 'Budget Bathroom Remodel',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 250, max: 450 }, oc: { min: 275, max: 500 } },
                    description: 'Basic bathroom refresh with stock materials',
                    laborPercent: 50,
                    materialPercent: 35,
                    permitPercent: 3,
                    overheadPercent: 12,
                    hoursPerUnit: 0.5,
                    materials: [
                        { name: 'Basic Tile', percentOfMaterial: 30 },
                        { name: 'Stock Vanity', percentOfMaterial: 25 },
                        { name: 'Standard Fixtures', percentOfMaterial: 20 },
                        { name: 'Toilet', percentOfMaterial: 10 },
                        { name: 'Lighting', percentOfMaterial: 10 },
                        { name: 'Accessories', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Typically $12,000-$25,000',
                        'Uses big-box store materials',
                        'Good for rental properties'
                    ]
                },
                {
                    id: 'whole-house',
                    name: 'Whole House Remodel',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 150, max: 700 }, oc: { min: 175, max: 750 } },
                    description: 'Complete home renovation including multiple rooms',
                    laborPercent: 42,
                    materialPercent: 40,
                    permitPercent: 5,
                    overheadPercent: 13,
                    hoursPerUnit: 0.4,
                    materials: [
                        { name: 'Kitchen Materials', percentOfMaterial: 25 },
                        { name: 'Bathroom Materials', percentOfMaterial: 20 },
                        { name: 'Flooring', percentOfMaterial: 15 },
                        { name: 'Electrical Upgrades', percentOfMaterial: 12 },
                        { name: 'Plumbing Upgrades', percentOfMaterial: 10 },
                        { name: 'HVAC', percentOfMaterial: 8 },
                        { name: 'Windows & Doors', percentOfMaterial: 5 },
                        { name: 'Paint & Finishes', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'LA average: $250,000-$1M+ for luxury',
                        'Typically 3-12 months timeline',
                        'Multiple permits required',
                        '15-20% contingency recommended'
                    ]
                },
                {
                    id: 'room-addition',
                    name: 'Room Addition',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 250, max: 450 }, oc: { min: 275, max: 500 } },
                    description: 'Add new room to existing structure',
                    laborPercent: 45,
                    materialPercent: 38,
                    permitPercent: 5,
                    overheadPercent: 12,
                    hoursPerUnit: 0.5,
                    materials: [
                        { name: 'Foundation', percentOfMaterial: 15 },
                        { name: 'Framing', percentOfMaterial: 20 },
                        { name: 'Roofing', percentOfMaterial: 12 },
                        { name: 'Electrical', percentOfMaterial: 12 },
                        { name: 'HVAC Extension', percentOfMaterial: 10 },
                        { name: 'Insulation & Drywall', percentOfMaterial: 15 },
                        { name: 'Flooring', percentOfMaterial: 8 },
                        { name: 'Windows', percentOfMaterial: 8 }
                    ],
                    notes: [
                        'Requires architectural plans',
                        'Structural engineering may be needed',
                        'Permit timeline: 4-8 weeks'
                    ]
                }
            ]
        },
        {
            id: 'roofing',
            name: 'Roofing',
            icon: 'home',
            colorClass: 'cat-roofing',
            jobs: [
                {
                    id: 'roof-asphalt',
                    name: 'Asphalt Shingle Roof',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 5, max: 10 }, oc: { min: 5.5, max: 11 } },
                    description: 'Standard asphalt shingle roof replacement',
                    laborPercent: 50,
                    materialPercent: 35,
                    permitPercent: 3,
                    overheadPercent: 12,
                    hoursPerUnit: 0.02,
                    materials: [
                        { name: 'Asphalt Shingles', percentOfMaterial: 45 },
                        { name: 'Underlayment', percentOfMaterial: 15 },
                        { name: 'Flashing', percentOfMaterial: 10 },
                        { name: 'Ridge Vents', percentOfMaterial: 10 },
                        { name: 'Nails & Fasteners', percentOfMaterial: 5 },
                        { name: 'Drip Edge', percentOfMaterial: 5 },
                        { name: 'Ice & Water Shield', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Most affordable roofing option',
                        'Lifespan: 20-30 years',
                        'Permit typically $200-$500',
                        'Fire rating important for CA'
                    ]
                },
                {
                    id: 'roof-tile',
                    name: 'Tile Roof (Clay/Concrete)',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 12, max: 25 }, oc: { min: 13, max: 28 } },
                    description: 'Spanish/Mediterranean clay or concrete tile roofing',
                    laborPercent: 50,
                    materialPercent: 38,
                    permitPercent: 2,
                    overheadPercent: 10,
                    hoursPerUnit: 0.04,
                    materials: [
                        { name: 'Roof Tiles', percentOfMaterial: 55 },
                        { name: 'Underlayment', percentOfMaterial: 12 },
                        { name: 'Battens', percentOfMaterial: 10 },
                        { name: 'Flashing', percentOfMaterial: 8 },
                        { name: 'Ridge Tiles', percentOfMaterial: 8 },
                        { name: 'Mortar & Adhesive', percentOfMaterial: 7 }
                    ],
                    notes: [
                        'Popular in SoCal architecture',
                        'Lifespan: 50+ years',
                        'Requires structural support check',
                        'Excellent fire resistance'
                    ]
                },
                {
                    id: 'roof-metal',
                    name: 'Metal Roof',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 10, max: 24 }, oc: { min: 11, max: 26 } },
                    description: 'Standing seam or corrugated metal roofing',
                    laborPercent: 45,
                    materialPercent: 42,
                    permitPercent: 3,
                    overheadPercent: 10,
                    hoursPerUnit: 0.03,
                    materials: [
                        { name: 'Metal Panels', percentOfMaterial: 60 },
                        { name: 'Underlayment', percentOfMaterial: 12 },
                        { name: 'Fasteners & Clips', percentOfMaterial: 8 },
                        { name: 'Flashing', percentOfMaterial: 10 },
                        { name: 'Ridge Cap', percentOfMaterial: 5 },
                        { name: 'Sealant', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Energy efficient - reflects heat',
                        'Lifespan: 40-70 years',
                        'Standing seam: $10-$16/sq ft',
                        'Corrugated: $7-$12/sq ft'
                    ]
                },
                {
                    id: 'roof-flat',
                    name: 'Flat Roof (TPO/EPDM)',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 8, max: 15 }, oc: { min: 9, max: 16 } },
                    description: 'Flat roof membrane installation or replacement',
                    laborPercent: 50,
                    materialPercent: 35,
                    permitPercent: 3,
                    overheadPercent: 12,
                    hoursPerUnit: 0.025,
                    materials: [
                        { name: 'Membrane (TPO/EPDM)', percentOfMaterial: 50 },
                        { name: 'Insulation Board', percentOfMaterial: 20 },
                        { name: 'Adhesive/Fasteners', percentOfMaterial: 10 },
                        { name: 'Flashing', percentOfMaterial: 10 },
                        { name: 'Drain Hardware', percentOfMaterial: 5 },
                        { name: 'Sealant', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Common on commercial and modern homes',
                        'Lifespan: 20-30 years',
                        'Requires proper drainage slope'
                    ]
                },
                {
                    id: 'roof-repair',
                    name: 'Roof Repair/Patch',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 15, max: 35 }, oc: { min: 17, max: 38 } },
                    description: 'Localized roof repair and patching',
                    laborPercent: 60,
                    materialPercent: 25,
                    permitPercent: 2,
                    overheadPercent: 13,
                    hoursPerUnit: 0.1,
                    materials: [
                        { name: 'Matching Shingles/Material', percentOfMaterial: 40 },
                        { name: 'Underlayment', percentOfMaterial: 20 },
                        { name: 'Flashing', percentOfMaterial: 15 },
                        { name: 'Sealant', percentOfMaterial: 15 },
                        { name: 'Fasteners', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Minimum job fee often $300-$500',
                        'May not need permit for small repairs',
                        'Consider full replacement if roof is old'
                    ]
                }
            ]
        },
        {
            id: 'concrete',
            name: 'Concrete Work',
            icon: 'square',
            colorClass: 'cat-concrete',
            jobs: [
                {
                    id: 'concrete-driveway',
                    name: 'Concrete Driveway',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 8, max: 15 }, oc: { min: 9, max: 16 } },
                    description: 'New concrete driveway with reinforcement',
                    laborPercent: 45,
                    materialPercent: 40,
                    permitPercent: 3,
                    overheadPercent: 12,
                    hoursPerUnit: 0.03,
                    materials: [
                        { name: 'Concrete (per yard)', percentOfMaterial: 50 },
                        { name: 'Rebar/Wire Mesh', percentOfMaterial: 15 },
                        { name: 'Gravel Base', percentOfMaterial: 15 },
                        { name: 'Forms', percentOfMaterial: 10 },
                        { name: 'Expansion Joints', percentOfMaterial: 5 },
                        { name: 'Sealant', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Standard 4" thickness residential',
                        'Decorative stamped: add $4-8/sq ft',
                        'Colored concrete: add $2-4/sq ft',
                        'Cure time: 28 days full strength'
                    ]
                },
                {
                    id: 'concrete-patio',
                    name: 'Concrete Patio',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 6, max: 16 }, oc: { min: 7, max: 17 } },
                    description: 'Poured concrete patio with basic finish',
                    laborPercent: 45,
                    materialPercent: 40,
                    permitPercent: 3,
                    overheadPercent: 12,
                    hoursPerUnit: 0.025,
                    materials: [
                        { name: 'Concrete', percentOfMaterial: 50 },
                        { name: 'Rebar/Mesh', percentOfMaterial: 12 },
                        { name: 'Gravel Base', percentOfMaterial: 15 },
                        { name: 'Forms', percentOfMaterial: 12 },
                        { name: 'Finish/Sealant', percentOfMaterial: 11 }
                    ],
                    notes: [
                        'Broom finish standard',
                        'Stamped patterns add $6-10/sq ft',
                        'Exposed aggregate add $3-5/sq ft'
                    ]
                },
                {
                    id: 'concrete-slab',
                    name: 'Concrete Slab/Foundation',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 8, max: 14 }, oc: { min: 9, max: 15 } },
                    description: 'Concrete slab for ADU, garage, or structure',
                    laborPercent: 42,
                    materialPercent: 43,
                    permitPercent: 5,
                    overheadPercent: 10,
                    hoursPerUnit: 0.035,
                    materials: [
                        { name: 'Concrete (6" thick)', percentOfMaterial: 45 },
                        { name: 'Rebar Grid', percentOfMaterial: 18 },
                        { name: 'Gravel/Sand Base', percentOfMaterial: 12 },
                        { name: 'Vapor Barrier', percentOfMaterial: 8 },
                        { name: 'Forms', percentOfMaterial: 10 },
                        { name: 'Anchor Bolts', percentOfMaterial: 7 }
                    ],
                    notes: [
                        '6" thick for structures',
                        'Requires engineering for load-bearing',
                        'Permit required for foundation work'
                    ]
                },
                {
                    id: 'concrete-sidewalk',
                    name: 'Sidewalk/Walkway',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 6, max: 12 }, oc: { min: 7, max: 13 } },
                    description: 'Concrete walkway or sidewalk installation',
                    laborPercent: 48,
                    materialPercent: 37,
                    permitPercent: 3,
                    overheadPercent: 12,
                    hoursPerUnit: 0.025,
                    materials: [
                        { name: 'Concrete', percentOfMaterial: 50 },
                        { name: 'Wire Mesh', percentOfMaterial: 12 },
                        { name: 'Gravel Base', percentOfMaterial: 15 },
                        { name: 'Forms', percentOfMaterial: 15 },
                        { name: 'Joints/Sealant', percentOfMaterial: 8 }
                    ],
                    notes: [
                        '4" thick standard',
                        'City sidewalk repairs may need permit',
                        'ADA compliance if commercial'
                    ]
                },
                {
                    id: 'concrete-steps',
                    name: 'Concrete Steps/Stairs',
                    unit: 'linear ft',
                    pricePerUnit: { la: { min: 150, max: 300 }, oc: { min: 165, max: 325 } },
                    description: 'Poured concrete stairs with railings',
                    laborPercent: 55,
                    materialPercent: 30,
                    permitPercent: 5,
                    overheadPercent: 10,
                    hoursPerUnit: 1.5,
                    materials: [
                        { name: 'Concrete', percentOfMaterial: 40 },
                        { name: 'Rebar', percentOfMaterial: 20 },
                        { name: 'Forms', percentOfMaterial: 20 },
                        { name: 'Railing', percentOfMaterial: 15 },
                        { name: 'Finish', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Complex forming increases cost',
                        'Railing required if 4+ risers',
                        'Must meet rise/run code requirements'
                    ]
                },
                {
                    id: 'concrete-demo',
                    name: 'Concrete Removal',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 3, max: 8 }, oc: { min: 3.5, max: 9 } },
                    description: 'Demolition and removal of existing concrete',
                    laborPercent: 60,
                    materialPercent: 10,
                    permitPercent: 5,
                    overheadPercent: 25,
                    hoursPerUnit: 0.04,
                    materials: [
                        { name: 'Equipment Rental', percentOfMaterial: 50 },
                        { name: 'Disposal/Hauling', percentOfMaterial: 50 }
                    ],
                    notes: [
                        'Thickness affects difficulty',
                        'Rebar removal adds cost',
                        'Disposal fees $50-100/ton'
                    ]
                }
            ]
        },
        {
            id: 'flooring',
            name: 'Flooring',
            icon: 'grid',
            colorClass: 'cat-flooring',
            jobs: [
                {
                    id: 'floor-hardwood',
                    name: 'Hardwood Flooring',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 12, max: 22 }, oc: { min: 13, max: 24 } },
                    description: 'Solid hardwood floor installation',
                    laborPercent: 40,
                    materialPercent: 48,
                    permitPercent: 0,
                    overheadPercent: 12,
                    hoursPerUnit: 0.08,
                    materials: [
                        { name: 'Hardwood Planks', percentOfMaterial: 70 },
                        { name: 'Underlayment', percentOfMaterial: 10 },
                        { name: 'Nails/Staples', percentOfMaterial: 5 },
                        { name: 'Transitions/Trim', percentOfMaterial: 10 },
                        { name: 'Finish/Stain', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Oak, maple, walnut common choices',
                        'Engineered hardwood: $8-15/sq ft',
                        'Refinishing existing: $3-8/sq ft'
                    ]
                },
                {
                    id: 'floor-tile',
                    name: 'Tile Flooring',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 10, max: 20 }, oc: { min: 11, max: 22 } },
                    description: 'Ceramic or porcelain tile installation',
                    laborPercent: 50,
                    materialPercent: 38,
                    permitPercent: 0,
                    overheadPercent: 12,
                    hoursPerUnit: 0.1,
                    materials: [
                        { name: 'Tile', percentOfMaterial: 55 },
                        { name: 'Thinset/Mortar', percentOfMaterial: 15 },
                        { name: 'Grout', percentOfMaterial: 10 },
                        { name: 'Backer Board', percentOfMaterial: 10 },
                        { name: 'Transitions', percentOfMaterial: 5 },
                        { name: 'Sealer', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Large format tile requires flat subfloor',
                        'Natural stone: $15-30/sq ft',
                        'Pattern work adds to labor'
                    ]
                },
                {
                    id: 'floor-lvp',
                    name: 'Luxury Vinyl Plank (LVP)',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 6, max: 10 }, oc: { min: 7, max: 11 } },
                    description: 'Waterproof luxury vinyl plank flooring',
                    laborPercent: 40,
                    materialPercent: 48,
                    permitPercent: 0,
                    overheadPercent: 12,
                    hoursPerUnit: 0.05,
                    materials: [
                        { name: 'LVP Planks', percentOfMaterial: 75 },
                        { name: 'Underlayment', percentOfMaterial: 12 },
                        { name: 'Transitions/Trim', percentOfMaterial: 10 },
                        { name: 'Adhesive (if needed)', percentOfMaterial: 3 }
                    ],
                    notes: [
                        'Great for rentals and bathrooms',
                        'Click-lock is fastest install',
                        'Waterproof - good for kitchens'
                    ]
                },
                {
                    id: 'floor-laminate',
                    name: 'Laminate Flooring',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 5, max: 8 }, oc: { min: 5.5, max: 9 } },
                    description: 'Laminate plank flooring installation',
                    laborPercent: 45,
                    materialPercent: 42,
                    permitPercent: 0,
                    overheadPercent: 13,
                    hoursPerUnit: 0.04,
                    materials: [
                        { name: 'Laminate Planks', percentOfMaterial: 70 },
                        { name: 'Underlayment', percentOfMaterial: 15 },
                        { name: 'Transitions', percentOfMaterial: 10 },
                        { name: 'Vapor Barrier', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Most budget-friendly option',
                        'Not recommended for wet areas',
                        'Lifespan: 15-25 years'
                    ]
                },
                {
                    id: 'floor-carpet',
                    name: 'Carpet Installation',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 4, max: 12 }, oc: { min: 4.5, max: 13 } },
                    description: 'Carpet and pad installation',
                    laborPercent: 35,
                    materialPercent: 55,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 0.03,
                    materials: [
                        { name: 'Carpet', percentOfMaterial: 65 },
                        { name: 'Padding', percentOfMaterial: 20 },
                        { name: 'Tack Strips', percentOfMaterial: 5 },
                        { name: 'Seaming Tape', percentOfMaterial: 5 },
                        { name: 'Transitions', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Price varies greatly by carpet quality',
                        'Old carpet removal: $1-2/sq ft',
                        'Stairs add complexity/cost'
                    ]
                },
                {
                    id: 'floor-epoxy',
                    name: 'Epoxy Floor Coating',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 6, max: 15 }, oc: { min: 7, max: 16 } },
                    description: 'Epoxy coating for garage or commercial floors',
                    laborPercent: 55,
                    materialPercent: 32,
                    permitPercent: 0,
                    overheadPercent: 13,
                    hoursPerUnit: 0.05,
                    materials: [
                        { name: 'Epoxy Resin', percentOfMaterial: 50 },
                        { name: 'Primer', percentOfMaterial: 15 },
                        { name: 'Color Flakes', percentOfMaterial: 15 },
                        { name: 'Top Coat', percentOfMaterial: 15 },
                        { name: 'Prep Materials', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Surface prep is critical',
                        'Garage floors most common',
                        'Cure time: 24-72 hours'
                    ]
                }
            ]
        },
        {
            id: 'electrical',
            name: 'Electrical',
            icon: 'zap',
            colorClass: 'cat-electrical',
            jobs: [
                {
                    id: 'electrical-rewire',
                    name: 'Whole House Rewire',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 8, max: 17 }, oc: { min: 9, max: 19 } },
                    description: 'Complete electrical rewiring of home',
                    laborPercent: 55,
                    materialPercent: 30,
                    permitPercent: 5,
                    overheadPercent: 10,
                    hoursPerUnit: 0.08,
                    materials: [
                        { name: 'Romex Wire', percentOfMaterial: 40 },
                        { name: 'Outlets/Switches', percentOfMaterial: 20 },
                        { name: 'Junction Boxes', percentOfMaterial: 15 },
                        { name: 'Circuit Breakers', percentOfMaterial: 15 },
                        { name: 'Misc Hardware', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Required for homes with knob & tube',
                        'Permit required - $200-$900',
                        'Wall repair may be needed',
                        'Inspection required'
                    ]
                },
                {
                    id: 'electrical-panel',
                    name: 'Panel Upgrade (200A)',
                    unit: 'each',
                    pricePerUnit: { la: { min: 2500, max: 6000 }, oc: { min: 2800, max: 6500 } },
                    description: 'Upgrade to 200-amp electrical panel',
                    laborPercent: 50,
                    materialPercent: 35,
                    permitPercent: 5,
                    overheadPercent: 10,
                    hoursPerUnit: 10,
                    materials: [
                        { name: '200A Panel', percentOfMaterial: 50 },
                        { name: 'Main Breaker', percentOfMaterial: 15 },
                        { name: 'Wire', percentOfMaterial: 15 },
                        { name: 'Conduit', percentOfMaterial: 10 },
                        { name: 'Grounding', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Required for ADUs and EV charging',
                        'Utility coordination needed',
                        'Permit: $100-$300'
                    ]
                },
                {
                    id: 'electrical-outlet',
                    name: 'New Outlet Installation',
                    unit: 'each',
                    pricePerUnit: { la: { min: 150, max: 350 }, oc: { min: 165, max: 385 } },
                    description: 'Install new electrical outlet',
                    laborPercent: 60,
                    materialPercent: 25,
                    permitPercent: 5,
                    overheadPercent: 10,
                    hoursPerUnit: 1.5,
                    materials: [
                        { name: 'Outlet/Receptacle', percentOfMaterial: 25 },
                        { name: 'Box', percentOfMaterial: 20 },
                        { name: 'Wire', percentOfMaterial: 35 },
                        { name: 'Cover Plate', percentOfMaterial: 10 },
                        { name: 'Connectors', percentOfMaterial: 10 }
                    ],
                    notes: [
                        '220V outlets cost more',
                        'GFCI required in wet areas',
                        'Multiple outlets reduce per-unit cost'
                    ]
                },
                {
                    id: 'electrical-220',
                    name: '220V Circuit/Outlet',
                    unit: 'each',
                    pricePerUnit: { la: { min: 300, max: 700 }, oc: { min: 330, max: 770 } },
                    description: 'Install 220V circuit for appliances or EV',
                    laborPercent: 55,
                    materialPercent: 30,
                    permitPercent: 5,
                    overheadPercent: 10,
                    hoursPerUnit: 3,
                    materials: [
                        { name: '220V Outlet', percentOfMaterial: 20 },
                        { name: 'Heavy Gauge Wire', percentOfMaterial: 40 },
                        { name: 'Double-Pole Breaker', percentOfMaterial: 20 },
                        { name: 'Box & Hardware', percentOfMaterial: 20 }
                    ],
                    notes: [
                        'For dryers, ranges, EV chargers',
                        'Distance from panel affects cost',
                        'May need panel upgrade'
                    ]
                },
                {
                    id: 'electrical-lighting',
                    name: 'Recessed Lighting Install',
                    unit: 'each',
                    pricePerUnit: { la: { min: 150, max: 350 }, oc: { min: 165, max: 385 } },
                    description: 'Install recessed can lights',
                    laborPercent: 55,
                    materialPercent: 32,
                    permitPercent: 3,
                    overheadPercent: 10,
                    hoursPerUnit: 1,
                    materials: [
                        { name: 'LED Can Light', percentOfMaterial: 50 },
                        { name: 'Wire', percentOfMaterial: 25 },
                        { name: 'Junction Box', percentOfMaterial: 15 },
                        { name: 'Trim Ring', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'IC-rated for insulation contact',
                        'LED preferred for efficiency',
                        'Bulk pricing for multiple lights'
                    ]
                },
                {
                    id: 'electrical-ev-charger',
                    name: 'EV Charger Installation',
                    unit: 'each',
                    pricePerUnit: { la: { min: 1200, max: 3000 }, oc: { min: 1320, max: 3300 } },
                    description: 'Level 2 EV charger installation',
                    laborPercent: 45,
                    materialPercent: 40,
                    permitPercent: 5,
                    overheadPercent: 10,
                    hoursPerUnit: 6,
                    materials: [
                        { name: 'EV Charger Unit', percentOfMaterial: 50 },
                        { name: 'Wire (6 gauge)', percentOfMaterial: 25 },
                        { name: '50A Breaker', percentOfMaterial: 10 },
                        { name: 'Conduit', percentOfMaterial: 10 },
                        { name: 'Hardware', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Charger cost not included (varies)',
                        'May need panel upgrade',
                        'Rebates available in CA'
                    ]
                }
            ]
        },
        {
            id: 'plumbing',
            name: 'Plumbing',
            icon: 'droplet',
            colorClass: 'cat-plumbing',
            jobs: [
                {
                    id: 'plumbing-repipe',
                    name: 'Whole House Repipe',
                    unit: 'fixture',
                    pricePerUnit: { la: { min: 800, max: 1500 }, oc: { min: 880, max: 1650 } },
                    description: 'Replace all water supply pipes (PEX or copper)',
                    laborPercent: 55,
                    materialPercent: 30,
                    permitPercent: 5,
                    overheadPercent: 10,
                    hoursPerUnit: 2,
                    materials: [
                        { name: 'PEX/Copper Pipe', percentOfMaterial: 50 },
                        { name: 'Fittings', percentOfMaterial: 25 },
                        { name: 'Valves', percentOfMaterial: 15 },
                        { name: 'Support Hardware', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'PEX cheaper than copper',
                        'Typical home: 8-12 fixtures',
                        'Total: $5,000-$20,000',
                        'Wall repair may be needed'
                    ]
                },
                {
                    id: 'plumbing-rough-in',
                    name: 'Rough-In Plumbing (New)',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 4.50, max: 6 }, oc: { min: 5, max: 6.5 } },
                    description: 'New construction rough-in plumbing',
                    laborPercent: 55,
                    materialPercent: 32,
                    permitPercent: 5,
                    overheadPercent: 8,
                    hoursPerUnit: 0.02,
                    materials: [
                        { name: 'Supply Pipe', percentOfMaterial: 30 },
                        { name: 'Drain/Waste Pipe', percentOfMaterial: 35 },
                        { name: 'Fittings', percentOfMaterial: 20 },
                        { name: 'Valves & Vents', percentOfMaterial: 15 }
                    ],
                    notes: [
                        'For ADU/new construction',
                        '2,000 sq ft = $8,000-$12,000',
                        'Does not include fixtures'
                    ]
                },
                {
                    id: 'plumbing-water-heater',
                    name: 'Water Heater Replacement',
                    unit: 'each',
                    pricePerUnit: { la: { min: 1200, max: 2500 }, oc: { min: 1320, max: 2750 } },
                    description: 'Standard tank water heater replacement',
                    laborPercent: 40,
                    materialPercent: 50,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 4,
                    materials: [
                        { name: 'Water Heater (40-50 gal)', percentOfMaterial: 70 },
                        { name: 'Fittings & Valves', percentOfMaterial: 15 },
                        { name: 'Expansion Tank', percentOfMaterial: 10 },
                        { name: 'Venting (if gas)', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Tankless: $3,000-$6,000',
                        'Permit often required',
                        'Gas vs electric pricing similar'
                    ]
                },
                {
                    id: 'plumbing-bathroom',
                    name: 'Bathroom Rough-In',
                    unit: 'each',
                    pricePerUnit: { la: { min: 2500, max: 5000 }, oc: { min: 2750, max: 5500 } },
                    description: 'New bathroom plumbing rough-in',
                    laborPercent: 60,
                    materialPercent: 28,
                    permitPercent: 5,
                    overheadPercent: 7,
                    hoursPerUnit: 12,
                    materials: [
                        { name: 'Drain Lines', percentOfMaterial: 35 },
                        { name: 'Supply Lines', percentOfMaterial: 30 },
                        { name: 'Vent Stack', percentOfMaterial: 20 },
                        { name: 'Fittings', percentOfMaterial: 15 }
                    ],
                    notes: [
                        'Slab work adds significant cost',
                        'Second floor easier than slab',
                        'Fixtures not included'
                    ]
                },
                {
                    id: 'plumbing-sewer',
                    name: 'Sewer Line Replacement',
                    unit: 'linear ft',
                    pricePerUnit: { la: { min: 100, max: 250 }, oc: { min: 110, max: 275 } },
                    description: 'Replace main sewer line to street',
                    laborPercent: 55,
                    materialPercent: 25,
                    permitPercent: 8,
                    overheadPercent: 12,
                    hoursPerUnit: 0.5,
                    materials: [
                        { name: 'ABS/PVC Pipe', percentOfMaterial: 40 },
                        { name: 'Fittings', percentOfMaterial: 25 },
                        { name: 'Clean-Out', percentOfMaterial: 15 },
                        { name: 'Backfill Material', percentOfMaterial: 20 }
                    ],
                    notes: [
                        'Trenchless: $150-$300/ft',
                        'City permit required',
                        'Typical run: 50-100 ft'
                    ]
                },
                {
                    id: 'plumbing-fixture',
                    name: 'Fixture Installation',
                    unit: 'each',
                    pricePerUnit: { la: { min: 200, max: 500 }, oc: { min: 220, max: 550 } },
                    description: 'Install toilet, sink, or faucet',
                    laborPercent: 60,
                    materialPercent: 30,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 2,
                    materials: [
                        { name: 'Supply Lines', percentOfMaterial: 30 },
                        { name: 'Wax Ring/Gaskets', percentOfMaterial: 20 },
                        { name: 'Shut-Off Valves', percentOfMaterial: 30 },
                        { name: 'Caulk/Sealant', percentOfMaterial: 20 }
                    ],
                    notes: [
                        'Fixture cost not included',
                        'Toilet: ~2 hours',
                        'Sink: ~1.5 hours'
                    ]
                }
            ]
        },
        {
            id: 'painting',
            name: 'Painting',
            icon: 'brush',
            colorClass: 'cat-painting',
            jobs: [
                {
                    id: 'paint-interior',
                    name: 'Interior Painting',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 2, max: 6 }, oc: { min: 2.25, max: 6.5 } },
                    description: 'Interior wall and ceiling painting',
                    laborPercent: 70,
                    materialPercent: 20,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 0.02,
                    materials: [
                        { name: 'Interior Paint', percentOfMaterial: 60 },
                        { name: 'Primer', percentOfMaterial: 20 },
                        { name: 'Tape & Drop Cloths', percentOfMaterial: 10 },
                        { name: 'Caulk & Patch', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Price per sq ft of wall area',
                        'Ceilings add 20-30%',
                        'Trim/doors extra: $50-100 each',
                        'Old homes need more prep'
                    ]
                },
                {
                    id: 'paint-exterior',
                    name: 'Exterior Painting',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 2, max: 5 }, oc: { min: 2.25, max: 5.5 } },
                    description: 'Exterior house painting',
                    laborPercent: 65,
                    materialPercent: 25,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 0.025,
                    materials: [
                        { name: 'Exterior Paint', percentOfMaterial: 60 },
                        { name: 'Primer', percentOfMaterial: 20 },
                        { name: 'Caulk', percentOfMaterial: 10 },
                        { name: 'Supplies', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Price per sq ft of painted surface',
                        'Multi-story adds 50% per level',
                        'Stucco repair extra',
                        'UV-resistant paint for SoCal'
                    ]
                },
                {
                    id: 'paint-cabinet',
                    name: 'Cabinet Painting',
                    unit: 'linear ft',
                    pricePerUnit: { la: { min: 75, max: 150 }, oc: { min: 85, max: 165 } },
                    description: 'Kitchen cabinet painting/refinishing',
                    laborPercent: 75,
                    materialPercent: 18,
                    permitPercent: 0,
                    overheadPercent: 7,
                    hoursPerUnit: 0.5,
                    materials: [
                        { name: 'Cabinet Paint', percentOfMaterial: 50 },
                        { name: 'Primer', percentOfMaterial: 25 },
                        { name: 'Sanding Materials', percentOfMaterial: 15 },
                        { name: 'Hardware', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Linear ft of cabinet face',
                        'Spray finish costs more but better',
                        'Typically 15-25 linear ft kitchen'
                    ]
                },
                {
                    id: 'paint-room',
                    name: 'Single Room',
                    unit: 'room',
                    pricePerUnit: { la: { min: 300, max: 800 }, oc: { min: 330, max: 880 } },
                    description: 'Paint a single room (walls only)',
                    laborPercent: 70,
                    materialPercent: 20,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 4,
                    materials: [
                        { name: 'Paint (1-2 gallons)', percentOfMaterial: 60 },
                        { name: 'Primer', percentOfMaterial: 20 },
                        { name: 'Supplies', percentOfMaterial: 20 }
                    ],
                    notes: [
                        'Average 12x12 room',
                        'Accent walls add $100-200',
                        'High ceilings add cost'
                    ]
                },
                {
                    id: 'paint-deck-fence',
                    name: 'Deck/Fence Staining',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 2, max: 5 }, oc: { min: 2.25, max: 5.5 } },
                    description: 'Stain or paint deck/fence',
                    laborPercent: 65,
                    materialPercent: 25,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 0.02,
                    materials: [
                        { name: 'Stain/Paint', percentOfMaterial: 70 },
                        { name: 'Cleaner/Prep', percentOfMaterial: 15 },
                        { name: 'Supplies', percentOfMaterial: 15 }
                    ],
                    notes: [
                        'Pressure washing recommended first',
                        'Semi-transparent vs solid stain',
                        'Both sides of fence included'
                    ]
                }
            ]
        },
        {
            id: 'fencing',
            name: 'Fencing',
            icon: 'fence',
            colorClass: 'cat-fencing',
            jobs: [
                {
                    id: 'fence-wood-privacy',
                    name: 'Wood Privacy Fence',
                    unit: 'linear ft',
                    pricePerUnit: { la: { min: 25, max: 50 }, oc: { min: 28, max: 55 } },
                    description: '6ft wood privacy fence installation',
                    laborPercent: 50,
                    materialPercent: 40,
                    permitPercent: 2,
                    overheadPercent: 8,
                    hoursPerUnit: 0.3,
                    materials: [
                        { name: 'Fence Boards', percentOfMaterial: 45 },
                        { name: 'Posts (4x4)', percentOfMaterial: 20 },
                        { name: 'Rails (2x4)', percentOfMaterial: 15 },
                        { name: 'Concrete', percentOfMaterial: 10 },
                        { name: 'Hardware', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Cedar: higher end of range',
                        'Pressure-treated: lower end',
                        'Post holes: 8ft apart',
                        'Permit may be required over 6ft'
                    ]
                },
                {
                    id: 'fence-vinyl',
                    name: 'Vinyl Privacy Fence',
                    unit: 'linear ft',
                    pricePerUnit: { la: { min: 25, max: 45 }, oc: { min: 28, max: 50 } },
                    description: 'Vinyl privacy fence installation',
                    laborPercent: 45,
                    materialPercent: 45,
                    permitPercent: 2,
                    overheadPercent: 8,
                    hoursPerUnit: 0.25,
                    materials: [
                        { name: 'Vinyl Panels', percentOfMaterial: 55 },
                        { name: 'Vinyl Posts', percentOfMaterial: 25 },
                        { name: 'Concrete', percentOfMaterial: 10 },
                        { name: 'Caps & Hardware', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Maintenance-free',
                        'Lifespan: 20-30 years',
                        'Limited color options'
                    ]
                },
                {
                    id: 'fence-chain-link',
                    name: 'Chain Link Fence',
                    unit: 'linear ft',
                    pricePerUnit: { la: { min: 12, max: 25 }, oc: { min: 13, max: 28 } },
                    description: 'Chain link fence installation',
                    laborPercent: 50,
                    materialPercent: 38,
                    permitPercent: 2,
                    overheadPercent: 10,
                    hoursPerUnit: 0.15,
                    materials: [
                        { name: 'Chain Link Mesh', percentOfMaterial: 40 },
                        { name: 'Posts', percentOfMaterial: 25 },
                        { name: 'Top Rail', percentOfMaterial: 15 },
                        { name: 'Concrete', percentOfMaterial: 10 },
                        { name: 'Hardware', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Most economical option',
                        'Vinyl-coated adds $3-5/ft',
                        'Privacy slats available'
                    ]
                },
                {
                    id: 'fence-wrought-iron',
                    name: 'Wrought Iron Fence',
                    unit: 'linear ft',
                    pricePerUnit: { la: { min: 35, max: 75 }, oc: { min: 40, max: 85 } },
                    description: 'Ornamental iron fence installation',
                    laborPercent: 45,
                    materialPercent: 45,
                    permitPercent: 2,
                    overheadPercent: 8,
                    hoursPerUnit: 0.35,
                    materials: [
                        { name: 'Iron Panels', percentOfMaterial: 60 },
                        { name: 'Posts', percentOfMaterial: 20 },
                        { name: 'Concrete', percentOfMaterial: 10 },
                        { name: 'Hardware & Caps', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Decorative only - not privacy',
                        'Requires periodic painting',
                        'Custom designs cost more'
                    ]
                },
                {
                    id: 'fence-repair',
                    name: 'Fence Repair',
                    unit: 'linear ft',
                    pricePerUnit: { la: { min: 15, max: 40 }, oc: { min: 17, max: 45 } },
                    description: 'Repair existing fence sections',
                    laborPercent: 60,
                    materialPercent: 28,
                    permitPercent: 2,
                    overheadPercent: 10,
                    hoursPerUnit: 0.25,
                    materials: [
                        { name: 'Replacement Boards/Panels', percentOfMaterial: 50 },
                        { name: 'Posts (if needed)', percentOfMaterial: 25 },
                        { name: 'Hardware', percentOfMaterial: 15 },
                        { name: 'Concrete', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Minimum job fee: $200-400',
                        'Post replacement is most expensive',
                        'May be cheaper to replace section'
                    ]
                },
                {
                    id: 'fence-gate',
                    name: 'Gate Installation',
                    unit: 'each',
                    pricePerUnit: { la: { min: 300, max: 1000 }, oc: { min: 330, max: 1100 } },
                    description: 'Install fence gate (pedestrian or drive)',
                    laborPercent: 50,
                    materialPercent: 40,
                    permitPercent: 2,
                    overheadPercent: 8,
                    hoursPerUnit: 3,
                    materials: [
                        { name: 'Gate Panel', percentOfMaterial: 50 },
                        { name: 'Posts', percentOfMaterial: 20 },
                        { name: 'Hinges & Latch', percentOfMaterial: 15 },
                        { name: 'Concrete', percentOfMaterial: 10 },
                        { name: 'Hardware', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Drive gate: $500-2000+',
                        'Automated gate: add $1500-5000',
                        'Double gates cost 1.5x'
                    ]
                }
            ]
        },
        {
            id: 'demolition',
            name: 'Demolition',
            icon: 'hammer',
            colorClass: 'cat-demolition',
            jobs: [
                {
                    id: 'demo-interior',
                    name: 'Interior Demolition',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 3, max: 8 }, oc: { min: 3.5, max: 9 } },
                    description: 'Interior gut demo (walls, flooring, fixtures)',
                    laborPercent: 65,
                    materialPercent: 5,
                    permitPercent: 5,
                    overheadPercent: 25,
                    hoursPerUnit: 0.03,
                    materials: [
                        { name: 'Dumpster Rental', percentOfMaterial: 60 },
                        { name: 'Disposal Fees', percentOfMaterial: 40 }
                    ],
                    notes: [
                        'Non-structural walls only',
                        'Hazmat testing may be needed',
                        'Permit required in most cities'
                    ]
                },
                {
                    id: 'demo-structure',
                    name: 'Full Structure Demolition',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 8, max: 17 }, oc: { min: 9, max: 19 } },
                    description: 'Complete building demolition',
                    laborPercent: 50,
                    materialPercent: 10,
                    permitPercent: 10,
                    overheadPercent: 30,
                    hoursPerUnit: 0.04,
                    materials: [
                        { name: 'Equipment Rental', percentOfMaterial: 40 },
                        { name: 'Dumpsters', percentOfMaterial: 30 },
                        { name: 'Disposal', percentOfMaterial: 30 }
                    ],
                    notes: [
                        'Asbestos adds $2-3/sq ft',
                        'Permit required',
                        'Utility disconnect required',
                        'Typical house: $10,000-$25,000'
                    ]
                },
                {
                    id: 'demo-garage',
                    name: 'Garage Demolition',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 6, max: 12 }, oc: { min: 7, max: 13 } },
                    description: 'Detached garage demolition',
                    laborPercent: 55,
                    materialPercent: 10,
                    permitPercent: 8,
                    overheadPercent: 27,
                    hoursPerUnit: 0.035,
                    materials: [
                        { name: 'Equipment', percentOfMaterial: 40 },
                        { name: 'Dumpster', percentOfMaterial: 30 },
                        { name: 'Disposal', percentOfMaterial: 30 }
                    ],
                    notes: [
                        '2-car garage: $3,000-$5,000',
                        'Slab removal extra',
                        'Permit required'
                    ]
                },
                {
                    id: 'demo-deck',
                    name: 'Deck Demolition',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 4, max: 10 }, oc: { min: 4.5, max: 11 } },
                    description: 'Remove existing deck structure',
                    laborPercent: 60,
                    materialPercent: 8,
                    permitPercent: 5,
                    overheadPercent: 27,
                    hoursPerUnit: 0.03,
                    materials: [
                        { name: 'Disposal', percentOfMaterial: 60 },
                        { name: 'Equipment', percentOfMaterial: 40 }
                    ],
                    notes: [
                        'Height affects complexity',
                        'Concrete footings extra',
                        'May need permit'
                    ]
                },
                {
                    id: 'demo-pool',
                    name: 'Pool Demolition',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 15, max: 35 }, oc: { min: 17, max: 40 } },
                    description: 'Swimming pool removal',
                    laborPercent: 50,
                    materialPercent: 10,
                    permitPercent: 10,
                    overheadPercent: 30,
                    hoursPerUnit: 0.08,
                    materials: [
                        { name: 'Heavy Equipment', percentOfMaterial: 50 },
                        { name: 'Fill Dirt', percentOfMaterial: 25 },
                        { name: 'Disposal', percentOfMaterial: 25 }
                    ],
                    notes: [
                        'Partial fill: $5,000-$10,000',
                        'Full removal: $10,000-$25,000',
                        'Permit and inspection required',
                        'Engineering may be needed'
                    ]
                },
                {
                    id: 'demo-driveway',
                    name: 'Driveway Removal',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 3, max: 7 }, oc: { min: 3.5, max: 8 } },
                    description: 'Remove concrete/asphalt driveway',
                    laborPercent: 55,
                    materialPercent: 10,
                    permitPercent: 5,
                    overheadPercent: 30,
                    hoursPerUnit: 0.02,
                    materials: [
                        { name: 'Equipment Rental', percentOfMaterial: 50 },
                        { name: 'Hauling/Disposal', percentOfMaterial: 50 }
                    ],
                    notes: [
                        'Thickness affects cost',
                        'Rebar removal adds time',
                        'Disposal: $50-100/ton'
                    ]
                }
            ]
        },
        {
            id: 'hvac',
            name: 'HVAC',
            icon: 'thermometer',
            colorClass: 'cat-hvac',
            jobs: [
                {
                    id: 'hvac-central-ac',
                    name: 'Central AC Installation',
                    unit: 'ton',
                    pricePerUnit: { la: { min: 3000, max: 5000 }, oc: { min: 3300, max: 5500 } },
                    description: 'Central air conditioning system',
                    laborPercent: 45,
                    materialPercent: 45,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 8,
                    materials: [
                        { name: 'Condenser Unit', percentOfMaterial: 50 },
                        { name: 'Air Handler/Coil', percentOfMaterial: 25 },
                        { name: 'Refrigerant Lines', percentOfMaterial: 10 },
                        { name: 'Thermostat', percentOfMaterial: 5 },
                        { name: 'Electrical', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Typical home: 2-5 tons',
                        '400 sq ft per ton rule of thumb',
                        'Ductwork extra if needed',
                        'Permit required'
                    ]
                },
                {
                    id: 'hvac-mini-split',
                    name: 'Mini Split System',
                    unit: 'zone',
                    pricePerUnit: { la: { min: 2500, max: 5000 }, oc: { min: 2750, max: 5500 } },
                    description: 'Ductless mini split heat pump',
                    laborPercent: 40,
                    materialPercent: 50,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 6,
                    materials: [
                        { name: 'Indoor Unit', percentOfMaterial: 35 },
                        { name: 'Outdoor Compressor', percentOfMaterial: 40 },
                        { name: 'Line Set', percentOfMaterial: 10 },
                        { name: 'Electrical', percentOfMaterial: 10 },
                        { name: 'Mounting Hardware', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Great for ADUs and additions',
                        'No ductwork needed',
                        'Multi-zone systems available',
                        'Heating and cooling in one'
                    ]
                },
                {
                    id: 'hvac-furnace',
                    name: 'Furnace Replacement',
                    unit: 'each',
                    pricePerUnit: { la: { min: 3500, max: 7500 }, oc: { min: 3850, max: 8250 } },
                    description: 'Gas furnace replacement',
                    laborPercent: 40,
                    materialPercent: 50,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 8,
                    materials: [
                        { name: 'Furnace Unit', percentOfMaterial: 65 },
                        { name: 'Venting', percentOfMaterial: 15 },
                        { name: 'Gas Line', percentOfMaterial: 10 },
                        { name: 'Thermostat', percentOfMaterial: 5 },
                        { name: 'Electrical', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'High-efficiency units cost more',
                        'Permit and inspection required',
                        'Consider heat pump alternative'
                    ]
                },
                {
                    id: 'hvac-ductwork',
                    name: 'Ductwork Installation',
                    unit: 'linear ft',
                    pricePerUnit: { la: { min: 35, max: 75 }, oc: { min: 40, max: 85 } },
                    description: 'New ductwork installation',
                    laborPercent: 55,
                    materialPercent: 35,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 0.3,
                    materials: [
                        { name: 'Sheet Metal Ducts', percentOfMaterial: 50 },
                        { name: 'Flex Duct', percentOfMaterial: 20 },
                        { name: 'Insulation', percentOfMaterial: 15 },
                        { name: 'Registers/Grilles', percentOfMaterial: 10 },
                        { name: 'Tape/Mastic', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Whole house: 150-300 linear ft',
                        'Attic/crawl access affects cost',
                        'Insulated ducts required in CA'
                    ]
                },
                {
                    id: 'hvac-repair',
                    name: 'HVAC Repair/Service',
                    unit: 'hour',
                    pricePerUnit: { la: { min: 100, max: 200 }, oc: { min: 110, max: 220 } },
                    description: 'HVAC repair and maintenance',
                    laborPercent: 70,
                    materialPercent: 20,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 1,
                    materials: [
                        { name: 'Refrigerant', percentOfMaterial: 40 },
                        { name: 'Parts', percentOfMaterial: 40 },
                        { name: 'Filters', percentOfMaterial: 20 }
                    ],
                    notes: [
                        'Diagnostic fee: $75-150',
                        'Parts extra',
                        'Emergency service 1.5x rate'
                    ]
                }
            ]
        },
        {
            id: 'drywall',
            name: 'Drywall',
            icon: 'layers',
            colorClass: 'cat-drywall',
            jobs: [
                {
                    id: 'drywall-install',
                    name: 'Drywall Installation',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 2, max: 4 }, oc: { min: 2.25, max: 4.5 } },
                    description: 'Hang drywall sheets',
                    laborPercent: 60,
                    materialPercent: 30,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 0.015,
                    materials: [
                        { name: 'Drywall Sheets', percentOfMaterial: 60 },
                        { name: 'Screws', percentOfMaterial: 15 },
                        { name: 'Corner Bead', percentOfMaterial: 15 },
                        { name: 'Adhesive', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Price is hang only',
                        'High ceilings add cost',
                        'Fire-rated (Type X) costs more'
                    ]
                },
                {
                    id: 'drywall-finish',
                    name: 'Drywall Tape & Finish',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 1.5, max: 3.5 }, oc: { min: 1.75, max: 4 } },
                    description: 'Tape, mud, and finish drywall',
                    laborPercent: 75,
                    materialPercent: 15,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 0.02,
                    materials: [
                        { name: 'Joint Compound', percentOfMaterial: 50 },
                        { name: 'Tape', percentOfMaterial: 25 },
                        { name: 'Sandpaper', percentOfMaterial: 15 },
                        { name: 'Primer', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Level 4 finish standard',
                        'Level 5 (smooth) costs more',
                        'Multiple coats required'
                    ]
                },
                {
                    id: 'drywall-complete',
                    name: 'Drywall Complete (Hang & Finish)',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 3.5, max: 7 }, oc: { min: 4, max: 8 } },
                    description: 'Complete drywall installation and finishing',
                    laborPercent: 65,
                    materialPercent: 25,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 0.035,
                    materials: [
                        { name: 'Drywall Sheets', percentOfMaterial: 50 },
                        { name: 'Joint Compound', percentOfMaterial: 25 },
                        { name: 'Tape & Screws', percentOfMaterial: 15 },
                        { name: 'Corner Bead', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Most common pricing method',
                        'Includes Level 4 finish',
                        'Texture extra: $0.50-1.50/sq ft'
                    ]
                },
                {
                    id: 'drywall-repair',
                    name: 'Drywall Repair',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 8, max: 20 }, oc: { min: 9, max: 22 } },
                    description: 'Patch and repair damaged drywall',
                    laborPercent: 70,
                    materialPercent: 18,
                    permitPercent: 0,
                    overheadPercent: 12,
                    hoursPerUnit: 0.15,
                    materials: [
                        { name: 'Drywall Patch', percentOfMaterial: 40 },
                        { name: 'Joint Compound', percentOfMaterial: 35 },
                        { name: 'Tape', percentOfMaterial: 15 },
                        { name: 'Primer', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Minimum job fee: $150-300',
                        'Small holes: $75-150 each',
                        'Large repairs priced by sq ft'
                    ]
                },
                {
                    id: 'drywall-texture',
                    name: 'Texture Application',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 1, max: 2.5 }, oc: { min: 1.15, max: 2.75 } },
                    description: 'Apply texture to drywall',
                    laborPercent: 70,
                    materialPercent: 20,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 0.01,
                    materials: [
                        { name: 'Texture Material', percentOfMaterial: 70 },
                        { name: 'Equipment', percentOfMaterial: 30 }
                    ],
                    notes: [
                        'Orange peel, knockdown, popcorn',
                        'Popcorn removal: $1-2/sq ft',
                        'Spray application fastest'
                    ]
                }
            ]
        },
        {
            id: 'framing',
            name: 'Framing',
            icon: 'box',
            colorClass: 'cat-framing',
            jobs: [
                {
                    id: 'framing-wall',
                    name: 'Interior Wall Framing',
                    unit: 'linear ft',
                    pricePerUnit: { la: { min: 25, max: 50 }, oc: { min: 28, max: 55 } },
                    description: 'Frame new interior walls',
                    laborPercent: 55,
                    materialPercent: 35,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 0.35,
                    materials: [
                        { name: 'Studs (2x4)', percentOfMaterial: 50 },
                        { name: 'Plates', percentOfMaterial: 20 },
                        { name: 'Headers', percentOfMaterial: 15 },
                        { name: 'Nails/Screws', percentOfMaterial: 10 },
                        { name: 'Hardware', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Price per linear foot of wall',
                        '8ft ceiling standard',
                        'Doors/windows add cost'
                    ]
                },
                {
                    id: 'framing-exterior',
                    name: 'Exterior Wall Framing',
                    unit: 'linear ft',
                    pricePerUnit: { la: { min: 35, max: 70 }, oc: { min: 40, max: 80 } },
                    description: 'Frame exterior walls with sheathing',
                    laborPercent: 50,
                    materialPercent: 40,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 0.45,
                    materials: [
                        { name: 'Studs (2x6)', percentOfMaterial: 40 },
                        { name: 'Plates', percentOfMaterial: 15 },
                        { name: 'Sheathing', percentOfMaterial: 25 },
                        { name: 'Headers', percentOfMaterial: 10 },
                        { name: 'Hardware', percentOfMaterial: 10 }
                    ],
                    notes: [
                        '2x6 for better insulation',
                        'Sheathing included',
                        'Permit required'
                    ]
                },
                {
                    id: 'framing-roof',
                    name: 'Roof Framing',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 10, max: 20 }, oc: { min: 11, max: 22 } },
                    description: 'Frame roof with rafters or trusses',
                    laborPercent: 50,
                    materialPercent: 40,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 0.05,
                    materials: [
                        { name: 'Rafters/Trusses', percentOfMaterial: 55 },
                        { name: 'Ridge Board', percentOfMaterial: 10 },
                        { name: 'Sheathing', percentOfMaterial: 25 },
                        { name: 'Hardware', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Trusses faster than stick-built',
                        'Complex roofs cost more',
                        'Per sq ft of roof area'
                    ]
                },
                {
                    id: 'framing-floor',
                    name: 'Floor Framing',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 8, max: 16 }, oc: { min: 9, max: 18 } },
                    description: 'Frame floor joists and subfloor',
                    laborPercent: 50,
                    materialPercent: 40,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 0.04,
                    materials: [
                        { name: 'Floor Joists', percentOfMaterial: 45 },
                        { name: 'Subfloor Sheathing', percentOfMaterial: 35 },
                        { name: 'Rim Board', percentOfMaterial: 10 },
                        { name: 'Hardware', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Engineered joists available',
                        'Second floor or raised',
                        'Permit required'
                    ]
                },
                {
                    id: 'framing-deck',
                    name: 'Deck Framing',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 15, max: 30 }, oc: { min: 17, max: 33 } },
                    description: 'Frame deck structure (no decking)',
                    laborPercent: 50,
                    materialPercent: 40,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 0.06,
                    materials: [
                        { name: 'Posts', percentOfMaterial: 20 },
                        { name: 'Beams', percentOfMaterial: 25 },
                        { name: 'Joists', percentOfMaterial: 35 },
                        { name: 'Hardware/Connectors', percentOfMaterial: 15 },
                        { name: 'Concrete', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Framing only - no decking',
                        'Height affects complexity',
                        'Permit required over 30"'
                    ]
                }
            ]
        },
        {
            id: 'windows',
            name: 'Windows & Doors',
            icon: 'window',
            colorClass: 'cat-windows',
            jobs: [
                {
                    id: 'window-vinyl',
                    name: 'Vinyl Window Replacement',
                    unit: 'each',
                    pricePerUnit: { la: { min: 450, max: 900 }, oc: { min: 500, max: 1000 } },
                    description: 'Replace existing window with vinyl',
                    laborPercent: 40,
                    materialPercent: 50,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 2,
                    materials: [
                        { name: 'Vinyl Window', percentOfMaterial: 80 },
                        { name: 'Trim', percentOfMaterial: 10 },
                        { name: 'Caulk/Sealant', percentOfMaterial: 5 },
                        { name: 'Hardware', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Average size 3x4 window',
                        'Retrofit installation',
                        'Energy efficient options available'
                    ]
                },
                {
                    id: 'window-aluminum',
                    name: 'Aluminum Window',
                    unit: 'each',
                    pricePerUnit: { la: { min: 350, max: 700 }, oc: { min: 385, max: 770 } },
                    description: 'Aluminum frame window replacement',
                    laborPercent: 40,
                    materialPercent: 50,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 2,
                    materials: [
                        { name: 'Aluminum Window', percentOfMaterial: 80 },
                        { name: 'Trim', percentOfMaterial: 10 },
                        { name: 'Sealant', percentOfMaterial: 5 },
                        { name: 'Hardware', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Common in older CA homes',
                        'Less energy efficient',
                        'Thermally broken better'
                    ]
                },
                {
                    id: 'window-new-opening',
                    name: 'New Window Opening',
                    unit: 'each',
                    pricePerUnit: { la: { min: 1500, max: 4000 }, oc: { min: 1650, max: 4400 } },
                    description: 'Cut new window opening and install',
                    laborPercent: 55,
                    materialPercent: 35,
                    permitPercent: 5,
                    overheadPercent: 5,
                    hoursPerUnit: 8,
                    materials: [
                        { name: 'Window', percentOfMaterial: 50 },
                        { name: 'Header', percentOfMaterial: 15 },
                        { name: 'Framing', percentOfMaterial: 15 },
                        { name: 'Flashing/Sealant', percentOfMaterial: 10 },
                        { name: 'Drywall Repair', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Structural consideration required',
                        'Permit required',
                        'Stucco/siding repair extra'
                    ]
                },
                {
                    id: 'door-entry',
                    name: 'Entry Door Replacement',
                    unit: 'each',
                    pricePerUnit: { la: { min: 800, max: 2500 }, oc: { min: 880, max: 2750 } },
                    description: 'Replace front entry door',
                    laborPercent: 35,
                    materialPercent: 55,
                    permitPercent: 2,
                    overheadPercent: 8,
                    hoursPerUnit: 4,
                    materials: [
                        { name: 'Entry Door', percentOfMaterial: 70 },
                        { name: 'Lockset/Hardware', percentOfMaterial: 15 },
                        { name: 'Trim', percentOfMaterial: 10 },
                        { name: 'Threshold', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Fiberglass or steel common',
                        'Custom doors much more',
                        'Includes basic hardware'
                    ]
                },
                {
                    id: 'door-interior',
                    name: 'Interior Door',
                    unit: 'each',
                    pricePerUnit: { la: { min: 300, max: 700 }, oc: { min: 330, max: 770 } },
                    description: 'Replace interior door with frame',
                    laborPercent: 45,
                    materialPercent: 45,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 2,
                    materials: [
                        { name: 'Prehung Door', percentOfMaterial: 65 },
                        { name: 'Hardware', percentOfMaterial: 15 },
                        { name: 'Trim', percentOfMaterial: 15 },
                        { name: 'Shims', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Hollow core cheapest',
                        'Solid core for privacy/sound',
                        'Standard 6\'8" height'
                    ]
                },
                {
                    id: 'door-sliding',
                    name: 'Sliding Glass Door',
                    unit: 'each',
                    pricePerUnit: { la: { min: 1200, max: 3500 }, oc: { min: 1320, max: 3850 } },
                    description: 'Replace sliding patio door',
                    laborPercent: 40,
                    materialPercent: 50,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 4,
                    materials: [
                        { name: 'Sliding Door Unit', percentOfMaterial: 80 },
                        { name: 'Trim', percentOfMaterial: 10 },
                        { name: 'Sealant', percentOfMaterial: 5 },
                        { name: 'Hardware', percentOfMaterial: 5 }
                    ],
                    notes: [
                        '6ft and 8ft widths common',
                        'Vinyl or aluminum frame',
                        'Multi-slide doors much more'
                    ]
                },
                {
                    id: 'door-garage',
                    name: 'Garage Door Replacement',
                    unit: 'each',
                    pricePerUnit: { la: { min: 1500, max: 4000 }, oc: { min: 1650, max: 4400 } },
                    description: 'Replace garage door with opener',
                    laborPercent: 35,
                    materialPercent: 55,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 5,
                    materials: [
                        { name: 'Garage Door', percentOfMaterial: 60 },
                        { name: 'Opener', percentOfMaterial: 25 },
                        { name: 'Hardware/Springs', percentOfMaterial: 10 },
                        { name: 'Weatherstripping', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Single door: $1,000-$2,500',
                        'Double door: $1,500-$4,000',
                        'Insulated adds $200-500'
                    ]
                }
            ]
        },
        {
            id: 'siding',
            name: 'Siding & Stucco',
            icon: 'layers',
            colorClass: 'cat-siding',
            jobs: [
                {
                    id: 'stucco-new',
                    name: 'New Stucco Application',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 8, max: 14 }, oc: { min: 9, max: 15 } },
                    description: 'Three-coat stucco system',
                    laborPercent: 55,
                    materialPercent: 35,
                    permitPercent: 2,
                    overheadPercent: 8,
                    hoursPerUnit: 0.04,
                    materials: [
                        { name: 'Stucco Mix', percentOfMaterial: 40 },
                        { name: 'Wire Lath', percentOfMaterial: 25 },
                        { name: 'Paper/WRB', percentOfMaterial: 15 },
                        { name: 'Weep Screed', percentOfMaterial: 10 },
                        { name: 'Color Coat', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Common in SoCal',
                        'Three coat: scratch, brown, color',
                        'One coat systems available'
                    ]
                },
                {
                    id: 'stucco-repair',
                    name: 'Stucco Repair',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 10, max: 25 }, oc: { min: 11, max: 28 } },
                    description: 'Patch and repair stucco',
                    laborPercent: 65,
                    materialPercent: 25,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 0.1,
                    materials: [
                        { name: 'Stucco Patch', percentOfMaterial: 50 },
                        { name: 'Bonding Agent', percentOfMaterial: 20 },
                        { name: 'Mesh', percentOfMaterial: 15 },
                        { name: 'Color Match', percentOfMaterial: 15 }
                    ],
                    notes: [
                        'Minimum job: $300-500',
                        'Color matching can be difficult',
                        'Crack repair: $5-10/linear ft'
                    ]
                },
                {
                    id: 'siding-vinyl',
                    name: 'Vinyl Siding',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 5, max: 10 }, oc: { min: 5.5, max: 11 } },
                    description: 'Vinyl siding installation',
                    laborPercent: 45,
                    materialPercent: 45,
                    permitPercent: 2,
                    overheadPercent: 8,
                    hoursPerUnit: 0.025,
                    materials: [
                        { name: 'Vinyl Siding', percentOfMaterial: 60 },
                        { name: 'J-Channel & Trim', percentOfMaterial: 20 },
                        { name: 'Starter Strip', percentOfMaterial: 10 },
                        { name: 'Nails', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Less common in SoCal',
                        'Low maintenance',
                        'Many color options'
                    ]
                },
                {
                    id: 'siding-wood',
                    name: 'Wood Siding',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 8, max: 16 }, oc: { min: 9, max: 18 } },
                    description: 'Wood lap or shingle siding',
                    laborPercent: 50,
                    materialPercent: 40,
                    permitPercent: 2,
                    overheadPercent: 8,
                    hoursPerUnit: 0.035,
                    materials: [
                        { name: 'Wood Siding', percentOfMaterial: 65 },
                        { name: 'Trim', percentOfMaterial: 15 },
                        { name: 'Nails', percentOfMaterial: 10 },
                        { name: 'Primer/Paint', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Cedar or redwood common',
                        'Requires maintenance',
                        'Fire rating consideration'
                    ]
                },
                {
                    id: 'siding-fiber-cement',
                    name: 'Fiber Cement Siding (Hardie)',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 10, max: 18 }, oc: { min: 11, max: 20 } },
                    description: 'James Hardie or similar fiber cement',
                    laborPercent: 50,
                    materialPercent: 40,
                    permitPercent: 2,
                    overheadPercent: 8,
                    hoursPerUnit: 0.04,
                    materials: [
                        { name: 'Fiber Cement Siding', percentOfMaterial: 60 },
                        { name: 'Trim', percentOfMaterial: 20 },
                        { name: 'Nails', percentOfMaterial: 10 },
                        { name: 'Caulk/Paint', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Fire resistant',
                        'Long lasting (30+ years)',
                        'Pre-painted options available'
                    ]
                }
            ]
        },
        {
            id: 'landscaping',
            name: 'Landscaping & Hardscape',
            icon: 'tree',
            colorClass: 'cat-landscaping',
            jobs: [
                {
                    id: 'landscape-basic',
                    name: 'Basic Landscaping',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 5, max: 15 }, oc: { min: 5.5, max: 17 } },
                    description: 'Planting, mulch, basic design',
                    laborPercent: 50,
                    materialPercent: 40,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 0.03,
                    materials: [
                        { name: 'Plants', percentOfMaterial: 50 },
                        { name: 'Mulch', percentOfMaterial: 20 },
                        { name: 'Soil Amendment', percentOfMaterial: 15 },
                        { name: 'Edging', percentOfMaterial: 10 },
                        { name: 'Irrigation Parts', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Drought tolerant preferred in CA',
                        'Irrigation extra',
                        'Design services extra'
                    ]
                },
                {
                    id: 'landscape-turf',
                    name: 'Artificial Turf Installation',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 10, max: 20 }, oc: { min: 11, max: 22 } },
                    description: 'Synthetic grass installation',
                    laborPercent: 45,
                    materialPercent: 45,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 0.04,
                    materials: [
                        { name: 'Artificial Turf', percentOfMaterial: 55 },
                        { name: 'Base Material', percentOfMaterial: 20 },
                        { name: 'Infill', percentOfMaterial: 15 },
                        { name: 'Edging', percentOfMaterial: 5 },
                        { name: 'Seaming', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Popular in drought-prone areas',
                        'No watering needed',
                        'Rebates available in some areas'
                    ]
                },
                {
                    id: 'landscape-sod',
                    name: 'Sod Installation',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 2, max: 5 }, oc: { min: 2.25, max: 5.5 } },
                    description: 'Natural grass sod installation',
                    laborPercent: 50,
                    materialPercent: 40,
                    permitPercent: 0,
                    overheadPercent: 10,
                    hoursPerUnit: 0.015,
                    materials: [
                        { name: 'Sod', percentOfMaterial: 60 },
                        { name: 'Soil Prep', percentOfMaterial: 25 },
                        { name: 'Starter Fertilizer', percentOfMaterial: 10 },
                        { name: 'Edging', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Requires regular watering',
                        'Fescue or Bermuda common',
                        'Grading extra if needed'
                    ]
                },
                {
                    id: 'landscape-pavers',
                    name: 'Paver Installation',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 15, max: 30 }, oc: { min: 17, max: 33 } },
                    description: 'Interlocking paver patio/walkway',
                    laborPercent: 50,
                    materialPercent: 40,
                    permitPercent: 2,
                    overheadPercent: 8,
                    hoursPerUnit: 0.06,
                    materials: [
                        { name: 'Pavers', percentOfMaterial: 50 },
                        { name: 'Base Material', percentOfMaterial: 25 },
                        { name: 'Sand', percentOfMaterial: 10 },
                        { name: 'Edging', percentOfMaterial: 10 },
                        { name: 'Polymeric Sand', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Many patterns available',
                        'Permeable pavers option',
                        'More than concrete but easier to repair'
                    ]
                },
                {
                    id: 'landscape-retaining',
                    name: 'Retaining Wall',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 25, max: 60 }, oc: { min: 28, max: 66 } },
                    description: 'Block or stone retaining wall',
                    laborPercent: 55,
                    materialPercent: 35,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 0.15,
                    materials: [
                        { name: 'Block/Stone', percentOfMaterial: 55 },
                        { name: 'Gravel/Drainage', percentOfMaterial: 20 },
                        { name: 'Geotextile', percentOfMaterial: 10 },
                        { name: 'Caps', percentOfMaterial: 10 },
                        { name: 'Adhesive', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Price per sq ft of wall face',
                        'Walls over 4ft need engineering',
                        'Permit may be required'
                    ]
                },
                {
                    id: 'landscape-irrigation',
                    name: 'Irrigation System',
                    unit: 'zone',
                    pricePerUnit: { la: { min: 500, max: 1200 }, oc: { min: 550, max: 1320 } },
                    description: 'Sprinkler/drip irrigation system',
                    laborPercent: 55,
                    materialPercent: 35,
                    permitPercent: 2,
                    overheadPercent: 8,
                    hoursPerUnit: 4,
                    materials: [
                        { name: 'Sprinkler Heads', percentOfMaterial: 30 },
                        { name: 'Pipe/Tubing', percentOfMaterial: 25 },
                        { name: 'Valves', percentOfMaterial: 20 },
                        { name: 'Controller', percentOfMaterial: 15 },
                        { name: 'Fittings', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Average yard: 4-8 zones',
                        'Smart controllers available',
                        'Drip more efficient than spray'
                    ]
                }
            ]
        },
        {
            id: 'decks',
            name: 'Decks & Outdoor',
            icon: 'sun',
            colorClass: 'cat-decks',
            jobs: [
                {
                    id: 'deck-wood',
                    name: 'Wood Deck',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 30, max: 60 }, oc: { min: 33, max: 66 } },
                    description: 'Pressure-treated or cedar wood deck',
                    laborPercent: 45,
                    materialPercent: 45,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 0.1,
                    materials: [
                        { name: 'Decking Boards', percentOfMaterial: 40 },
                        { name: 'Framing Lumber', percentOfMaterial: 30 },
                        { name: 'Hardware/Fasteners', percentOfMaterial: 15 },
                        { name: 'Posts', percentOfMaterial: 10 },
                        { name: 'Concrete', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Cedar or redwood more expensive',
                        'Permit required',
                        'Railing adds $30-60/linear ft'
                    ]
                },
                {
                    id: 'deck-composite',
                    name: 'Composite Deck',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 45, max: 90 }, oc: { min: 50, max: 100 } },
                    description: 'Trex or similar composite decking',
                    laborPercent: 42,
                    materialPercent: 48,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 0.1,
                    materials: [
                        { name: 'Composite Decking', percentOfMaterial: 50 },
                        { name: 'Framing Lumber', percentOfMaterial: 25 },
                        { name: 'Hidden Fasteners', percentOfMaterial: 10 },
                        { name: 'Posts', percentOfMaterial: 10 },
                        { name: 'Concrete', percentOfMaterial: 5 }
                    ],
                    notes: [
                        'Low maintenance',
                        'Many colors available',
                        '25-year warranties common'
                    ]
                },
                {
                    id: 'deck-railing',
                    name: 'Deck Railing',
                    unit: 'linear ft',
                    pricePerUnit: { la: { min: 50, max: 150 }, oc: { min: 55, max: 165 } },
                    description: 'Deck railing installation',
                    laborPercent: 45,
                    materialPercent: 45,
                    permitPercent: 2,
                    overheadPercent: 8,
                    hoursPerUnit: 0.4,
                    materials: [
                        { name: 'Railing System', percentOfMaterial: 70 },
                        { name: 'Posts', percentOfMaterial: 20 },
                        { name: 'Hardware', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Wood: $50-80/lf',
                        'Composite: $60-100/lf',
                        'Cable rail: $100-200/lf'
                    ]
                },
                {
                    id: 'pergola',
                    name: 'Pergola',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 40, max: 100 }, oc: { min: 44, max: 110 } },
                    description: 'Wood or aluminum pergola',
                    laborPercent: 45,
                    materialPercent: 45,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 0.15,
                    materials: [
                        { name: 'Beams & Rafters', percentOfMaterial: 50 },
                        { name: 'Posts', percentOfMaterial: 25 },
                        { name: 'Hardware', percentOfMaterial: 15 },
                        { name: 'Concrete', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Kit pergolas cheaper',
                        'Custom designs cost more',
                        'Permit may be required'
                    ]
                },
                {
                    id: 'patio-cover',
                    name: 'Patio Cover/Roof',
                    unit: 'sq ft',
                    pricePerUnit: { la: { min: 50, max: 120 }, oc: { min: 55, max: 132 } },
                    description: 'Solid patio cover with roof',
                    laborPercent: 48,
                    materialPercent: 42,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 0.18,
                    materials: [
                        { name: 'Roofing', percentOfMaterial: 30 },
                        { name: 'Framing', percentOfMaterial: 35 },
                        { name: 'Posts', percentOfMaterial: 15 },
                        { name: 'Hardware', percentOfMaterial: 10 },
                        { name: 'Concrete', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Permit required',
                        'Attached vs freestanding',
                        'Match existing roof style'
                    ]
                },
                {
                    id: 'outdoor-kitchen',
                    name: 'Outdoor Kitchen',
                    unit: 'linear ft',
                    pricePerUnit: { la: { min: 500, max: 1500 }, oc: { min: 550, max: 1650 } },
                    description: 'Built-in outdoor kitchen',
                    laborPercent: 45,
                    materialPercent: 45,
                    permitPercent: 3,
                    overheadPercent: 7,
                    hoursPerUnit: 3,
                    materials: [
                        { name: 'Countertop', percentOfMaterial: 30 },
                        { name: 'Frame/Structure', percentOfMaterial: 25 },
                        { name: 'Finish (stucco/stone)', percentOfMaterial: 20 },
                        { name: 'Gas Line', percentOfMaterial: 15 },
                        { name: 'Hardware', percentOfMaterial: 10 }
                    ],
                    notes: [
                        'Appliances not included',
                        'Gas line permit required',
                        'Average: 10-15 linear ft'
                    ]
                }
            ]
        }
    ]
};

// Helper function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Helper function to format number with commas
function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRICING_DATA, formatCurrency, formatNumber };
}
